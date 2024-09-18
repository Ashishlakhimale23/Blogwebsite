import {  useContext  } from "react";
import {getdate} from "../utils/date"
import { content } from "../utils/content";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../context/context";
import { api } from "../utils/axiosroute";
import {toast} from "react-hot-toast"

function Card({BlogLink,banner,title,content:Content,author,publishedOn,id}){
  let navigate = useNavigate();
  const des = content(Content);

  const { username, pfplink, _id: userid } = author;
  let date = getdate(publishedOn);
  const { initialinfo, setInitialinfo } = useContext(UserContext);
  const { bookmarks } = initialinfo;

  const handlesavebookmark = async () => {
    setInitialinfo((prevInfo) => ({
      ...prevInfo,
      bookmarks: [...bookmarks, id],
    }));


    await api
      .post("/savebookmark", { blogid: id })
      .then(() => toast.success("Added to Bookmarks"))
      .catch(() => toast.error("Failed to add to bookmarks"));
  };
 
  
  const handleremovebookmark = async () => {
    setInitialinfo((prevInfo) => ({
      ...prevInfo,
      bookmarks: bookmarks.filter((saved) => saved != id),
    }));
    await api
      .post("/removebookmark", { blogid: id })
      .then((resp) => {
        if(Object.keys(resp.data).includes("success")){
             return toast.success("Removed from Bookmarks")
        }else{
          return toast.error("Failed to remove ")
        }
      }
    )
      .catch((err) => toast.error("Failed to remove from Bookmarks helllo"));
  };

  return (
    <div className="w-full flex flex-col space-y-3 p-4 ">
      <div className="flex w-full items-center space-x-2 justify-between">
        <div className="flex space-x-3 cursor-pointer"
          onClick={() => {
            navigate(`/${username}`);
          }}
        >
          <img
            src={pfplink}
            alt={username}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">{date}</p>
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

      <div
        className="flex space-x-4 cursor-pointer"
        onClick={() => {
          navigate(`/blog/${BlogLink}`);
        }}
      >
        <div className="flex-grow space-y-2">
          <p className="text-xl sm:text-2xl font-bold">{title}</p>
          <p className="text-gray-600 line-clamp-2">{des}</p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={banner}
            alt="Blog post banner"
            className="sm:h-32 h-fit object-cover rounded hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
}
export default Card ;