import { useContext, useState, useEffect,useRef } from "react";
import { getdate } from "../utils/date";
import { WholeBlogAndUser, searchpopover } from "../context/context";
import { useNavigate } from "react-router-dom";

function Search({imagesearch}) {
  const [searchvalue, setSearchvalue] = useState("");
  const [activetab, setActivetab] = useState("blogs");
  const [blogprediction, setBlogprediction] = useState([]);
  const [userprediction, setUserprediction] = useState([]);
  const { searchcontent } = useContext(WholeBlogAndUser);
  const { blogs, users } = searchcontent;
  const navigate = useNavigate();
  const { search, setSearch } = useContext(searchpopover);
const popoverRef = useRef(null);

  function predictionforblogs(word) {
    const predicatedarray = blogs.filter(
      (obj) => obj.title.toLowerCase().indexOf(word.toLowerCase()) !== -1
    );
    setBlogprediction(predicatedarray);
  }

  function predictionforusers(word) {
    const predicatedarray = users.filter(
      (obj) => obj.username.toLowerCase().indexOf(word.toLowerCase()) !== -1
    );
    setUserprediction(predicatedarray);
  }
 const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target) && imagesearch.current && !imagesearch.current.contains(event.target)) {
      setSearch(false);
    }
  };
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  useEffect(() => {
    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  return (
    <div className="fixed w-full min-h-screen bg-black/30 flex justify-center font-display p-3 pt-0">
      <div className="w-[700px] p-10 bg-white rounded-lg mt-3 h-fit max-h-screen overflow-y-scroll no-scrollbar" ref={popoverRef}>
        <div className="sticky top-0 bg-white z-10 pb-3">
          <input
            type="text"
            value={searchvalue}
            className="outline-none w-full p-4 border-4 border-black rounded-lg"
            onChange={(e) => {
              setSearchvalue(e.target.value);
              predictionforblogs(e.target.value);
              predictionforusers(e.target.value);
            }}
          />
          <div>
            {searchvalue.length === 0 ? (
              <div className="flex justify-center mt-2 text-lg">
                <p>Search for people, blogs, and tags</p>
              </div>
            ) : (
              <div>
                <div className="flex text-lg mt-3 justify-around">
                  <button
                    className={`pr-2 pl-2 pt-1 pb-1 hover:bg-black hover:text-white ${
                      activetab === "blogs" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActivetab("blogs")}
                  >
                    Blogs
                  </button>
                  <button
                    className={`pr-2 pl-2 pt-1 pb-1 hover:bg-black hover:text-white ${
                      activetab === "peoples" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActivetab("peoples")}
                  >
                    Peoples
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-10">
          {activetab === "blogs" && searchvalue.length !== 0 && (
            blogprediction.length === 0 ? (
              <div>No Result</div>
            ) : (
              blogprediction.map((bookmarks, index) => (
                <div className="p-2 mb-2 rounded-md" key={index}>
                  <div className="flex">
                    <div
                      className="flex-1 content-center cursor-pointer"
                      onClick={() => {
                        navigate(`/blog/${encodeURIComponent(bookmarks.title)}`, {
                          state: { data: { id: bookmarks._id } },
                        });
                        setSearch(!search);
                      }}
                    >
                      <p className="text-lg font-bold hover:underline">
                        {bookmarks.title}
                      </p>
                      <p className="text-lg font-bold">
                        {getdate(bookmarks.publishedOn)}
                      </p>
                    </div>
                  </div>
                  <hr className="border-2 border-black mt-2 rounded-md" />
                </div>
              ))
            )
          )}
        </div>
        <div>
          {activetab === "peoples" && searchvalue.length !== 0 && (
            userprediction.length === 0 ? (
              <div>No Result</div>
            ) : (
              userprediction.map((user, index) => (
                <div className="flex justify-between pl-2 pr-2 pb-2 mb-2" key={index}>
                  <div
                    className="flex space-x-2"
                    onClick={() => {
                      navigate(`/${user.username}`, {
                        state: { data: { userid: user._id } },
                      })
                      setSearch(false)
                    }}
                  >
                    <img
                      src={user.pfplink}
                      className="h-14 rounded-md hover:opacity-80"
                      alt={`${user.username}'s profile`}
                    />
                    <div>
                      <p className="font-semibold text-lg">{user.username}</p>
                      <p className=" font-display">
                       Member since {user.joinedOn ? getdate(user.joinedOn):"" }
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
