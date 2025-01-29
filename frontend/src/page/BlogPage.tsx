import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogParser from "../component/blogparser";
import { getdate } from "../utils/date";
import { api } from "../utils/axiosroute";
import { SkeletonLoad } from "../component/Skeleton";
import {AxiosResponse} from "axios"
import { CalendarDays  } from 'lucide-react';
import { Blogs } from "../type/types";

const DefaultBlogs: Blogs = {
  title : "",
  banner: "",
  content :[] ,
  publishedOn : '',
  author:{
    _id: "",
    pfplink: "",
    username : ""
  }
}
function BlogPage(){
    const navigate = useNavigate()
    const [blog,setBlog] = useState<Blogs>(DefaultBlogs)
    const {title,banner,content,publishedOn,author:{_id,pfplink,username}} = blog 
    const {BlogLink} = useParams()
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        async function fetchblog(){
          setLoading(true)
            const resp : AxiosResponse<Blogs>  = await api.get('/blog',{params:{BlogLink}})

                setBlog((prevBlog:Blogs)=>({
                    ...prevBlog,
                    title: resp.data.title,
                    banner: resp.data.banner,
                    content: resp.data.content,
                    publishedOn: getdate(resp.data.publishedOn),
                    author: {
                        _id: resp.data.author._id,
                        pfplink: resp.data.author.pfplink,
                        username: resp.data.author.username
                    }
                }))
                  
                setLoading(false);
        }
        fetchblog()
    },[])

  if(loading){
    return(
      <SkeletonLoad/>
    )
  }


  return (
    <div className="min-h-screen mt-14 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-6 mb-8">
          <h1 className="text-xl sm:text-3xl  md:text-4xl font-bold text-white leading-tight">
            {title}
          </h1>
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <img 
              src={banner} 
              alt={title}
              className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex items-center space-x-4 border-b border-slate-700 pb-6">
            <div className="relative">
              <img 
                src={pfplink} 
                alt={username} 
                className="w-12 h-12 rounded-full  "
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-white hover:text-slate-400 cursor-pointer" onClick={()=>navigate(`/${username}`)}>
                  {username}
                </h2>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{publishedOn}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <article className="">
          {content.map((block, i) => (
            <BlogParser key={i} block={block} />
          ))}
        </article>
      </div>
    </div>
  );
};

 

export default BlogPage;