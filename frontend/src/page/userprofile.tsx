import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/context"
import {  useNavigate, useParams } from "react-router-dom"
import {getdate} from "../utils/date"
import { api } from "../utils/axiosroute"
import UserBlogShow from "../component/userblogshow"
import { Github, Twitter, Code2, CalendarDays, User2, BookOpen } from 'lucide-react';
import { UserProfileSkeleton } from "../component/UserProfileSkeleton"
import { UserInfo } from "../type/types"
import toast from "react-hot-toast"

const DefaultUserInfo : UserInfo ={
  _id  : '',
  username:"",
  email:"",
  pfplink:"",
  aboutyou:"",
  github:"",
  twitter:"",
  techstack:[],
  blogs:[],
  joinedOn:"",
}
export function UserProfile(){

  const navigate = useNavigate();
  const { username: Username } = useParams();
  const [loading, setLoading] = useState(true);
  const {info} = useContext(UserContext) || {}
  const {username :owner} = info || {username : ""}
  const [userinfo,setUserinfo] = useState<UserInfo>(DefaultUserInfo)
    const {
    username,
    pfplink,
    aboutyou,
    github,
    twitter,
    techstack,
    blogs,
    joinedOn,
  } = userinfo;
  
  useEffect(() => {
    async function fetchuserinfo() {
      try{
          const response = await api
        .get("/getotheruserinfo",{params:{Username}})

           setUserinfo({
            ...userinfo,
            username: response.data.userinfo.username,
            pfplink: response.data.userinfo.pfplink,
            email: response.data.userinfo.email,
            aboutyou: response.data.userinfo.about,
            github: response.data.userinfo.github,
            twitter: response.data.userinfo.twitter,
            techstack: response.data.userinfo.techstack,
            blogs: response.data.userinfo.blogs,
            joinedOn: getdate(response.data.userinfo.joinedOn),
          });
          setLoading(false);
      }catch(error){
        toast.error("some error occured")

      }
        
          
    }

    fetchuserinfo();
  }, [Username]);

  if (loading) {
    return <UserProfileSkeleton/>
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 mt-20 font-display">
      <div className="max-w-4xl mx-auto px-4 py-5 space-y-8">
        <div className="relative">
          <div className="absolute inset-0 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl -z-10" />
          
          <div className="flex flex-col items-center space-y-6 md:flex-row md:space-x-8 pt-8 px-6">
            <img 
              src={pfplink} 
              alt={username} 
              className="w-32 h-32 rounded-full ring-4 ring-zinc-700 ring-offset-4 ring-offset-zinc-900 shadow-xl object-cover"
            />
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h1 className="text-3xl font-bold text-white tracking-tight">{username}</h1>
              {username===owner  && (
                <button
                  onClick={() => navigate(`/edit/${username}`)}
                  className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-100 
                           transition duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <User2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {twitter && (
            <a 
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition group"
            >
              <Twitter className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
            </a>
          )}
          {github && (
            <a 
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition group"
            >
              <Github className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300" />
            </a>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 flex items-center space-x-4 hover:bg-zinc-800 transition">
            <div className="p-3 bg-zinc-700/50 rounded-lg">
              <CalendarDays className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Member Since</p>
              <p className="text-zinc-100">{joinedOn}</p>
            </div>
          </div>

          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5 flex items-center space-x-4 hover:bg-zinc-800 transition">
            <div className="p-3 bg-zinc-700/50 rounded-lg">
              <Code2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">Tech Stack</p>
              <p className="text-zinc-100">{techstack?.length || 0} Technologies</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <User2 className="w-5 h-5 text-blue-400" />
            About Me
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            {aboutyou || "Your bio is empty. Tell the world who you are by writing a short description about you."}
          </p>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-400" />
            My Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techstack?.length ? (
              techstack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-zinc-700/50 text-zinc-100 rounded-lg text-sm hover:bg-zinc-700 transition"
                >
                  {tech}
                </span>
              ))
            ) : (
              <p className="text-zinc-500">No tech stack added yet.</p>
            )}
          </div>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Blogs
          </h2>
          <div className="space-y-4">
            {blogs?.length ? (
              blogs.map((blog, index) => (
                <UserBlogShow
                  key={index}
                  title={blog.title}
                  BlogLink={blog.BlogLink}
                  publishedOn={blog.publishedOn}
                />
              ))
            ) : (
              <p className="text-zinc-500">No blogs published yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

