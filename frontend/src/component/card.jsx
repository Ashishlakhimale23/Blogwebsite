import {  useContext, useEffect, useState  } from "react";
import {getdate} from "../utils/date"
import { content } from "../utils/content";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { UserContext } from "../context/context";
import { api } from "../utils/axiosroute";

function Card({banner,title,content:Content,author,activities,publishedOn,id}){
  let navigate = useNavigate();
  const des = content(Content)

  const {username,pfplink,_id:userid} = author;
  let date =  getdate(publishedOn);
  const {initialinfo,setInitialinfo} = useContext(UserContext)
  const {bookmarks}= initialinfo
  
 


const handlesavebookmark =async ()=>{
  setInitialinfo((prevInfo)=>({...prevInfo,bookmarks:[...bookmarks,id]}))
  await api.post("/savebookmark",{blogid:id}).then(resp=>console.log(resp)).catch(err=>console.log(err))
}
const handleremovebookmark=async ()=>{
  setInitialinfo((prevInfo)=>({...prevInfo,bookmarks:bookmarks.filter(saved=>saved!=id)}))
  await api.post("/removebookmark",{blogid:id}).then(resp=>console.log(resp)).catch(err=>console.log(err))
}

    return (
     <div className="w-full space-y-4 flex-shrink-0 antialiased font-display border-black border-4 shadow-custom max-w-[600px] flex flex-col min-h-fit">
  <div className="flex-grow" onClick={() => { navigate(`/blog/${encodeURIComponent(title)}`, { state: { data: { id } } }) }}>
    <div className="flex-shrink-0">
      <img
        src={banner}
        alt="Descriptive alt text"
        className="w-full h-60 sm:h-72 object-cover border-b-4 border-black"
      />
    </div>

   <div className="pl-2 pr-2 cursor-pointer flex-grow ">
  <div className="leading-6 line-clamp-4 overflow-ellipsis md:min-h-[100px]">
    <p className="text-2xl font-bold mb-1">{title}</p>
    <p className="text-black font-medium hidden sm:block" dangerouslySetInnerHTML={{ __html: des }}></p>
  </div>
</div>
 
  </div>

  <div className="flex justify-between pl-2 pr-2 pb-2 mt-auto">
    <div className="flex space-x-2 cursor-pointer" onClick={() => {
      navigate(`/${username}`, { state: { data: { userid } } })
    }}>
      <img
        src={pfplink}
        className="h-11 rounded-md hover:opacity-80"
      />
      <div>
        <p className="font-semibold">{username}</p>
        <p className="text-sm font-display">{date}</p>
      </div>
    </div>
    <div className="flex items-center">
      <div>
        {!bookmarks.includes(id) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={handlesavebookmark}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={handleremovebookmark}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
            />
          </svg>
        )}
      </div>
    </div>
  </div>
</div>
 
    );
}
export default Card ;