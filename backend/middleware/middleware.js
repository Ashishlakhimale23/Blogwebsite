import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config()
export async function userverification(req,res,next){
  const auth = req.headers.authorization || req.headers.Authorization;

  if (!auth?.startsWith("Bearer"))
    return res.json({ status: "header not found" });

  const Token = auth.split(" ")[1];
  
    jwt.verify(Token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).end();
      }

      req.user = user.id;
      next();
    });
  
}



