import {  useState ,useEffect} from "react";
import { getdate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosroute";

function Bookmark(){
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchbookmarks = async () => {
      
      await api.get("/getbookmarks").then((resp) => {
        setBookmark(resp.data.bookmark.bookmarks);
        setLoading(false)
      });
    };
    fetchbookmarks();
  }, []);
 if(loading){
    return (
      <div className="p-10 animate-shimmer bg-gradient-to-r max-w-3xl mx-auto mt-24 rounded-md from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]">
      </div>
    )
  } 
  return (
  <div className="min-h-screen bg-zinc-900 text-white w-full max-w-3xl mx-auto mt-24 px-4">
      <div className="space-y-6">
        <h1 className="font-bold text-3xl text-white/90">Bookmarks</h1>
        
        <div className="space-y-4">
          {!Array.isArray(bookmark) || bookmark.length === 0 ? (
            <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
              <p className="text-xl font-medium text-white/70">You don't have any bookmarks yet</p>
            </div>
          ) : (
            bookmark.map((drafts, index) => (
              <div 
                key={index}
                className="group bg-zinc-800/50 hover:bg-zinc-800/70 rounded-lg p-4 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" onClick={()=>navigate(`/blog/${drafts.BlogLink}`)}>
                  <div className="flex-1 cursor-pointer">
                    <h2 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                      {drafts?.title}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      {drafts?.publishedOn ? getdate(drafts.publishedOn):  ""}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div> 
  );
}
export default Bookmark