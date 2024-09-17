
import Blog from "../model/blogs.js";
import User from "../model/user.js";
import {RemoveAllTheSpace ,RemoveExtraSpace} from "../Utils/FilterOuThespaces.js" 

export const handlecreateblog=async(req,res)=>{
  const userid = req.user;
  let {title,content, result, banner } = req.body;
  if (!banner.length) {
    return res.status(403).json({ error: "You must add banner to the blog" });
  }
  if (!title.length) {
    return res.status(403).json({ error: "You must add title to the blog" });
  }
  if (!content.length) {
    return res.status(403).json({ error: "No content provided" });
  }
  try{
  let BlogTitle = RemoveAllTheSpace(title)
  let titleNoSpaces = RemoveExtraSpace(title)
  const TitleCount =await Blog.countDocuments({title:titleNoSpaces})
  let BlogTitleWithCount = TitleCount ? BlogTitle + TitleCount : BlogTitle
  const BlogTitleCount = await Blog.countDocuments({BlogLink:BlogTitleWithCount})
  let Count = BlogTitleCount ? TitleCount  + BlogTitleCount : BlogTitleCount
  BlogTitle = BlogTitleCount ? BlogTitle+Count : BlogTitle

  let blog = new Blog({
    title:titleNoSpaces,
    BlogLink:BlogTitle,
    content,
    banner,
    author: userid,
    Published: result,
  });
  blog
    .save()
    .then((blogs) => {
      if (result) {
        User.findByIdAndUpdate(
          { _id: userid },
          {
            $push: { blogs: blogs._id },
          }
        )
          .then((user) => {
            return res.status(200).json({ status: "done" });
          })
          .catch((err) => {
            return res
              .status(500)
              .json({ error: "failed to update the blog post" });
          });
      } else {
        User.findByIdAndUpdate(
          { _id: userid },
          {
            $push: { draft: blogs._id },
          }
        )
          .then((user) => {
            return res.status(200).json({ status: "done" });
          })
          .catch((err) => {
            return res
              .status(500)
              .json({ error: "failed to update the blog post" });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: "failed to upload the blog" });
    });
}catch(error){
  return res.status(500).json({message:'internal server error'})
}
}
    


export const handlegetblogs=async(req,res)=>{
  await Blog.find({Published:true}).populate("author","username pfplink")
  .then((resp)=>{
    return res.status(200).json({blogs:resp})
  }).catch(error=>{
    return res.status(500).json({message:"internal server error"})
  })

}

export const handlegetuserinfo = async (req,res)=>{
  const userid = req.user
 
  await User.findById(userid).select("username email pfplink  about twitter github techstack blogs draft joinedOn bookmarks").populate({
    path:"blogs",
    select:"title content banner publishedOn BlogLink author",
    populate:{
      path:"author",
      select:"username pfplink"
    }
  })
  .then((resp)=>{ 
  return res.status(200).json({userinfo:resp})
  }).catch(error=>{

    return res.status(500).json({message:"internal server error"})
  }
    )
}

export const handlegetotheruserinfo = async (req,res)=>{
  const {Username} = req.body;
  await User.findOne({username:Username}).select("username email pfplink about twitter github techstack joinedOn blogs").populate("blogs","title publishedOn BlogLink")
  .then((resp)=>{
  return res.status(200).json({userinfo:resp})
  }).catch(()=>{
    return res.status(500).json({message:"internal server error"})
  })
}

export const handlegetpraticularblog=async (req,res)=>{
  const {BlogLink} = req.body;
  
  await Blog.findOne({
    BlogLink:BlogLink
    
  }).populate("author","username pfplink")
  .then((resp)=>{
    return res.status(200).json({blog:resp})
  }).catch(err=>{
    return res.status(500).json({error:err})
  })
}

export const handledraftdeletion=async(req,res)=>{
  const {_id,title} = req.body;
  const userid = req.user;
  await Blog.findOneAndDelete({_id:_id,title:title}).then(async(resp)=>{
    await User.findOneAndUpdate({_id:userid},{$pull:{"draft":_id}}).then((result)=>{
        return res.status(200).json({status:"deleted"})
    }).catch((err)=>{
      return res.status(500).json({status:"deleting failed"})
    })
  })
}
export const handleblogdeletion=async(req,res)=>{
  const {_id,title} = req.body;
  const userid = req.user;
  await Blog.findOneAndDelete({_id:_id,title:title}).then(async(resp)=>{
    await User.findOneAndUpdate({_id:userid},{$pull:{"blogs":_id}}).then((result)=>{
        return res.status(200).json({status:"deleted"})
    }).catch((err)=>{
      return res.status(500).json({status:"deleting failed"})
    })
  })
}

export const handlegetbookmarks=async(req,res)=>{
  const userid=req.user;
  await User.findById({_id:userid}).select("bookmarks").populate("bookmarks","title banner content publishedOn BlogLink").then((resp)=>{
    return res.status(200).json({bookmark:resp})
  }).catch(error=>{
    return res.status(500).json({message:"internal server error"})
  })
}

export const handlegetdrafts=async(req,res)=>{
  const userid=req.user;
  await User.findById({_id:userid}).select("draft").populate("draft","title banner content publishedOn BlogLink").then((resp)=>{
    return res.status(200).json({drafts:resp})
  }).catch(error=>{
    return res.status(500).json({message:"internal server error"})
  })
}
export const handlesavebookmark=async(req,res)=>{
  const {blogid} = req.body;
  const userid = req.user
await User.findByIdAndUpdate({_id:userid},
    {
      $push:{"bookmarks":blogid}
    }
  ).then(()=>{
    return res.status(200).json({success:id})
  }).catch((err)=>{
    return res.status(500).json({success:"failed"})

  })
}

export const handleremovebookmark=async(req,res)=>{
  const {blogid} = req.body;
  const userid = req.user
await User.findByIdAndUpdate({_id:userid},
    {
      $pull:{"bookmarks":blogid}
    }
  ).then(()=>{
    return res.status(200).json({success:id})
  }).catch((err)=>{
    return res.status(500).json({success:"failed"})

  })
}

export const handlegetallblogsanduser=async(req,res)=>{
  await User.find({}).select("username pfplink joinedOn").then(resp=>{
    const result = resp;
     Blog.find({Published:true}).select("title banner publishedOn BlogLink").then((resp)=>{
       return res.status(200).json({users:result,blogs:resp})
    }).catch(err=>{return res.status(500).json({message:"failed to retrive the blogs"})})
  }).catch(err=>{return res.status(500).json({message:"failed to retrive the users"})})

}

export const handleblogupdate=async(req,res)=>{
  const { title, _id, content, result, banner } = req.body;
  const userid = req.user;
  const blog = await Blog.findById({ _id: _id });
  if (result) {
    if (blog.Published) {
      (blog.content = content), (blog.title = title), (blog.banner = banner);
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
      return res.status(200).json({ blog: "Updated" });
    })
    .catch(() => {
      return res.status(500).json({ blog: "Update failed" });
    });
}