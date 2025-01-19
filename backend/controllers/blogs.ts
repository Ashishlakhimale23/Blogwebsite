
import { Request, Response } from "express";
import Blog from "../model/blogs";
import User from "../model/user";
import {RemoveAllTheSpace ,RemoveExtraSpace} from "../Utils/FilterOuThespaces" 
import {blog} from "../types/types"
import z from "zod"



export const handlecreateblog=async(req:Request<{},{},blog>,res:Response)=>{
  const userid = req.user;
let { title , content, result, banner  } = req.body;

try {

if (!banner.length) {
   res.status(400).json({ error: "You must add a banner to the blog" });
   return 
}
if (!title.length) {
   res.status(400).json({ error: "You must add a title to the blog" });
   return 
}
if (!content.length) {
   res.status(400).json({ error: "No content provided"});
   return 
}
  const blogValidation = z.object({
    title : z.string(),
    banner : z.string(),
    result : z.boolean(),
    content : z.array(z.object({})),
  })

  console.log(typeof content)
  console.log(content)
 
  const validation = blogValidation.safeParse(req.body)

  if(validation.error){
    console.log(validation.error)
    res.status(411).json({message:'type validation'})
    return 
  }

  console.log("still getting carry forward even if the type check fails.")

  const titleNoSpaces = RemoveExtraSpace(title);
  let BlogTitle = RemoveAllTheSpace(title);

  const TitleCount = await Blog.countDocuments({ title: titleNoSpaces });
  BlogTitle += TitleCount ? TitleCount : '';

  const BlogTitleCount = await Blog.countDocuments({ BlogLink: BlogTitle });
  const Count = BlogTitleCount ? BlogTitleCount : 0;
  BlogTitle += Count ? Count : '';

  
  const blog = new Blog({
    title: titleNoSpaces,
    BlogLink: BlogTitle,
    content,
    banner,
    author: userid,
    Published: result,
  });

  await blog.save();


  const updateField = result ? { blogs: blog._id } : { draft: blog._id };
  await User.findByIdAndUpdate(
    { _id: userid },
    { $push: updateField }
  );

  res.status(200).json({ status: "done" });
  return

} catch (error) {
  console.error(error); 
   res.status(500).json({ message: 'Internal server error' });
   return 
}

}
    


export const handlegetblogs=async(req:Request,res:Response)=>{
  const userid = req.user 
  const bookmarks = await User.findById(userid).select('bookmarks')
  const response = await Blog.find({Published:true}).populate("author","username pfplink")
  if(!response){

     res.status(500).json({message:"internal server error"})
     return 
  }
   res.status(200).json({blogs:response,bookmarks:bookmarks})
   return
}

export const handlegetuserinfo = async (req:Request,res:Response)=>{
  const userid = req.user
  const response = await User.findById(userid).select("username pfplink")
  if(!response){
     res.status(500).json({message:"internal server error"})
     return

  }
   res.status(200).json({userinfo:response})
   return
  
}

export const handlegetotheruserinfo = async (req:Request,res:Response)=>{
  const Username = req.query.Username;
  console.log(Username)
  const response = await User.findOne({username:Username}).select("username email pfplink about twitter github techstack joinedOn blogs").populate("blogs","title publishedOn BlogLink")
  if(!response){
     res.status(500).json({message:"internal server error"})
     return
  }
   res.status(200).json({userinfo:response})
   return 
  
}

export const handlegetpraticularblog=async (req:Request,res:Response)=>{
  const BlogLink = req.query.BlogLink;
  
  const response = await Blog.findOne({
    BlogLink:BlogLink
  }).populate("author","username pfplink")

  if(!response){
     res.status(500).json({message:"internal server error"})
     return
  }
   res.status(200).json({blog:response})
   return
  
}

export const handledraftdeletion=async(req:Request,res:Response)=>{
  const {_id} = req.query;
  const userid = req.user;
  console.log(_id)
  try{
  const check = await User.findOne({_id:userid},{draft:_id})
  if(!check){
     res.status(401).json({message:"blog doesnt belong to you"})
     return
  }
  const deleteCompletely= await Blog.findByIdAndDelete(_id)
  if(!deleteCompletely){
     res.status(500).json({message:"error occured while deleting"});
     return
  }


  const Done = await User.findOneAndUpdate({_id:userid},{$pull:{draft:_id}});
  console.log(Done)
  if(!Done){
     res.status(500).json({message:"error while deleting the draft"})
     return
  }

   res.status(200).json({message:'deleted'})
   return

  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }
   
}
export const handleblogdeletion=async(req:Request,res:Response)=>{
  const {_id} = req.query;
  const userid = req.user;
  try{
  const check = await User.findOne({_id:userid},{blogs:_id})
  if(!check){
     res.status(401).json({message:"blog doesnt belong to you"})
     return
  }
  await User.updateMany({blogs:_id},{$pull:{blogs:_id}})
  const deleteCompletely= await Blog.findByIdAndDelete(_id)

  if(!deleteCompletely){
     res.status(500).json({message:"error occured while deleting"});
     return
  }
  const Done = await User.findOneAndUpdate({_id:userid},{$pull:{blogs:_id}})
  if(!Done){
     res.status(500).json({message:"error while deleting the blogs"})
     return
  }

   res.status(200).json({message:'successfully deleted'})
   return

  }catch(error){
    
     res.status(500).json({message:"internal server error"})
     return
  }

  
}

