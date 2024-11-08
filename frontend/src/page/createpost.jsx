import { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs"
import tool from "../utils/tools"
import {BlogContext } from "../context/context.js";
import { toast } from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import deafultbanner from "../img/blog banner.png"
import { api } from "../utils/axiosroute.js";
import { Save, Send, Image } from 'lucide-react';

function CreatePost() {
  const { blog, setBlog, texteditor, setTexteditor } = useContext(BlogContext);
  const { title, content, banner, _id, edited } = blog;

  const [loading, setLoading] = useState(false);
  const status = useRef(true)
  const navigate = useNavigate();

  const BlogbannerRef = useRef();

  useEffect(() => {

    const initializeEditor = () => {
      if (!texteditor.isReady) {
        const editor = new EditorJS({
          holder: "texteditor",
          data: { blocks: Array.isArray(content) && content.length ? content : [] },
          tools: tool,
          placeholder: "Write some stories....",
          onChange: async () => {
            const savedBlock = await editor.save();
            setBlog((prevBlog) => ({
              ...prevBlog,
              content: savedBlock.blocks,
            }));
          },
        });

        editor.isReady.then(() => {
          setTexteditor({ isReady: true, instance: editor });
        });
      }
    };

    initializeEditor();

    return () => {
      if (texteditor.instance) {
        texteditor.instance.destroy();
        setTexteditor({ isReady: false, instance: null });
      }
    };
  }, [setBlog, texteditor.isReady, texteditor.instance]);
  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(blog));
    return () => {
      setBlog((prevBlog) => ({
        title: "",
        banner: "",
        content: [],
        _id: "",
        edited: false,
      }));
    };
  }, [setBlog]);

  const handletitlechange = (e) => {
    setBlog({ ...blog, title: e.target.value });

    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollheight = textarea.scrollHeight;
    textarea.style.height = `${scrollheight}px`;
  };

  const handlebannerinput = async (e) => {
    const filename = e.target.files[0];
    const formData = new FormData();
    formData.append("file", filename);
    formData.append("upload_preset", process.env.UPLOAD_PRESET);
    formData.append("api_key", process.env.API_KEY);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      setBlog((prevBlog) => ({ ...prevBlog, banner: data.secure_url }));
      BlogbannerRef.current.src = data.secure_url;
    } else {
      throw new Error("Failed to upload image");
    }
  };
  const handletitlekeydown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlepublish = async (e) => {
    if (!banner.length) {
      return toast.error("upload the blog banner...");
    }
    if (!title.length) {
      return toast.error("upload the blog title...");
    }

    if (texteditor.isReady) {
      try {
        setLoading(true);
        const savedData = await texteditor.instance.save();
        console.log(savedData);
        if (savedData.blocks.length > 0) {
          setBlog((prevBlog) => ({ ...prevBlog, content: savedData.blocks }));
          console.log(content);
          if (edited) {
            const response = await api
              .post("/updateblog", {
                _id,
                title,
                content: savedData.blocks,
                result:status.current,
                banner,
              })
              if(response.status===200){
               setBlog(({
                ...prevBlog,
                title: "",
                banner: "",
                content: [],
                _id: "",
                edited: false,
              }));
              navigate("/home");
               
              return toast.success("Created Blog"); 

            }else{
              console.log(response)
               setBlog(({
                ...prevBlog,
                title: "",
                banner: "",
                content: [],
                _id: "",
                edited: false,
              }));
              return toast.error("Cant uplaod")
            }
              
          }
          if (!edited) {
            const response = await api.post("/createblog", {
              title,
              content: savedData.blocks,
              result:status.current,
              banner,
            });
            if (response.status === 200) {
              setBlog((prevBlog) => ({
                ...prevBlog,
                title: "",
                banner: "",
                content: [],
                _id: "",
                edited: false,
              }));
              navigate("/home");

              return toast.success("Created Blog");
            } else {
              return toast.error("Cant Uplaod the blog");
            }
          }
        } else {
          return toast.error("Please write some content.");
        }
      } catch (error) {
        console.error("Error saving or posting blog:", error);
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="w-full h-16 fixed top-0 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="sm:flex sm:visible items-center space-x-4 hidden ">
            <h1 className="text-xl sm:text-2xl font-bold text-white ">
              Thoughts
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="draft"
              onClick={()=>{
                status.current = false
                handlepublish()}}
              disabled={loading}
              className="px-4 py-2 flex items-center space-x-2 text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 
                       border border-zinc-700 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span className="">Save Draft</span>
            </button>
            <button
              id="published"
              onClick={handlepublish}
              disabled={loading}
              className="px-4 py-2 flex items-center space-x-2 text-white  bg-zinc-800/50 hover:bg-zinc-800
                  border border-zinc-700  rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="">Publish</span>
            </button>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pt-24 px-4 pb-20">
        <div className="mb-8">
          <div className="relative group rounded-xl overflow-hidden bg-zinc-800/50 border-2 border-dashed border-zinc-700 
                        hover:border-zinc-600 transition-colors aspect-video max-h-[575px] mx-auto">
            <label htmlFor="uploadbanner" className="cursor-pointer">
              <img
                src={!banner ? deafultbanner : banner}
                ref={BlogbannerRef}
                alt="Blog banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                            transition-opacity flex items-center justify-center">
                <div className="text-white flex flex-col items-center space-y-2">
                  <Image className="w-8 h-8" />
                  <p className="text-sm">Click to upload banner image</p>
                </div>
              </div>
              <input
                id="uploadbanner"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={handlebannerinput}
              />
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <textarea
            type="text"
            className="w-full bg-transparent text-4xl md:text-5xl font-bold text-white placeholder-zinc-500 
                     resize-none outline-none overflow-hidden leading-tight"
            placeholder="Write your title here..."
            rows={1}
            value={title}
            onChange={handletitlechange}
            onKeyDown={handletitlekeydown}
          />
          
          <div 
            id="texteditor" 
            className="text-white font-display  max-w-none mx-auto"
          />
        </div>
      </form>
    </div>
  );
};



export default CreatePost;
