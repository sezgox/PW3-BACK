import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ where: {username: username} });

    if(user){
        return res.status(400).json({
            msg: "User already registered"
        })
    }

    try {
        await User.create({
            username: username,
            password: hashedPassword
        });
        res.json({
            msg: "User registered"
        })
        console.log('User created' + username + password)
    } catch (error) {
        res.status(400).json({
            msg: "No se pudo crear el usuario :(",
            error
        })
    }

}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: any = await User.findOne({ where: {username: username} });      //crear interfaz para hacerlo mas bonito
    
    if(user){
       const passwordValid = await bcrypt.compare(password, user.password);

       if(!passwordValid){
        return res.status(400).json({
            msg: "Password incorrect"
        });
       }

       const token = jwt.sign({
        username: username
       }, process.env.SECRET_KEY || 'MELASUDA', /*{
        expiresIn: '10000'
       }*/);

       res.json(token);
    }else{
        return res.status(400).json({
            msg: "User not registered"
        });
    }
}