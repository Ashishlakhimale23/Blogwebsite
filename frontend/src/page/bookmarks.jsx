import {  useState ,useEffect} from "react";

import { getdate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/axiosroute";

function Bookmark(){
    const navigate = useNavigate()
  const [bookmark,setBookmark] = useState([])
    useEffect(()=>{
      const fetchbookmarks= async ()=>{
        await api.get("/getbookmarks").then((resp)=>{
       
          setBookmark(resp.data.bookmark.bookmarks)
        })
      }      
      fetchbookmarks()
    },[])
    return (
      <>
        <div className="min-h-screen w-full mt-16 p-4 font-display ">
          <div className="mx-auto max-w-[900px] md:justify-center ">
            <p className="font-bold text-2xl mb-3 ">Bookmarks</p>
            <div className=" border-black border-4 p-4 rounded-md">
              {!bookmark.length ? (
                <p className="text-xl font-bold">You dont have any bookmarks</p>
              ) : (
                bookmark.map((bookmarks, index) => (
                  <div className=" p-2 mb-2 rounded-md" key={index}>
                    <div className="flex ">
                      <div
                        className="flex-1 content-center cursor-pointer"
                        onClick={() => {
                          navigate(`/blog/${encodeURIComponent(bookmarks.title)}`, {

                            state: { data: { id: bookmarks._id } },
                          });
                        }}
                      >
                        <p className="text-lg font-bold hover:underline">
                          {bookmarks.title}
                        </p>
                        <p className="text-lg font-bold  ">
                          {getdate(bookmarks.publishedOn)}
                        </p>
                      </div>
                    </div>

                    <hr className="border-2 border-black mt-2 rounded-md" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
       
      </>
    );
}
export default Bookmark