import {getdate} from "../utils/date"
import {useNavigate} from "react-router-dom"
import { Bookmark, BookmarkX } from 'lucide-react';

function Card({BlogLink,banner,title,author,publishedOn,id,bookmarks,handleremovebookmark,handlesavebookmark}) {
  const navigate = useNavigate();

  const {username} = author;
  let date = getdate(publishedOn);


  return (
    <div 
      className="group relative font-display overflow-hidden rounded-2xl transition-all duration-300 p-3 sm:p-4 bg-zinc-800/40 border border-zinc-700/40 cursor-pointer"
      onClick={() => navigate(`/blog/${BlogLink}`)}
    >
      <button
        className="absolute top-6 right-6  sm:top-8 sm:right-8 p-2 bg-zinc-800/70 hover:bg-zinc-700/70 rounded-full transition-colors"
        onClick={(e) => {
          e.stopPropagation();
         Array.isArray(bookmarks) && bookmarks.includes(id) ? handleremovebookmark(id) : handlesavebookmark(id);
        }}
        aria-label={Array.isArray(bookmarks) && bookmarks.includes(id) ? "Remove from bookmarks" : "Save to bookmarks"}
      >
        {Array.isArray(bookmarks) && bookmarks.includes(id) ? (
          <BookmarkX className="w-5 h-5 text-zinc-100" />
        ) : (
          <Bookmark className="w-5 h-5 text-zinc-400" />
        )}
      </button>
      
      <img
        src={banner} 
        alt="banner"
        className="w-full max-h-96 object-cover rounded-2xl"
      />
      
      <div>
        <h3 className="text-lg sm:text-2xl font-semibold line-clamp-3 text-zinc-100 leading-tight mt-3">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-400 mt-1">
          <span className="hover:text-white transition-colors" onClick={(e)=>{
            e.stopPropagation()
            navigate(`/${username}`)}}>{username}</span> • {date}
        </p>
      </div>
    </div>
  )
};


export default Card;