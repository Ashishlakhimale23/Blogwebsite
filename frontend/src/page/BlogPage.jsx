import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogParser from "../component/blogparser";
import { getdate } from "../utils/date";
import { api } from "../utils/axiosroute";
import { SkeletonLoad } from "../component/Skeleton";

import { CalendarDays, Clock } from 'lucide-react';
const blogstructure={
    blogtitle:"",
    content:[],
    banner:"",
    author:{perosnalinfo:{}},
    pushlishedAt:'',
}
function BlogPage(){
    const navigate = useNavigate()
    const [blog,setBlog] = useState(blogstructure)
    const {blogtitle,content,banner,author:{perosnalinfo:{pfplink,username,userid}},pushlishedAt}=blog
    const {BlogLink} = useParams()
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        async function fetchblog(){
          setLoading(true)
            await api.get('/blog',{params:{BlogLink}}).
            then((resp)=>{
                setBlog((prevBlog)=>({
                    ...prevBlog,
                    blogtitle:resp.data.blog.title,
                    banner:resp.data.blog.banner,
                    content:resp.data.blog.content,
                  pushlishedAt:getdate(resp.data.blog.publishedOn),

                  author:{perosnalinfo:{
                    pfplink:resp.data.blog.author.pfplink,
                    username:resp.data.blog.author.username,
                    userid:resp.data.blog.author._id,
                  }}

                }))
                  
                setLoading(false);
            })
            .catch(err=>console.log(err))
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
            {blogtitle}
          </h1>
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
            <img 
              src={banner} 
              alt={blogtitle}
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
                  <span>{pushlishedAt}</span>
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