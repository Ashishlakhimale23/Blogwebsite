import { useNavigate } from "react-router-dom";
import { getdate } from "../utils/date";
import { Calendar, ArrowUpRight } from 'lucide-react';

function UserBlogShow({
    title,
    publishedOn,
    BlogLink
}) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/blog/${BlogLink}`)}
      className="group relative bg-zinc-800/30 hover:bg-zinc-800/60 p-4 rounded-lg cursor-pointer transition-all duration-200 border border-zinc-700/50 hover:border-zinc-700"
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-300">
          <Calendar className="w-4 h-4" />
          <span>Published on {getdate(publishedOn)}</span>
        </div>
      </div>
      
    </div>
  );
}

export default UserBlogShow;