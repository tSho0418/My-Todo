import { Model } from "sequelize";
import CompletedTask from "./models/completeTask";
import Task from "./models/task";
import { Request, Response } from "express";
import passport from "passport";
import  {Strategy as LocalStrategy }  from "passport-local";
import User from "./models/user";

async function setupPassport(UserModel: typeof User){
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
    },
        async(username: string, password: string, done) => {
            const user = await UserModel.findOne({
                where: {
                    username: username,
                },
            });
            if(user && user.password === password){
                return done(null, user);
            }else{
                return done(null, false, { message: "ユーザー名かパスワードが違います" });
            }
        },
    ));
    passport.serializeUser((user, done) => {
        done(null, (user as User).id);
    });
    passport.deserializeUser(async(id: string | number, done) => {
            const user = await UserModel.findByPk(id, {
                attributes: {
                    exclude: ["password"],
                },
            });
            done(null, user);
        });
}

export const getHome = (req: Request, res: Response):void => {};
export const getSignIn = (req: Request, res: Response):void => {
};
export const postSignIn = (req: Request, res: Response):void => {
    try{
        passport.authenticate("local", () => {
            successRedirect: "/todolist";
            failureRedirect: "/sign-in";
        })(req, res);
        res.status(200).json();
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
};
export const getSignUp = async(req: Request, res: Response) => {
    
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
        await User.create({
            username: userName,
            password: password,
        });
        res.status(201).json();
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    
};
export const getTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
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
};
export const getTask = async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const task = await Task.findByPk(id);
        console.log(task);
        if(task){
            res.status(200).json(task);
        }else{
            res.status(404).json({ message: "Task not found" });
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
};
export const putTask = (req: Request, res: Response):void => {
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
};
export const deleteTask = async (req: Request, res: Response) => {
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
