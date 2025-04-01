import { Model } from "sequelize";
import CompletedTask from "./models/completeTask";
import Task from "./models/task";
import { Request, Response } from "express";
import passport from "passport";
import  {Strategy as LocalStrategy }  from "passport-local";
import User from "./models/user";
import bcrypt from "bcrypt";

async function setupPassport(UserModel: typeof User){
    passport.use(new LocalStrategy({
        usernameField: "userName",
        passwordField: "password",
    },
        async(username: string, password: string, done) => {
            const user = await UserModel.findOne({
                where: {
                    username: username,
                },
            });
            if (!user) {
                return done(null, false, { message: "ユーザー名かパスワードが違います" });
              }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "ユーザー名かパスワードが違います" });
            }

            return done(null, user);
        },
    ));
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id: any, done) => {
        try {
            const user = await User.findByPk(id, {
              attributes: { exclude: ["password"] },
            });
            done(null, user);
          } catch (error) {
            done(error);
          }
    });
}

export const getHome = (req: Request, res: Response):void => {
    res.status(200).json();
};
export const getSignIn = (req: Request, res: Response):void => {
    res.status(200).json();
};
export const postSignIn = (req: Request, res: Response, next: Function):void => {
    passport.authenticate("local", (err: string, user: User, info: { message: string }) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          req.session.save((err) => {  // ここでセッションを明示的に保存
            if (err) {
                    return next(err);
                }
                return res.status(200).json({ message: "Successfully signed in" });
            });
        });
      })(req, res, next);
};
export const getSignUp = async(req: Request, res: Response) => {
    res.status(200).json();
};
export const postSignUp = async(req: Request, res: Response) => {
    try{
        const { userName, password } = req.body;
        const user = await User.findOne({
            where: {
                username: userName,
            },
        });
        if(user){
            res.status(400).json({ message: "このユーザーは既に存在しています" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username: userName,
            password: hashedPassword,
        });
        res.status(201).json();
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
};

export const postSignOut = async(req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
          console.error("Logout Error:", err);
          return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Successfully logged out" });
      });
};


export const getTasks = async(req: Request, res: Response) => {
    if(req.isAuthenticated() === true){
        try {
            const tasks = await Task.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};
export const getTasksById = async(id: string) => {
    try{
        return await Task.findByPk(id);
    }
    catch(error){
        return null;
    }
};
export const postTask = async(req: Request, res: Response) => {
    if(req.isAuthenticated() === true){
        try{
            const { task, description } = req.body;
        await Task.create({
            title: task,
            description: description,
        });
        res.status(201).json();
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};
export const getTask = async(req: Request, res: Response) => {
    if(req.isAuthenticated() === true){
        try{
            const id = req.params.id;
            const task = await Task.findByPk(id);
            if(task){
                res.status(200).json(task);
            }else{
                res.status(404).json({ message: "Task not found" });
            }
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};
export const putTask = (req: Request, res: Response):void => {
    if(req.isAuthenticated() === true){
        try{
            const id = req.params.id;
            const { task, description } = req.body;
            Task.update(
                {
                    title: task,
                    description: description,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            res.status(200).json();
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};
export const deleteTask = async (req: Request, res: Response) => {
    if(req.isAuthenticated() === true){
        try{
            const id = req.params.id;
            await addCompletedTask(id);
            await Task.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).json();
        }catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
    else{
        res.status(401).json({ message: "Unauthorized" });
    }
};

export const addCompletedTask = async(id: string) => {
    const task = await getTasksById(id);
    if(task){
        await CompletedTask.create({
            title: task.title,
            description: task.description,
        });
    }
};

export default setupPassport;
