import { useContext, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs"
import tool from "../utils/tools"
import { Authcontext, BlogContext } from "../context/context.js";
import { Toaster, toast } from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import deafultbanner from "../img/blog banner.png"
import { api } from "../utils/axiosroute.js";


function CreatePost() {
  
  const { blog, setBlog, texteditor, setTexteditor } = useContext(BlogContext);
  const {title,content,banner,_id,edited} = blog;
  const {setAuthToken} = useContext(Authcontext)
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BlogbannerRef = useRef();

  useEffect(() => {
    setAuthToken(localStorage.getItem("authtoken"));

  
  const initializeEditor = () => {
      if (!texteditor.isReady) {
        const editor = new EditorJS({
          holder: "texteditor",
          data: { blocks: content.length ? content : [] },
          tools: tool, 
          placeholder: "Write some stories....",
          onChange: async () => {
            const savedBlock = await editor.save();
            setBlog((prevBlog) => ({
              ...prevBlog,
              content: savedBlock.blocks
            }));
          }
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
  }, [setAuthToken, setBlog, texteditor.isReady, texteditor.instance]);
useEffect(()=>{
localStorage.setItem('blog', JSON.stringify(blog));
   return ()=>{
setBlog((prevBlog) => ({
                    title: "",
                    banner: "",
                    content: [],
                    _id: "",
                    edited: false,
                  }));
   } 
},[]) 

  const handletitlechange = (e) => {
    setBlog({ ...blog, title: e.target.value })
  
    const textarea = e.target;
    textarea.style.height = "auto"
    const scrollheight = textarea.scrollHeight
    textarea.style.height = `${scrollheight}px`
  };

  const handlebannerinput = async (e) => {
    const filename = e.target.files[0];
    const formData = new FormData();
    formData.append("file", filename);
    formData.append("upload_preset", process.env.UPLOAD_PRESET);
    formData.append("api_key",process.env.API_KEY);
 
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
      e.preventDefault()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlepublish = async (e) => {
    let state = e.target.id;
    let str = state.toString();
    let result = str === "published";
    
    if (!banner.length){
      return toast.error("upload the blog banner...")
    }
    if (!title.length) {
      return toast.error("upload the blog title...")
    }

    if (texteditor.isReady) {
      try {
        setLoading(true);
        const savedData = await texteditor.instance.save();
        console.log(savedData)
        if (savedData.blocks.length > 0) {
          setBlog((prevBlog) => ({ ...prevBlog, content: savedData.blocks }));
          console.log(content);
          if(edited && _id.length){
            await api
              .post("/updateblog", {
                _id,
                title,
                content: savedData.blocks,
                result,
                banner,
              })
              .then((response) => {
                toast.success("Blog created successfully!", { id: "success" });

                setTimeout(() => {
                  toast.dismiss("success");
                  setBlog((prevBlog) => ({
                    ...prevBlog,
                    title: "",
                    banner: "",
                    content: [],
                    _id: "",
                    edited: false,
                  }));
                  navigate("/home");
                }, 500);
              })
              .catch((err) => console.log(err));

            }        
            else{    

           await api.post("/createblog", { title,content:savedData.blocks,result,banner})
            .then((response) =>{ toast.success("Blog created successfully!",{id:"success"})
                        
              setTimeout(() => {
                toast.dismiss('success');
                setBlog((prevBlog)=>({...prevBlog ,title:"",banner:"",content:[],_id:"",edited:false}))
               navigate("/home") 
              }, 500);
            })
            .catch(err => console.log(err));
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
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <header className="w-full flex border-black border-b-4 text-white items-center shadow-md justify-between font-display fixed top-0 bg-silver z-50">
          <div className="text-xl md:text-[28px] font-bold flex items-center lg:pl-32 space-x-6 grow pl-8  md:justify-start md:pl-10 md:grow-0">
            <div className="text-black ">
              <span className="">Get</span>
              <span className="">better</span>
              <span className="">*</span>
            </div>
          </div>

          <div className="space-x-2 lg:space-x-10 lg:pr-28 flex md:pr-10 pr-2 md:space-x-10 text-black items-center">
            <button
              id="published"
              className=" md:p-4 font-bold md:text-xl items-center hover:bg-black hover:text-white p-1 pt-4 pb-4 "
              onClick={handlepublish}
              disabled={loading}
            >
              Publish
            </button>
            <button
              id="draft"
              className=" md:p-4 font-bold md:text-xl items-center hover:bg-black hover:text-white p-1 pt-4 pb-4 "
              onClick={handlepublish}
              disabled={loading}
            >
              Save draft
            </button>
            
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:px-20  lg:py-10  md:px-10 md:py-5 px-5 mt-20 font-display"
        >
          <div className="lg:flex lg:justify-center mb-3">
            <div className="hover:opacity-80 aspect-video lg:h-[575px]  bg-white border-4 border-black">
              <label htmlFor="uploadbanner">
                <img
                  src={!banner?deafultbanner:banner}
                  ref={BlogbannerRef}
                  
                  className="z-20 w-full h-full"
                />
                <input
                  id="uploadbanner"
                  type="file"
                  accept=".png , .jpg , .jpeg"
                  hidden
                  className="h-full w-full"
                  onChange={handlebannerinput}
                />
              </label>
            </div>
          </div>
          <div className="lg:px-10">
            <textarea
              type="text"
              className="outline-none resize-none p-2 w-full overflow-hidden text-5xl font-extrabold mb-1"
              placeholder="Title"
              rows={1}
              value={title}
              onChange={handletitlechange}
              onKeyDown={handletitlekeydown}
            />
          </div>
          <hr className=" my-5" />
          <div id="texteditor" className=" text-xl w-full p-4 "></div>
        </form>
      </div>
      <Toaster />
    </>
  );
}

export default CreatePost;
