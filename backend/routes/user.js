import express from "express"
import {handlesignin,handlelogin,handleupdateuserinfo, handlerevokthetoken,handlecron} from "../controllers/user.js"
import { handlecreateblog, handlegetblogs,handlegetuserinfo,handlegetpraticularblog,handlegetotheruserinfo,handledraftdeletion, handleblogdeletion, handlesavebookmark, handleremovebookmark, handlegetbookmarks, handlegetallblogsanduser, handleblogupdate, handlegetdrafts,handlegetuserblogs } from "../controllers/blogs.js"
import {userverification} from "../middleware/middleware.js"
export const router = express.Router()
//users
router.post("/signin",handlesignin)
router.post("/login",handlelogin)
router.get('/cronjobs',handlecron)
router.post("/refresh",handlerevokthetoken)
//blogs
router.post("/createblog",userverification,handlecreateblog)
router.get("/getblogs",userverification,handlegetblogs)
router.get("/getuserinfo",userverification,handlegetuserinfo)
router.get("/getotheruserinfo",userverification,handlegetotheruserinfo)
router.post("/updateuserinfo",userverification,handleupdateuserinfo)
router.get("/blog",userverification,handlegetpraticularblog)
router.delete("/deletedraft",userverification,handledraftdeletion)
router.delete("/deleteblog",userverification,handleblogdeletion)
router.get("/getbookmarks",userverification,handlegetbookmarks)
router.post("/savebookmark",userverification,handlesavebookmark)
router.post("/removebookmark",userverification,handleremovebookmark)
router.get("/getallusersandblogs",userverification,handlegetallblogsanduser)
router.post("/updateblog",userverification,handleblogupdate)
router.get('/getdrafts',userverification,handlegetdrafts)
router.get('/getuserblogs',userverification,handlegetuserblogs)
export default router

