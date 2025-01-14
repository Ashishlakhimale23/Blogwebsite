import { useContext, useState,useEffect } from "react";
import { BlogContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosroute";
import { toast } from "react-hot-toast";
import { getdate } from "../utils/date";
import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const Draft = () => {
  const [draft, setDraft] = useState([]);
  const { setBlog } = useContext(BlogContext);
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchbookmarks = async () => {
      await api.get("/getdrafts").then((resp) => {
        setDraft(resp.data.drafts.draft);
        setLoading(false)
      });
    };
    fetchbookmarks();
  }, []);
  const handleEdit = (drafts) => {
    if (!drafts) return;
    
    const blogbo = {
      _id: drafts._id,
      title: drafts.title,
      content: drafts.content,
      banner: drafts.banner,
      edited: true,
    };
    setBlog(blogbo);
    navigate("/createpost");
  };

  const handleDelete = async (drafts) => {
    if (!drafts || !api.post) return;

    try {
      const resp = await api.delete("/deletedraft", {
        params:{
        _id: drafts._id,
        }
      });
      
      if (resp.status===200) {
        const filter = draft.filter((draft)=>draft._id !== drafts._id)
        setDraft(filter)
        toast.success("Deleted")
      }
      else{
        return toast.error("Deletion Unsuccessfully")
      } 
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting the draft");
    }
  };

  if(loading){
    return (
      <div className="p-10 mx-2 animate-shimmer bg-gradient-to-r max-w-3xl sm:mx-auto mt-24 rounded-md from-zinc-500/5 via-zinc-500/10 to-zinc-500/5 bg-[length:400%_100%]">
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white w-full max-w-3xl mx-auto mt-24 px-4">
      <div className="space-y-6">
        <h1 className="font-bold text-3xl text-white/90">Drafts</h1>
        
        <div className="space-y-4">
          {!Array.isArray(draft) || draft.length === 0 ? (
            <div className="bg-zinc-800/50 rounded-lg p-8 text-center">
              <p className="text-xl font-medium text-white/70">You don't have any drafts yet</p>
            </div>
          ) : (
            draft.map((drafts, index) => (
              <div 
                key={index}
                className="group bg-zinc-800/50 hover:bg-zinc-800/70 rounded-lg p-4 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 cursor-pointer">
                    <h2 className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">
                      {drafts?.title || 'Untitled Draft'}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      {drafts?.publishedOn ? getdate(drafts.publishedOn) : 'No date'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(drafts)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-700/50 hover:bg-zinc-700 transition-colors"
                    >
                      <Edit size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(drafts)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Draft;