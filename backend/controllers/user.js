import User from "../model/user.js";
import bcrpty from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

export async function handlesignin(req, res) {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Already signed up', email });
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
            process.env.SECRET_KEY,
            { expiresIn: '7h' } 
        );
       const refreshtoken = jwt.sign(
            { email, id: newUser._id },
            process.env.REFERSH_SECRET_KEY,
            { expiresIn: '7d' } 
        );

        return res.status(201).json({"token": token,
            "refreshtoken":refreshtoken
         });
    } catch (error) {
        console.error('Error during user sign up:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

export async function handlelogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 'User not found' :email });
        }

        const isPasswordValid = await bcrpty.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 'Incorrect password':email  });
        }

        const token = jwt.sign(
            { email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '7h' } 
        );

        const refreshtoken = jwt.sign(
            { email, id: user._id },
            process.env.REFERSH_SECRET_KEY,
            { expiresIn: '7d' } 
        );

        return res.status(200).json({"token": token,
            "refreshtoken":refreshtoken
         });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}


export const handleupdateuserinfo=async (req,res)=>{
  const formdata = req.body;
  const user = req.user
  await User.findByIdAndUpdate(user,formdata).then((resp)=>{
    return res.status(200).json({task:"completed"})
  }).catch(err=>{
    return res.status(500).json({task:"failed"})
 } )

}

export const handlerevokthetoken =async(req,res)=>{
    
    const {refreshtoken} = req.body;

    jwt.verify(refreshtoken,process.env.REFERSH_SECRET_KEY,(err,resp)=>{
        console.log(err,resp)
        if(err){
            return res.status(403).end()
        }
        const newauthtoken = jwt.sign({ email:resp.email, id:resp.id },
            process.env.SECRET_KEY,
            { expiresIn: '7h' })

        const newrefreshtoken = jwt.sign({ email:resp.email, id:resp.id },process.env.REFERSH_SECRET_KEY,{expiresIn:"7d"})
        return res.status(200).json({"token":newauthtoken,"refreshtoken":newrefreshtoken})
    })

}

export const handlecron=async(req,res)=>{
    return res.status(200).json({message:"Im awake"})
}