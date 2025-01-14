import { useContext, useState, useEffect,useRef,useCallback} from "react";
import { getdate } from "../utils/date";
import { searchpopover } from "../context/context";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce"
import { api } from "../utils/axiosroute";

function Search({imagesearch}) {
  const [searchvalue, setSearchvalue] = useState("");
  const [activetab, setActivetab] = useState("blogs");
  const [blogs,setBlogs] = useState([])
  const [users,setUsers] = useState([])
  const [blogprediction, setBlogprediction] = useState([]);
  const [userprediction, setUserprediction] = useState([]);
  const navigate = useNavigate();
  const { search, setSearch } = useContext(searchpopover);
  const popoverRef = useRef(null);


 useEffect(() => {
  async function fetchusersandblogs() {
    try {
      const resp = await api.get("/getallusersandblogs");
      console.log(resp);
      setBlogs(resp.data.blogs);
      setUsers(resp.data.users);
    } catch (err) {
      console.log(err);
    }
  }
  fetchusersandblogs();
}, []);

const debouncedSearch = useCallback(
  debounce((searchTerm) => {
    if (searchTerm === "") {
      setBlogprediction([]);
      setUserprediction([]);
    } else {
      const predicatedblogarray = blogs.filter(
      (obj) => obj.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBlogprediction(predicatedblogarray);

     const predicateduserarray = users.filter(
      (obj) => obj.username.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setUserprediction(predicateduserarray); 
  
    }
  }, 300),
  [blogs,users]
);

useEffect(() => {
  debouncedSearch(searchvalue.trim());
  return () => {
    debouncedSearch.cancel();
  };
}, [searchvalue,debouncedSearch]);

    
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
    <div className="fixed w-full min-h-screen flex justify-center z-50 text-white p-3 pt-28">
      <div className="w-[700px] p-10 bg-zinc-800 rounded-lg h-fit max-h-screen overflow-y-scroll no-scrollbar shadow-xl" ref={popoverRef}>
        <div className="sticky top-0  pb-3">
          <input
            type="text"
            value={searchvalue}
            className="outline-none w-full bg-zinc-700/50 p-4 rounded-lg"
            onChange={(e) => {
              setSearchvalue(e.target.value);
            }}
          />
          <div>
            {!searchvalue.length ? (
              <div className="flex justify-center mt-2 text-lg">
                <p>Search for people and blogs</p>
              </div>
            ) : (
              <div>
                <div className="flex text-lg mt-3 justify-around">
                  <button
                onClick={() => {
                  setActivetab("blogs")
                }}
              className={`px-4 py-2 flex items-center space-x-2 
                       border border-zinc-700 rounded-lg transition-all duration-200 disabled:opacity-50 ${activetab !=='blogs' ? 'text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 ':'bg-zinc-700/50 text-white'}`}
            >
             Blogs 
            </button>
            <button
                onClick={() => {
                  setActivetab("peoples")
                }}
              className={`px-4 py-2 flex items-center space-x-2 
                       border border-zinc-700 rounded-lg transition-all duration-200 disabled:opacity-50 ${activetab !=='peoples' ? 'text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 ':'bg-zinc-700/50 text-white'} `}
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
                        navigate(`/blog/${bookmarks.BlogLink}`);
                        setSearch(!search);
                      }}
                    >
                      <p className="text-lg text-white hover:underline">
                        {bookmarks.title}
                      </p>
                      <p className="text-lg text-slate-600">
                        {getdate(bookmarks.publishedOn)}
                      </p>
                    </div>
                  </div>
                  <hr className="border-1 mt-2 rounded-md" />
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
                      navigate(`/${user.username}`)
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
export default Search