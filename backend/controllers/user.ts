import User from "../model/user.js";
import bcrpty from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Response, Request } from "express";
import { user,login } from "../types/types";
import z from 'zod'
config()

export const handlesignin = async(req:Request<{},{},user>, res:Response) => {
    const { username, email, password } = req.body;
    const userValidation = z.object({
        username : z.string().min(2,{message:'username must be atleast 2 characters long.'}) ,
        email : z.string().email({message:'please enter a valid eamil'}).trim() ,
        password : z.string().min(8,{message:"be at least 8 character long"})
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.'})
        .trim(),
    })

    try {

        const validation = userValidation.safeParse(req.body)
    
        if(validation.error){
            console.log(validation.error)
             res.status(411).json({message:"type validation error"}).end()
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Already signed up', email }).end();
        }

        const saltRounds = 10;
        const hashedPassword = await bcrpty.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { email, id: newUser._id },
            process.env.SECRET_KEY as string ,
            { expiresIn: '7h' } 
        );
       const refreshtoken = jwt.sign(
            { email, id: newUser._id },
            process.env.REFERSH_SECRET_KEY as string,
            { expiresIn: '7d' } 
        );

        res.status(201).json({"token": token,
            "refreshtoken":refreshtoken
         }).end();
    } catch (error) {
        console.error('Error during user sign up:', error);
        res.status(500).json({ message: 'Internal server error', error }).end();
    }
}

export const handlelogin = async(req:Request<{},{},login>, res:Response)=> {
    const { email, password } = req.body;

    const userValidation = z.object({
        email : z.string().email({message:'please enter a valid eamil'}).trim() ,
        password : z.string().min(8,{message:"be at least 8 character long"})
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {message: 'Contain at least one special character.'})
        .trim(),
    })

    try {
        const validation = userValidation.safeParse(req.body)
        if(validation.error){
            console.log(validation.error)
            res.status(411).json({message:"type validation error"})
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ 'User not found' :email })
            return
        }

        const isPasswordValid = await bcrpty.compare(password, user.password);
        
        if (!isPasswordValid) {
            res.status(401).json({ 'Incorrect password':email  });
        }

        const token = jwt.sign(
            { email, id: user._id },
            process.env.SECRET_KEY as string ,
            { expiresIn: '7h' } 
        );

        const refreshtoken = jwt.sign(
            { email, id: user._id },
            process.env.REFERSH_SECRET_KEY as string,
            { expiresIn: '7d' } 
        );

        res.status(200).json({"token": token,
            "refreshtoken":refreshtoken
         })
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}


export const handleupdateuserinfo=async (req:Request,res:Response)=>{
  const formdata = req.body;
  const user = req.user
  await User.findByIdAndUpdate(user,formdata).then((resp)=>{
    return res.status(200).json({task:"completed"})
  }).catch(err=>{
    return res.status(500).json({task:"failed"})
 } )

}

export const handlerevokthetoken =async(req:Request,res:Response)=>{
    
    const {refreshtoken} = req.body;

    jwt.verify(refreshtoken,process.env.REFERSH_SECRET_KEY as string,(err:any,resp:any)=>{
        console.log(err,resp)
        if(err){
            return res.status(403)
        }
        const newauthtoken = jwt.sign({ email:resp.email, id:resp.id },
            process.env.SECRET_KEY as string,
            { expiresIn: '7h' })

        const newrefreshtoken = jwt.sign({ email:resp.email, id:resp.id },process.env.REFERSH_SECRET_KEY as string,{expiresIn:"7d"})
        return res.status(200).json({"token":newauthtoken,"refreshtoken":newrefreshtoken})
    })

}

export const handlecron=async(req : Request,res:Response)=>{
    res.status(200).json({message:"Im awake"})
}