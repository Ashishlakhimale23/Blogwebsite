import {  useState ,useEffect} from "react";
import { getdate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosroute";

function Bookmark(){
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);
  useEffect(() => {
    const fetchbookmarks = async () => {
      await api.get("/getbookmarks").then((resp) => {
        setBookmark(resp.data.bookmark.bookmarks);
      });
    };
    fetchbookmarks();
  }, []);
  return (
    <>
      <div className="min-h-screen w-full mt-16 p-4  ">
        <div className="mx-auto max-w-[900px] md:justify-center ">
          <p className="font-bold text-2xl mb-3 ">Bookmarks</p>
          <div className=" border-black border-2 p-4 rounded-md">
            {!bookmark.length ? (
              <p className="text-xl font-bold">You dont have any bookmarks</p>
            ) : (
              bookmark.map((bookmarks, index) => (
                <div className=" p-2 mb-2 rounded-md" key={index}>
                  <div className="flex ">
                    <div
                      className="flex-1 content-center cursor-pointer"
                      onClick={() => {
                        let BlogLink = bookmarks.BlogLink;

                        navigate(`/blog/${BlogLink}`);
                      }}
                    >
                      <p className="text-lg font-semibold hover:underline">
                        {bookmarks.title}
                      </p>
                      <p className=" text-gray-600 ">
                        {getdate(bookmarks.publishedOn)}
                      </p>
                    </div>
                  </div>
                  <hr className="border border-black mt-2 rounded-md" />
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