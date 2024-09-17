import  {useEffect, useRef, useState} from 'react';

import { useNavigate} from 'react-router-dom';
import  { Authcontext, UserContext, WholeBlogAndUser, searchpopover} from "../context/context.js";
import { useContext} from "react";
import { getdate } from '../utils/date.js';
import axios from 'axios';
import Search from './search.jsx';
import { api } from '../utils/axiosroute.js';
function Header() {
  const { logged, setLogged } = useContext(Authcontext);
  const [open, setOpen] = useState(false);
  const { search, setSearch } = useContext(searchpopover);
  const { initialinfo, setInitialinfo } = useContext(UserContext);
  const { username, pfplink, _id } = initialinfo;
  const { searchcontent, setSearchcontent } = useContext(WholeBlogAndUser);
  const popover = useRef(null);
  const image = useRef(null);
  const [loading, setLoading] = useState(true);
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
        setInitialinfo({
          _id: response.data.userinfo._id,
          username: response.data.userinfo.username,
          pfplink: response.data.userinfo.pfplink,
          email: response.data.userinfo.email,
          aboutyou: response.data.userinfo.about,
          github: response.data.userinfo.github,
          twitter: response.data.userinfo.twitter,
          techstack: response.data.userinfo.techstack,
          blogs: response.data.userinfo.blogs,
          draft: response.data.userinfo.draft,
          bookmarks: response.data.userinfo.bookmarks,
          joinedOn: getdate(response.data.userinfo.joinedOn),
        });
        setLoading(false);
      });
    }

    async function fetchusersandblogs() {
      await api
        .get("/getallusersandblogs")
        .then((resp) => {
          setSearchcontent({
            ...searchcontent,
            blogs: resp.data.blogs,
            users: resp.data.users,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchuserinfo();
    fetchusersandblogs();
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
  if (loading) {
    return (
      <div className=" w-full h-svh flex justify-center items-center ">
        <p className="text-4xl font-display font-bold">Loading ... </p>
      </div>
    );
  }
  return (
    <>
      <div className=" ">
        <header className="flex bg-white w-full font-display px-8 h-16 text-black justify-between border-b lg:px-20  sm:px-10 fixed top-0  ">
          <div
            className=" flex font-medium items-center  "
          >
            <div className="text-2xl font-bold cursor-pointer"
             onClick={() => {
              navigate("/home");
            }}
            >
              <span>Thoughts</span>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="space-x-4 flex items-center">
              <button
                ref={imagesearch}
                onClick={() => {
                  setSearch(!search);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-9 text-black font-display font-bold"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>

              <button
                className={`hidden px-5 rounded-lg text-sm  border-2 h-10 items-center text-black sm:block  `}
                onClick={() => {
                  navigate("/createpost");
                }}
              >
                Write
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
                  style={{ display: logged ? "block" : "none" }}
                />
              </button>
            </div>
          </div>
        </header>
        {open ? (
          <div
            className={`w-11/12 ml-6 mt-4 mb-4 flex-col fixed bottom-0 right-0 left-0 bg-white border-2 border-black rounded-lg sm:w-80  sm:left-auto sm:right-4 sm:bottom-auto `}
          >
            <div ref={popover}>
              <div
                className="flex space-x-2 hover:bg-black hover:text-white p-4  cursor-pointer"
                onClick={() => {
                  navigate(`/${username}`);
                  setOpen(false);
                }}
              >
                <img
                  src={pfplink}
                  className="h-11 rounded-md hover:opacity-80"
                />
                <div className="flex">
                  <p className="font-semibold text-xl flex items-center ">
                    {username}
                  </p>
                </div>
              </div>

              <div
                className="flex space-x-2 hover:bg-black hover:text-white  p-4 cursor-pointer"
                onClick={() => {
                  navigate("/draft");
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <p className="">My draft</p>
              </div>
              <div
                className=" flex space-x-2 hover:bg-black hover:text-white p-4 cursor-pointer"
                onClick={() => {
                  navigate("/bookmarks");
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>

                <p className=" ">Bookmarks</p>
              </div>
              <div
                className=" flex space-x-2 hover:bg-black hover:text-white p-4 cursor-pointer"
                onClick={() => {
                  navigate("/manageblogs");
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>

                <p className=" ">Manage blogs</p>
              </div>

              <div
                className=" flex space-x-2 hover:bg-black hover:text-white p-4"
                onClick={() => {
                  localStorage.removeItem("authtoken");
                  localStorage.removeItem("refreshtoken");
                  setLogged(false);
                  setOpen(false);
                  navigate("/login");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                  className="h-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>

                <p className="font-display ">Log out</p>
              </div>
            </div>
          </div>
        ) : null}
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