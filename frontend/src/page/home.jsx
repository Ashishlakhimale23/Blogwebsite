import { useEffect, useState} from "react";
import Card from "../component/card";
import { api } from "../utils/axiosroute";
import {toast} from "react-hot-toast"
import CardSkeleton from "../component/CardSkeleton";


function Home() {
  const [blogs,setBlogs] = useState([])
  const [bookmarks,setBookmarks] = useState([])
  const [loading,setLoading] = useState(true)
  
  const handlesavebookmark = async (id) => {
    
    try {
      await api.post("/savebookmark", { blogid: id });
      const bookmark = [...bookmarks,id]
      setBookmarks(bookmark) 
      toast.success("Added to Bookmarks");
    } catch {
      toast.error("Failed to add to bookmarks");
    }
  }

  const handleremovebookmark = async (id) => {
    
    try {
      const resp = await api.post("/removebookmark", { blogid: id });
      if (resp.data?.success) {
        const filter = bookmarks.filter((bookmark)=>bookmark!==id)
        setBookmarks(filter)
        toast.success("Removed from Bookmarks");
      } else {
        toast.error("Failed to remove");
      }
    } catch {
      toast.error("Failed to remove from Bookmarks");
    }
  }


  useEffect(()=>{
    const fetchBlogs = async()=>{
      
      const response = await api.get('/getblogs')
      if(response.status == 200){
        setBlogs(response.data.blogs)
        setBookmarks(response.data.bookmarks.bookmarks)
        setLoading(false)
      }
    }
    fetchBlogs()

  },[])

  if(loading){
    return(
     
    <div className="flex flex-col items-center w-full mt-24 max-w-3xl mx-auto px-4 mb-10 space-y-4">
    <CardSkeleton/>
    </div>
    ) 
  }
  
  return (
    <div className="flex flex-col items-center w-full mt-24 max-w-3xl mx-auto px-4 mb-10 space-y-4">
      {!blogs ? (
        <p className="text-4xl font-bold text-gray-300">NO BLOGS TO SHOW</p>
      ) : (
        blogs.map((blog, i) => (
          <div key={i} className="w-full">
            <Card
              title={blog.title}
              banner={blog.banner}
              author={blog.author}
              publishedOn={blog.publishedOn}
              id={blog._id}
              bookmarks={bookmarks}
              BlogLink={blog.BlogLink}
              handleremovebookmark={handleremovebookmark}
              handlesavebookmark={handlesavebookmark}
            />
          </div>
        ))

      )}
    </div>
  );
}

export default Home;


