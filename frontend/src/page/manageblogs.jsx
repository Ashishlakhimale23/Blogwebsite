import { useContext } from "react"
import { Toaster,toast } from "react-hot-toast"
import { BlogContext, UserContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import { getdate } from "../utils/date"

import { api } from "../utils/axiosroute"

function ManageBlogs(){
  const { initialinfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { blogs } = initialinfo;
  const { setBlog } = useContext(BlogContext);
  return (
    <>
      <div className="min-h-screen w-full mt-16 p-4 ">
        <div className="mx-auto max-w-[900px] md:justify-center ">
          <p className="font-bold text-2xl mb-3 ">Blogs</p>
          <div className=" border-black border-2 p-4 rounded-md">
            {!blogs.length ? (
              <p className="text-xl font-bold">You dont have any blogs</p>
            ) : (
              blogs.map((blog, index) => (
                <div className=" p-2 mb-2 rounded-md" key={index}>
                  <div className="sm:flex ">
                    <div
                      className="flex-1 content-center cursor-pointer"
                      onClick={() => {
                        navigate(`/blog/${blog.BlogLink}`);
                      }}
                    >
                      <p className="text-lg font-semibold hover:underline">
                        {blog.title}
                      </p>
                      <p className="text-gray-600 ">
                        {getdate(blog.publishedOn)}
                      </p>
                    </div>
                    <div className="space-x-2  sm:space-y-0 flex  sm:flex-row">
                      <button
                        className="font-bold pt-2 w-full sm:w-fit pb-2 pr-4 pl-4 rounded-md hover:bg-black hover:text-white"
                        onClick={() => {
                          const blogbo = {
                            _id: blog._id,
                            title: blog.title,
                            content: blog.content,
                            banner: blog.banner,
                            edited: true,
                          };
                          setBlog(blogbo);
                          navigate("/createpost");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="font-bold  pt-2 pb-2 pr-4 w-full sm:w-fit pl-4 rounded-md  hover:bg-black hover:text-white"
                        onClick={async () => {
                          await api
                            .post("/deleteblog", {
                              _id: blog._id,
                              title: blog.title,
                            })
                            .then((resp) => {
                              if (
                                Object.values(resp.data).includes("deleted")
                              ) {
                                toast.success("blog deleted", {
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
export default ManageBlogs;