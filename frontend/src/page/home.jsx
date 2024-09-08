import { useContext, useEffect,useState } from "react";
import Card from "../component/card";
import { UserContext } from "../context/context";
import { api } from "../utils/axiosroute";
import {Toaster,toast} from "react-hot-toast"


function Home () {
 const {initialinfo} = useContext(UserContext)
    return (
      <>
       
        <div className="flex w-full h-full justify-center p-8 mt-16 mb-5 sm:p-12 md:p-16 " >
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {!initialinfo.blogs ? (
              <p className="text-4xl font-display font-bold text-black"></p>
            ) : (
              initialinfo.blogs.map((blog, i) => (
                <Card
                  key={i}
                  title={blog.title}
                  banner={blog.banner}
                  editorjs_data={blog.content}
                  author={blog.author}
                  publishedOn={blog.publishedOn}
                  content={blog.content}
                  id={blog._id}
                  bookmarks={initialinfo.bookmarks}
                  BlogLink={blog.BlogLink}
                
                ></Card>
              ))
            )}
          </div>
        </div>
      </>
    );
}
export default Home
