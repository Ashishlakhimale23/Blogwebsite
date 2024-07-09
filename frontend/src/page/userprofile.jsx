import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/context"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {getdate} from "../utils/date"
import { api } from "../utils/axiosroute"
import UserBlogShow from "../component/userblogshow"
export function UserProfile(){
 const navigate = useNavigate() 
 const {username:Username} = useParams()
 const location = useLocation();
 const {userid} = location.state.data
 
 const {info,setInfo,initialinfo} = useContext(UserContext);
 const {username:usersusername} = initialinfo;
 
const {
 
  username,
  pfplink,
  aboutyou,
  github,
  twitter,
  techstack,
  blogs,
  joinedOn
}=info
useEffect(()=>{
    async function fetchuserinfo(){
     await api.post("/getotheruserinfo",{username:Username,userid:userid}).then((response)=>{
      setInfo({
        ...info,
        username: response.data.userinfo[0].username,
        pfplink: response.data.userinfo[0].pfplink,
        email: response.data.userinfo[0].email,
        aboutyou: response.data.userinfo[0].about,
        github: response.data.userinfo[0].github,
        twitter: response.data.userinfo[0].twitter,
        techstack: response.data.userinfo[0].techstack,
        blogs: response.data.userinfo[0].blogs,
        joinedOn:getdate(response.data.userinfo[0].joinedOn)
      });
      

    }).catch(err=>console.log(err))

    }
    
    fetchuserinfo()

 },[])

 

    return (
      <>
        <div className="w-full h-full p-10 pl-5 pr-5  font-display mt-16 md:p-16 ">
          <div className="space-y-8 max-w-4xl  lg:flex-row lg:justify-center lg:items-center mx-auto ">
            <div className="w-full h-fit space-y-3 md:flex ">
              <div className="md:flex md:items-center  md:space-x-3 w-full">
                <img src={pfplink} alt="" className="w-28 h-28 rounded-full" />
                <div className="lg:flex lg:justify-between w-full">
                  <p className="text-2xl font-display font-bold ">{username}</p>
                  <div
                    style={{
                      display: username === usersusername ? "block" : "none",
                    }}
                  >
                    <button
                      className="mr-3 pr-8 pl-8 p-2 align-middle  bg-silver  border-black border-4 text-black text-xl font-semibold hover:text-white hover:bg-black"
                      onClick={() => {
                        navigate(`/edit/${username}`);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border-4 border-black  rounded-lg p-6 space-y-3 ">
              <div
                className="space-x-2 "
                style={{
                  display: github.length || twitter.length ? "flex" : "none",
                }}
              >
                <div className="w-fit ">
                  <a href={twitter}>
                    <button
                      className="rounded-full p-2  hover:bg-gray-300 "
                      style={{ display: twitter ? "block" : "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enable-background="new 0 0 1668.56 1221.19"
                        viewBox="0 0 1668.56 1221.19"
                        id="twitter-x"
                        className="h-4"
                      >
                        <path
                          d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                          transform="translate(52.39 -25.059)"
                        ></path>
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="w-fit">
                  <a href={github}>
                    <button
                      className="rounded-full p-2 hover:bg-gray-300"
                      style={{ display: github ? "block" : "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        id="github"
                        className="h-4"
                      >
                        <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
              <div className="space-x-2 p-1 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                <p className="font-display">Member Since {joinedOn}</p>
              </div>
            </div>
            <div className="wfull h-fit ">
              <div className="border-4 border-black p-6 mb-3 rounded-lg min-h-44">
                <p className="text-xl font-bold mb-2">About Me</p>
                <p className="font-display text-black">
                  {aboutyou
                    ? aboutyou
                    : "Your bio is empty. Tell the world who you are by writing a short description about you."}
                </p>
              </div>
              <div className="border-4 border-black p-6 mb-3 rounded-lg min-h-44">
                <p className="text-xl font-bold mb-2">My Tech Stack</p>
                <div className="flex font-display text-gray-400">
                  {!techstack
                    ? null
                    : techstack.map((tech, index) => (
                        <div
                          key={index}
                          className="w-fit  items-center p-1 pr-2 pl-2 ring-1 hover:bg-blue-100 ring-blue-700 m-1 text-blue-600 rounded-2xl  "
                        >
                          <p>{tech} </p>
                        </div>
                      ))}
                </div>
              </div>

              <div className="border-4 border-black p-6 mb-3 rounded-lg min-h-44">
                <p className="text-xl font-bold mb-2">Blogs</p>
                <div className=" font-display text-gray-400">
                  {!blogs
                    ? null
                    : blogs.map((blog, index) => (
                        <UserBlogShow key={index} _id={blog._id} title={blog.title} publishedOn={blog.publishedOn} />
                      ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    );
}
