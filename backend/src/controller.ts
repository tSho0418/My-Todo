import Task from "./models/task";
import { Request, Response } from "express";

export const getHome = (req: Request, res: Response):void => {};
export const getSignIn = (req: Request, res: Response):void => {};
export const postSignIn = (req: Request, res: Response):void => {};
export const getSignUp = (req: Request, res: Response):void => {};
export const postSignUp = (req: Request, res: Response):void => {};
export const getTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
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
export const putTask = (req: Request, res: Response):void => {};
export const deleteTask = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        console.log(id);
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