export const handlegetbookmarks=async(req:Request,res:Response)=>{
  const userid=req.user;
  try{
  const response = await User.findById({_id:userid}).select("bookmarks").populate("bookmarks","title banner content publishedOn BlogLink")
  if(!response){
     res.status(200).json({bookmarks:response})
     return
  }
   res.status(200).json({bookmark:response})
   return

  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }
}

export const handlegetdrafts=async(req:Request,res:Response)=>{
  const userid=req.user;

  try{
  const response = await User.findById({_id:userid}).select("draft").populate("draft","title banner publishedOn BlogLink content")
  if(!response){
     res.status(200).json({drafts:response})
     return
  }
   res.status(200).json({drafts:response})
   return
  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }
}

export const handlesavebookmark=async(req:Request<{},{},{blogid:string}>,res:Response)=>{
  const {blogid} = req.body;
  const userid = req.user
  try{
  const response = await User.findByIdAndUpdate({_id:userid},
    {
      $push:{"bookmarks":blogid}
    }
  )
  if(!response){
     res.status(500).json({failed:blogid})
     return
  }
   res.status(200).json({success:blogid})
   return

  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }
}

export const handleremovebookmark=async(req:Request<{},{},{blogid:string}>,res:Response)=>{
  const {blogid} = req.body;
  const userid = req.user

  try{

  const response = await User.findByIdAndUpdate({_id:userid},
    {
      $pull:{"bookmarks":blogid}
    }
  )
  if(!response){

     res.status(500).json({failed:blogid})
     return
  }

     res.status(200).json({success:blogid})
     return
  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }

}

export const handlegetallblogsanduser=async(req:Request,res:Response)=>{
  try{
    const user = await User.find({}).select("username pfplink joinedOn")
    const blogs = await Blog.find({Published:true}).select("title banner publishedOn BlogLink")
     res.status(200).json({users:user,blogs:blogs})
     return
  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  }
}
interface UpdateBlog extends blog {
  _id:string
}


export const handleblogupdate=async(req:Request<{},{},UpdateBlog>,res:Response)=>{
  const { title, _id, content, result, banner } = req.body;
  const userid = req.user;
  const blogValidation = z.object({
    title : z.string(),
    banner : z.string(),
    result : z.boolean(),
    content : z.array(z.object({})),
    id: z.string()
  })
  const validation = blogValidation.safeParse(req.body)
  if(validation.error){
    console.log(validation.error)
    res.status(411).json({message:"type validation"})
    return 
  }

  const blog = await Blog.findById({ _id: _id });
  if(!blog){
     res.status(400).json({message:"blog doesnt exists"})
     return
  }
  try{
if (result) {
    if (blog.Published) {
      blog.content = content, blog.title = title, blog.banner = banner;
    } else {
      (blog.content = content), (blog.title = title), (blog.banner = banner);
      blog.Published = result;
      //put it in blogs
      await User.findByIdAndUpdate(
        { _id: userid },
        {
          $pull: { draft: _id },
          $push: { blogs: _id },
        }
      );
    }
  } else {
    if (blog.Published) {
      blog.Published = result;
      (blog.content = content), (blog.title = title), (blog.banner = banner);
      //put it in draft
      await User.findByIdAndUpdate(
        { _id: userid },
        {
          $pull: { blogs: _id },
          $push: { draft: _id },
        }
      );
    } else {
      (blog.content = content), (blog.title = title), (blog.banner = banner);
    }
  }
  await blog
    .save()
    .then(() => {
       res.status(200).json({ blog: "Updated" });
       return
    })
    .catch((err) => {
      console.log(err)
       res.status(500).json({ blog: "Update failed" });
       return
    });

  }catch(error){
    console.log(error)
    res.status(500).json({message:"internal server message"})
    return
  }
  
}

export const handlegetuserblogs = async(req:Request,res:Response)=>{
  const userid = req.user
  try{
  const response = await User.findById({_id:userid}).select("blogs").populate("blogs","title banner publishedOn BlogLink content")
  if(!response){
     res.status(200).json({blogs:response})
     return
  }
   res.status(200).json({blogs:response})
  }catch(error){
     res.status(500).json({message:"internal server error"})
     return
  } 


}