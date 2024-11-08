import  {useEffect, useRef, useState} from 'react';
import {User,FileText,Bookmark,SquareChartGantt,Edit3,LogOut,Search as Luicidesearch} from "lucide-react"
import { useNavigate} from 'react-router-dom';
import  { Authcontext, UserContext, searchpopover} from "../context/context.js";
import { useContext} from "react";
import Search from './search.jsx';
import { api } from '../utils/axiosroute.js';

function Header() {
  const { logged, setLogged } = useContext(Authcontext);
  const [open, setOpen] = useState(false);
  const { search, setSearch } = useContext(searchpopover);
  const { info, setInfo } = useContext(UserContext);
  const { username, pfplink} = info;
  const popover = useRef(null);
  const image = useRef(null);
  const imagesearch = useRef(null);
  const handleClickOutside = (event) => {
    if (
      popover.current &&
      !popover.current.contains(event.target) &&
      image.current &&
      !image.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (open || search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [open, search]);

  useEffect(() => {
    const authtoken = localStorage.getItem("authtoken");
    authtoken ? setLogged(true) : setLogged(false);
    async function fetchuserinfo() {
      await api.get("/getuserinfo").then((response) => {
      
        setInfo({
          pfplink: response.data.userinfo.pfplink,
          username: response.data.userinfo.username
        });
      });
    }

    fetchuserinfo();
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="">
              <header className="w-full h-16 fixed top-0 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800 z-50">
        <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex  items-center space-x-4 ">
            <h1 className="text-xl sm:text-2xl font-bold text-white cursor-pointer " onClick={()=>navigate('/home')}>
              Thoughts
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              ref={imagesearch}
                onClick={() => {
                  setSearch(!search);
                }}
              className="px-4 py-2 flex items-center space-x-2 text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 
                       border border-zinc-700 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Luicidesearch className="w-5 h-5" />
              
            </button>
           <button
                onClick={() => {
                  navigate("/createpost")
                }}
              className="hidden px-4 py-2 sm:flex items-center space-x-2 text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 
                       border border-zinc-700 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
             <span className='text-sm'>New post</span> 
            </button>
           <button
                ref={image}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <img
                  src={pfplink}
                  className="h-10 rounded-full"
                />
              </button> 
          </div>
        </div>
      </header>
        {open ? (
          <div
            className={`
               fixed mt-20 bg-zinc-800 rounded-lg  top-0 text-white 
        right-4 Header:right-auto px-2 py-2 Header:left-[calc(50%+15rem)]
        w-44 
        z-20 `}
          >
            <div ref={popover}>
              <div

                className="flex space-x-2 px-[10px] py-2 cursor-pointer hover:bg-white hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  navigate(`/${username}`);
                  setOpen(false);
                }}
              >
                <div 
                className='flex '
                >
                  <User className='w-6 h-6 mr-1'/>
                  <span className="flex items-center ">
                    Profile
                  </span>
                </div>
              </div>

              <div

                className="flex space-x-2 px-[10px] py-2 hover:bg-white cursor-pointer hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  navigate("/draft");
                  setOpen(false);
                }}
              >
                <FileText className='w-6 h-6 mr-1'/>
                <span className="">My draft</span>
              </div>
              <button
                className="flex space-x-2 px-[10px] py-2 hover:bg-white hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  navigate("/bookmarks");
                  setOpen(false);
                }}
              >
                <Bookmark className='w-6 h-6 mr-1'/>

                <span>Bookmarks</span>
              </button>
             <button
                className="flex sm:hidden space-x-2 px-[10px] py-2 hover:bg-white hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  navigate("/createpost");
                  setOpen(false);
                }}
              >
                <Edit3 className='w-6 h-6 mr-1'/>

                <span>New Post</span>
              </button>
              <div

                className="flex  space-x-2 px-[10px] py-2 cursor-pointer hover:bg-white hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  navigate("/manageblogs");
                  setOpen(false);
                }}
              >
                <SquareChartGantt className='w-6 h-6 mr-1'/>
                <p className=" ">Manage blogs</p>
              </div>

              <div

                className="flex space-x-2 cursor-pointer px-[10px] py-2 hover:bg-white hover:text-black rounded-md w-full text-left "
                onClick={() => {
                  localStorage.removeItem("authtoken");
                  localStorage.removeItem("refreshtoken");
                  setLogged(false);
                  setOpen(false);
                  navigate("/login");
                }}
              >
                <LogOut/>
                <span className=" ">Log out</span>
              </div>
            </div>
          </div>
        ) :<div/>}
      </div>
      {search ? (
        <div>
          <Search imagesearch={imagesearch} />
        </div>
      ) : null}
    </>
  );
}

export default Header;