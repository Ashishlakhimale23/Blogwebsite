import React, { useContext, useState,useEffect } from "react"
import { toast } from "react-hot-toast"
import { BlogContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import { getdate } from "../utils/date"
import { Trash2, Edit } from 'lucide-react';
import { api } from "../utils/axiosroute"
import { UserBlog } from "../type/types"

function ManageBlogs(){
  const navigate = useNavigate();
  const { setBlog } = useContext(BlogContext)|| {};
  const [blogs,setBlogs] = useState<UserBlog[]>([])
  const [loading,setLoading] = useState(true)

 useEffect(() => {
    const fetchblogs = async () => {
      const response = await api.get("/getuserblogs")
      if(response.status == 200){
        setBlogs(response.data.blogs.blogs)
        setLoading(false)
      }
    };
    fetchblogs();
  }, []);

  const handleEdit = (e:React.MouseEvent<HTMLButtonElement>,blog:UserBlog) =>{
    e.stopPropagation()
    const blogbo = {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      banner: blog.banner,
      edited: true,
    };
    if(setBlog){

    setBlog(blogbo);
    }
    navigate("/createpost");
  }

  const handleDelete = async(e:React.MouseEvent<HTMLButtonElement>,blog:UserBlog)=>{
    e.stopPropagation()
    try{
    const resp = await api.delete("/deleteblog",{
      params:{
        _id:blog._id
      }
      })
    if(resp.status ===200){
      const filter = blogs.filter((blog)=>blog._id!==blog._id)
      setBlogs(filter)
      toast.success('Deleted')
    }
    else{
      return toast.error("Deletion failed")
    }
    }catch(error){
      return toast.error("internal server error")
    }
  }
  
if(loading){
    return (
      <div className="p-10 animate-shimmer bg-gradient-to-r max-w-3xl mx-2 sm:mx-auto mt-24 rounded-md from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]">
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-zinc-900 text-white w-full max-w-3xl mx-auto mt-24 px-4">
      <div className="space-y-6">
        <h1 className="font-bold text-3xl text-white/90">Blogs</h1>
        
        <div className="space-y-4">
          {!Array.isArray(blogs) || blogs.length === 0 ? (
            <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
              <p className="text-xl font-medium text-white/70">You don't have any drafts yet</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <div 
                key={index}
                className="group bg-zinc-800/50 hover:bg-zinc-800/70 rounded-lg p-4 transition-all duration-200"
                onClick={()=>navigate(`/blog/${blog.BlogLink}`)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 cursor-pointer">
                    <h2 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                      {blog?.title || 'Untitled Draft'}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      {blog?.publishedOn ? getdate(blog.publishedOn) : ''}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                       onClick={(e:React.MouseEvent<HTMLButtonElement>)=> handleEdit(e,blog)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
                    >
                      <Edit size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    
                    <button
                      onClick={(e : React.MouseEvent<HTMLButtonElement>) => handleDelete(e,blog)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default ManageBlogs;