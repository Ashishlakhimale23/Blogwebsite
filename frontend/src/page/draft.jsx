import { useContext, useState,useEffect } from "react";
import { BlogContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosroute";
import { Toaster,toast } from "react-hot-toast";
import { getdate } from "../utils/date";
function Draft(){
  const [draft, setDraft] = useState([]);
  const { setBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchbookmarks = async () => {
      await api.get("/getdrafts").then((resp) => {
        setDraft(resp.data.drafts.draft);
      });
    };
    fetchbookmarks();
  }, []);
  return (
    <>
      <div className="min-h-screen w-full mt-16 p-4  ">
        <div className="mx-auto max-w-[900px] md:justify-center ">
          <p className="font-bold text-2xl mb-3 ">Drafts</p>
          <div className=" border-black border-2 p-4 rounded-md">
            {!draft.length ? (
              <p className="text-xl font-bold">You dont have any drafts</p>
            ) : (
              draft.map((drafts, index) => (
                <div className=" p-2 mb-2 rounded-md" key={index}>

                  <div className="sm:flex ">

                    <div className="flex-1 content-center cursor-pointer">
                      <p className="text-lg font-semibold">{drafts.title}</p>
                      <p className="text-gray-600 ">
                        {getdate(drafts.publishedOn)}
                      </p>
                    </div>

                    <div className="space-x-2 sm:space-y-0 flex  sm:flex-row  ">
                      <button
                        className="font-bold pt-2 pb-2 pr-4 pl-4 rounded-md w-full sm:w-fit hover:bg-black hover:text-white"
                        onClick={() => {
                          const blogbo = {
                            _id: drafts._id,
                            title: drafts.title,
                            content: drafts.content,
                            banner: drafts.banner,
                            edited: true,
                          };
                          setBlog(blogbo);
                          navigate("/createpost");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="font-bold  pt-2 pb-2 pr-4 pl-4 rounded-md w-full sm:w-fit  hover:bg-black hover:text-white"
                        onClick={async () => {
                          console.log(drafts._id);
                          await api
                            .post("/deleteblog", {
                              _id: drafts._id,
                              title: drafts.title,
                            })
                            .then((resp) => {
                              if (
                                Object.values(resp.data).includes("deleted")
                              ) {
                                toast.success("Draft deleted", {
                                  id: "success",
                                });
                                setTimeout(() => {
                                  toast.dismiss("success");

                                  window.location.reload();
                                }, 500);
                              }
                              if (
                                Object.values(resp.data).includes(
                                  "deleting failed"
                                )
                              ) {
                                return toast.error("Draft deletion failed");
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <hr className="border border-black  mt-2 rounded-md" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Draft;