import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { NextFunction, Request ,Response} from 'express';
config()
declare global{
  namespace Express{
    interface Request {
      user : string
    }
  }
}
export const userverification = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
  const auth : string | undefined = req.headers.authorization || req.headers.Authorization as string;

  if (!auth || !auth?.startsWith("Bearer") ){

    return res.status(403).json({message:'unauthorized'})
  }

  const Token : string = auth.split(" ")[1];
  
    jwt.verify(Token, process.env.SECRET_KEY as string, (err, user) => {
      console.log(user)
      if (err) {
        return res.status(401).end();
      }
      // @ts-ignore
      req.user = user?.id;

      next();
    });
  
}



