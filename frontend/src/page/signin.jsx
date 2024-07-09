import { useCallback, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {Toaster,toast} from "react-hot-toast"
import joi from "joi"
import axios from "axios";
import {Authcontext} from "../context/context.js"
import { api } from "../utils/axiosroute";
function Signin() {
  const schema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}),
    password:joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{3,30}$')),
    
    })

  const {logged,setLogged} = useContext(Authcontext)    
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file,setFile] = useState(null);
  

  const handelsubmit = useCallback(async (e)=>{
    e.preventDefault()

      const loading = toast.loading("loading..")
   try{
    if(!email.length){
      return toast.error("Enter  email")
    }
    if(!username.length){
      return toast.error("Enter username")
    }
    if(!password.length){
      return toast.error("Enter password")
    }
    

    const userInput ={
      username:username,
      email:email,
      password:password,
     
    }

    const result = schema.validate(userInput,{abortEarly:false})
    if(Object.keys(result).includes("error")){
      return toast.error("Validation error")
    }
    
    

      await api.post("/signin",userInput)
    .then((response)=>{
      
     if(Object.keys(response.data).includes("token")){
      localStorage.setItem("refreshtoken",response.data.refreshtoken) 
      localStorage.setItem("authtoken",response.data.token)
      setLogged(true) 
     }
     

    }).catch((err)=>{
if(Object.values(err.response.data).includes("Already signed up")){
      setEmail("")
      setUsername("")
      setPassword("")
      return toast.error("These Email already exists")
     }
     if(Object.values(err.response.data).includes("Internal server error")){

      setEmail("")
      setUsername("")
      setPassword("")
      return toast.error("An Error occured")
     }
      toast.error("An error occured")
    setEmail("")
      setUsername("")
      setPassword("")})

  } catch (err) {
    return toast.error("An error occured") 
  }finally{
    return toast.dismiss(loading)
  } 


  },
    
    [username,email,password,schema],
  );

  
   
  useEffect(()=>{
    if(logged){
      navigate("/home")
    }
  },[logged])

  return (
    <>
      <div className="font-display min-h-screen flex flex-col justify-center">
        <form
          action=""
          onSubmit={handelsubmit}
          className=" relative sm:w-96 mx-auto text-center"
        >
          <div className="text-4xl font-bold mb-3">
            <span className="text-black">Get</span>
            <span className="text-black">better</span>
          </div>
          <label className="text-4xl font-bold block">Join the Community</label>
          <label htmlFor="">Already have an account ?  <a href="/login" className="underline hover:text-silver"> Log in</a></label>
          <div className="mt-4  bg-white rounded-lg border-4 border-black shadow-custom">
            <div className="px-3 py-4">
              <label className="block font-semibold text-left">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-2 focus:border-black border-2 w-full h-5  rounded-md px-4 py-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block font-semibold text-left">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="mt-2  w-full h-5 focus:border-black border-2 bg-white rounded-md px-4 py-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="block mt-2 font-semibold text-left">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="mt-2 w-full h-5 border-2  focus:border-black rounded-md px-4 py-5 mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               
              <div className="flex justify-between items-baseline">
                <button
                  type="submit"
                  className="px-5 py-3 bg-white mt-2 text-black rounded-md  border-4 border-black hover:bg-black hover:text-white"
                >
                  Signup
                </button>
                
              </div>
            </div>
            
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}
export default Signin;