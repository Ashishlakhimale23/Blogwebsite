import { useState } from "react";
import {BlogContext} from "./context.js"
//these is the home and create blog context 
function BlogProvider({children}){
    
    const blogstructure = {
        _id:"",
        content:[ ],
        title :"",
        banner:" ",
        edited:false,
        
        }
    const [blog,setBlog] = useState(()=>{
        const saved = localStorage.getItem("blog")
        return saved ? JSON.parse(saved) : blogstructure}) 
    const [texteditor,setTexteditor]=useState({isReady:false,instance:null})
    return(
        <BlogContext.Provider value={{blog,setBlog,texteditor,setTexteditor}}>{children}</BlogContext.Provider>
    )
}
export default BlogProvider;