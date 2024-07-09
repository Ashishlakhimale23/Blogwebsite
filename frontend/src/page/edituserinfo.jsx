import { useRef, useState , useEffect, useContext} from "react";
import techStack from "../utils/suggestion";
import { UserContext } from "../context/context";
import Joi from "joi";
import { getdate } from "../utils/date";
import {Toaster,toast} from "react-hot-toast"
import { api } from "../utils/axiosroute";
function Usersinfo(){
  const twittervalidation = Joi.string().pattern(/^https:\/\/twitter\.com\/[A-Za-z0-9_]+$/).required() 
   const xvalidation =  Joi.string().pattern(/^https:\/\/x\.com\/[A-Za-z0-9_]+$/).required()  
   const githubvalidation= Joi.string().pattern(/^https:\/\/github\.com\/[A-Za-z0-9_]+$/).required()
    

  const { info, setInfo,initialinfo  } =
    useContext(UserContext);
  const { email, username, twitter, github, aboutyou, techstack, pfplink } =
    info;

  const [predicated, setPredicated] = useState([]);

  const [temptechstack, setTemptechstack] = useState("");
  const stackRef = useRef();
  const pfpRef = useRef();

  useEffect(() => {

async function fetchuserinfo(){
     await api.get("/getuserinfo").then((response)=>{
      console.log(response)
console.log("its not setting the info ")
      setInfo({
        
        _id:response.data.userinfo._id,
        username: response.data.userinfo.username,
        pfplink: response.data.userinfo.pfplink,
        email: response.data.userinfo.email,
        aboutyou: response.data.userinfo.about,
        github: response.data.userinfo.github,
        twitter: response.data.userinfo.twitter,
        techstack: response.data.userinfo.techstack,
        draft: response.data.userinfo.draft,
        joinedOn:getdate(response.data.userinfo.joinedOn)
      });
      

    }).catch(err=>console.log(err))

    }
    fetchuserinfo()
    },[])
      
  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(info));
  }, [info]);
  const getpredicatedvalue = (value) => {
    const flitered = techStack.filter(
      (item) => item.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    setPredicated(flitered.slice(0, 5));
  };

  const handletechstack = (e) => {
    setTemptechstack(e.target.value);
    getpredicatedvalue(e.target.value);
  };

  const handleOnClickOnTechstack = (e) => {
    if (techstack.length <= 5) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        techstack: [...techstack, e.target.innerText],
      }));
      setTemptechstack("");
    }

    stackRef.current.placeholder = "Only five allowed";
  };

  const handleOnClickDeleteTech = (e) => {
    const updatedarray = techstack.filter(
      (item) => item != e.currentTarget.parentElement.firstChild.innerText
    );
    setInfo((prevInfo) => ({ ...prevInfo, techstack: updatedarray }));
  };

  const handleKeyDownTechstack = (e) => {
    if (e.code == "Enter" && techstack.length <= 4) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        techstack: [...techstack, e.target.value],
      }));
      setTemptechstack("");
    }
  };

  const handlepfpchange = async (e) => {

    const filename = e.target.files[0];
    console.log(filename)
    const formData = new FormData();
    formData.append("file",filename);
    formData.append("upload_preset",process.env.UPLOAD_PRESET);
     formData.append("api_key",process.env.API_KEY);
    
     
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
       
      }
    )
   console.log(response) 
    if (response.ok) {
     
      const data = await response.json();
      setInfo((prevInfo) => ({ ...prevInfo, pfplink: data.secure_url }));
      pfpRef.current.src = data.secure_url;
    } 
  };

  const handleChangeAbout = (e) => {
    setInfo((prevInfo) => ({ ...prevInfo, aboutyou: e.target.value }));
  };

  const handlechangeTwitter = (e) => {
    setInfo((prevInfo) => ({ ...prevInfo, twitter: e.target.value }));
  };

  const handlechangeGithub = (e) => {
    setInfo((prevInfo) => ({ ...prevInfo, github: e.target.value }));
  };
  const handleupdate = async() => {
    const formdata ={} 
    formdata.techstack= techstack;
    if(pfplink!=initialinfo.pfplink){
      formdata.pfplink = pfplink
    }
    if (aboutyou != initialinfo.aboutyou) {
      formdata.about= aboutyou;
    }
    
    if (twitter != initialinfo.twitter) {
      const resulttwitter = twittervalidation.validate(twitter.toLowerCase())
      const resultx = xvalidation.validate(twitter.toLowerCase()) 
     //toast leaks 
    if(!Object.keys(resultx || resulttwitter).includes("error")){
      formdata.twitter=twitter;
    }
    else if(Object.keys(resultx && resulttwitter).includes("error")){
      return toast.error("check the input field")
    }
      
    }
    if(github!=initialinfo.github){
    const result = githubvalidation.validate(github.toLowerCase())
    if(!Object.keys(result).includes("error")){
      formdata.github=github;
    }
    else if(Object.keys(result).includes("error")){
      return toast.error("check the input field")
    }

      }
  console.log(formdata) 

  await api.post("/updateuserinfo",formdata).then((resp)=>{
    if(resp.data.task==="completed"){
      window.location.reload()
    return toast.success("Profile updated")}
    else{
      return toast.error("Profile update failed")
    }
  }).catch(err=>console.error(err))
}



  return (
    <>
      <div className="p-2 w-full h-full space-y-5 sm:pr-10 sm:pl-10 lg:flex lg:justify-center lg:space-x-5 mt-20 font-display">
        <div className="lg:w-1/2 p-6 pb-0">
          <div className=" space-y-5 ">
            <div className="space-y-4">
              <div className="space-y-1">
                <div>
                  <p className="font-bold  text-lg">
                    Profile Photo (click the pfp to change)
                  </p>
                  <div className="w-48  rounded-full">
                    <label htmlFor="uploadprofile">
                      <img
                        src={pfplink}
                        ref={pfpRef}
                        className="z-20 w-48 h-48 rounded-full"
                      />
                      <input
                        type="file"
                        name=""
                        id="uploadprofile"
                        accept=".jpg, .png, .jepg"
                        hidden
                        onChange={handlepfpchange}
                      />
                    </label>
                  </div>
                </div>
                <label className="font-bold text-lg">User name</label>
                <p className="p-4 border-4 border-black rounded-md text-lg">
                  {username}
                </p>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-lg">Email</label>
                <p className="p-4  border-4 border-black rounded-md text-lg">
                  {email}
                </p>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-lg">Twitter Profile</label>
                <input
                  type="text"
                  className=" p-4 border-4 border-black text-lg outline-none  rounded-lg bg-slate-100 hover:bg-white w-full"
                  placeholder="https://twitter.com/johndoe"
                  value={twitter}
                  onChange={handlechangeTwitter}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5 pr-6 pl-6 lg:pl-0 lg:pt-0 lg:pb-0 lg:pr-6 lg:w-1/2">
          <div className="w-full space-y-4">
            <div className="space-y-1">
              <div className="space-y-1 w-full">
                <label className="block font-bold text-lg">
                  Github Profile
                </label>
                <input
                  type="text"
                  className="  p-4 border-4 outline-none border-black text-lg  rounded-lg bg-slate-100 hover:bg-white w-full"
                  placeholder="https://github.com/johndoe"
                  value={github}
                  onChange={handlechangeGithub}
                />
              </div>
              <div className="relative space-y-1">
                <label className="font-bold block text-lg">Tech Stack</label>
                <input
                  className="w-full p-4 border-4 border-black text-lg outline-none  rounded-lg bg-slate-100 hover:bg-white "
                  placeholder="Search for technologies, topics,more..."
                  value={temptechstack}
                  onChange={handletechstack}
                  onKeyDown={handleKeyDownTechstack}
                  ref={stackRef}
                />

                <div className=" bg-white rounded-xl shadow-md absolute space-y-2 z-10 w-full">
                  {!temptechstack.length || techstack.length >= 5
                    ? null
                    : predicated.map((tech, index) => (
                        <div
                          key={index}
                          className="p-1 hover:bg-gray-300"
                          onClick={handleOnClickOnTechstack}
                        >
                          {tech}
                        </div>
                      ))}
                </div>

                <div className="flex flex-wrap  items-center mt-2">
                  {!techstack
                    ? null
                    : techstack.map((tech, index) => (
                        <div
                          key={index}
                          className="flex items-center p-1 pr-2 pl-2 ring-1 hover:bg-blue-100 ring-blue-700 m-1 text-blue-600 rounded-2xl  "
                        >
                          <p>{tech} </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                            className="h-5 ml-1"
                            onClick={handleOnClickDeleteTech}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ))}
                </div>
              </div>
              <div className="space-y-1 ">
                <label className="font-bold block text-lg">
                  Profile Bio (About you)
                </label>
                <textarea
                  className="w-full outline-none rounded-lg bg-slate-100 p-4 border-4 border-black hover:bg-white text-lg"
                  placeholder="I am a developer from ...."
                  value={aboutyou}
                  rows={8}
                  onChange={handleChangeAbout}
                ></textarea>
              </div>
              <button
                className="p-2 pr-4 pl-4 font-bold bg-silver border-4 border-black hover:bg-black hover:text-white"
                onClick={handleupdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}
export default Usersinfo