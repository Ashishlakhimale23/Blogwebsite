import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogParser from "../component/blogparser";
import { getdate } from "../utils/date";
import { api } from "../utils/axiosroute";

const blogstructure={
    blogtitle:"",
    content:[],
    banner:"",
    author:{perosnalinfo:{}},
    pushlishedAt:'',
}
function BlogPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const [blog,setBlog] = useState(blogstructure)
    const {blogtitle,content,banner,author:{perosnalinfo:{pfplink,username,userid}},pushlishedAt}=blog
    const {id} = location.state.data
    const {title:encodeduri} = useParams()
    const title = decodeURIComponent(encodeduri)
    
    useEffect(()=>{
        async function fetchblog(){
            await api.post('/blog',{id,title}).
            then((resp)=>{
                setBlog((prevBlog)=>({
                    ...prevBlog,
                    blogtitle:resp.data.blog[0].title,
                    banner:resp.data.blog[0].banner,
                    content:resp.data.blog[0].content,
                  pushlishedAt:getdate(resp.data.blog[0].publishedOn),

                  author:{perosnalinfo:{
                    pfplink:resp.data.blog[0].author.pfplink,
                    username:resp.data.blog[0].author.username,
                    userid:resp.data.blog[0].author._id,
                  }}

                }))
            })
            .catch(err=>console.log(err))
        }
        fetchblog()
    },[])
   return (
   <div className="lg:flex lg:justify-center lg:items-center md:p-12 md:pt-0 min-h-screen mt-16 overflow-hidden w-full">
  <div className="font-display p-6 w-full max-w-[900px]">
    <div className="space-y-3 mb-4 w-full">
      <div className="w-full bg-black">
        <img src={banner} alt="Banner" className="aspect-video w-full" />
      </div>
      <div>
        <p className="text-2xl font-bold">{blogtitle}</p>
      </div>
      <div className="flex items-center cursor-pointer" onClick={() => navigate(`/${username}`, { state: { data: { userid: userid } } })}>
        <div>
          <img src={pfplink} alt="Profile" className="mr-2 w-12 h-12 rounded-full" />
        </div>
        <div>
          <p className="font-semibold">By {username}</p>
          <p className="font-semibold">Published on {pushlishedAt}</p>
        </div>
      </div>
    </div>
    <div className="w-full">
      {content.map((block, i) => (
        <BlogParser key={i} block={block} />
      ))}
    </div>
  </div>
</div> 
  );
};
 

export default BlogPage;