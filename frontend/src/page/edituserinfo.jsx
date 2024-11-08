import { useRef, useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import techStack from "../utils/suggestion";
import Joi from "joi";
import { getdate } from "../utils/date";
import {toast} from "react-hot-toast"
import { api } from "../utils/axiosroute";
function Usersinfo(){
const UserInfo ={
  _id:"",
  username:"",
  email:"",
  pfplink:"",
  aboutyou:"",
  github:"",
  twitter:"",
  techstack:[],
  blogs:[],
  draft:[],
  joinedOn:"",
  bookmarks:[]
}

 const {username:admin} = useParams()
  const twittervalidation = Joi.string()
    .pattern(/^https:\/\/twitter\.com\/[A-Za-z0-9_]+$/)
    .required();
  const xvalidation = Joi.string()
    .pattern(/^https:\/\/x\.com\/[A-Za-z0-9_]+$/)
    .required();
  const githubvalidation = Joi.string()
    .pattern(/^https:\/\/github\.com\/[A-Za-z0-9_]+$/)
    .required();

  const [info,setInfo] = useState(UserInfo)
const {
    username,
    pfplink,
    aboutyou,
    github,
    twitter,
    techstack,
    email
  } = info;

  const [predicated, setPredicated] = useState([]);

  const [temptechstack, setTemptechstack] = useState("");
  const stackRef = useRef();
  const pfpRef = useRef();

  useEffect(() => {
    async function fetchuserinfo() {
      await api.post("/getotheruserinfo",{Username:admin})
        .then((response) => {
          console.log(response);
          console.log("its not setting the info ");
          setInfo({
            _id: response.data.userinfo._id,
            username: response.data.userinfo.username,
            pfplink: response.data.userinfo.pfplink,
            email: response.data.userinfo.email,
            aboutyou: response.data.userinfo.about,
            github: response.data.userinfo.github,
            twitter: response.data.userinfo.twitter,
            techstack: response.data.userinfo.techstack,
            joinedOn: getdate(response.data.userinfo.joinedOn),
          });
        })
        .catch((err) => console.log(err));
    }
    fetchuserinfo();
  }, []);

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
      (item) => item != e.currentTarget.parentElement.innerText
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
  const handleupdate = async () => {
    const formdata = {};
    formdata.techstack = techstack;
    if (pfplink != initialinfo.pfplink) {
      formdata.pfplink = pfplink;
    }
    if (aboutyou != initialinfo.aboutyou) {
      formdata.about = aboutyou;
    }

    if (twitter != initialinfo.twitter) {
      const resulttwitter = twittervalidation.validate(twitter.toLowerCase());
      const resultx = xvalidation.validate(twitter.toLowerCase());
      //toast leaks
      if (!Object.keys(resultx || resulttwitter).includes("error")) {
        formdata.twitter = twitter;
      } else if (Object.keys(resultx && resulttwitter).includes("error")) {
        return toast.error("check the input field");
      }
    }
    if (github != initialinfo.github) {
      const result = githubvalidation.validate(github.toLowerCase());
      if (!Object.keys(result).includes("error")) {
        formdata.github = github;
      } else if (Object.keys(result).includes("error")) {
        return toast.error("check the input field");
      }
    }
    console.log(formdata);

    await api
      .post("/updateuserinfo", formdata)
      .then((resp) => {
        if (resp.data.task === "completed") {
          window.location.reload();
          return toast.success("Profile updated");
        } else {
          return toast.error("Profile update failed");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
      <>
  <div className="p-2 sm:p-6 text-zinc-200 flex flex-col items-center mt-24">
    <div className="w-full max-w-4xl bg-neutral-800/50 rounded-lg shadow-lg p-2 sm:p-6 mb-8">
      <div className="text-center">
        <p className="font-semibold text-2xl text-zinc-100 mb-2">Profile Photo</p>
        <p className="text-sm text-zinc-400">(Click to change)</p>
      </div>
      <div className="flex justify-center mt-4">
        <label htmlFor="uploadprofile" className="cursor-pointer">
          <img
            src={pfplink}
            ref={pfpRef}
            className="w-32 h-32 rounded-full border-4 border-zinc-700 hover:border-zinc-500 transition duration-200"
            alt="Profile"
          />
          <input
            type="file"
            id="uploadprofile"
            accept=".jpg, .png, .jpeg"
            hidden
            onChange={handlepfpchange}
          />
        </label>
      </div>
    </div>

    <div className="w-full max-w-4xl bg-neutral-800/50 rounded-lg shadow-lg p-2 sm:p-6 mb-8 space-y-5">
      <div>
        <label className="font-semibold text-lg text-zinc-100">Username</label>
        <input className="p-4 rounded-lg bg-zinc-700/50 text-lg w-full outline-none" readOnly value={username}/>
      </div>
      <div>
        <label className="font-semibold text-lg text-zinc-100">Email</label>
        <input className="p-4 rounded-lg bg-zinc-700/50 text-lg w-full outline-none" readOnly value={email} />
      </div>
      <div>
        <label className="font-semibold text-lg text-zinc-100">Twitter Profile</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-zinc-700/50 text-lg text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-white outline-none transition duration-200"
          placeholder="https://twitter.com/johndoe"
          value={twitter}
          onChange={handlechangeTwitter}
        />
      </div>
    </div>

   
    <div className="w-full max-w-4xl bg-neutral-800/50 rounded-lg shadow-lg p-2 sm:p-6 mb-8 space-y-5">
      <div>
        <label className="font-semibold text-lg text-zinc-100">Github Profile</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-zinc-700/50 text-lg text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-white outline-none transition duration-200"
          placeholder="https://github.com/johndoe"
          value={github}
          onChange={handlechangeGithub}
        />
      </div>
      <div className="relative">
        <label className="font-semibold text-lg text-zinc-100">Tech Stack</label>
        <input
          type="text"
          className="w-full p-3  rounded-lg bg-zinc-700/50 text-lg text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-white outline-none transition duration-200"
          placeholder="Search for technologies..."
          value={temptechstack}
          onChange={handletechstack}
          onKeyDown={handleKeyDownTechstack}
          ref={stackRef}
        />
        
        {temptechstack.length > 0 && techstack.length < 5 && (
          <div className="absolute z-10 mt-2 w-full bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg">
            {predicated.map((tech, index) => (
              <div
                key={index}
                className="p-2 hover:bg-zinc-700 cursor-pointer transition duration-150"
                onClick={handleOnClickOnTechstack}
              >
                {tech}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap mt-4">
          {Array.isArray(techStack) && techstack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center m-1 p-2 bg-zinc-700/50 text-white rounded-full"
            >
              {tech}
              <button onClick={handleOnClickDeleteTech}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-zinc-200"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="w-full max-w-4xl bg-neutral-800/50 rounded-lg shadow-lg p-2 sm:p-6 mb-8">
      <label className="font-semibold text-lg text-zinc-100">Profile Bio</label>
      <textarea
        className="w-full p-3 rounded-lg bg-zinc-700/50 text-lg text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-white outline-none transition duration-200"
        placeholder="I am a developer from ...."
        value={aboutyou}
        rows={4}
        onChange={handleChangeAbout}
      ></textarea>
    </div>

    <button
      className="w-full max-w-md p-3 font-bold rounded-lg bg-neutral-800/50 hover:bg-neutral-800 text-lg text-zinc-100 transition duration-200 shadow-lg"
      onClick={handleupdate}
    >
      Update Profile
    </button>
  </div>
</>

 
  );
}
export default Usersinfo