import {  useState , useEffect} from "react"
import  { Authcontext } from "./context.js" 
import { api } from "../utils/axiosroute.js"
function AuthProvider({children}){
    const [logged,setLogged] = useState(false)
    const [token,setToken] = useState(()=>localStorage.getItem("authtoken") || "")   
    const setAuthToken = (token) => {

    if (token) {
        setToken(token)
      localStorage.setItem('authtoken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setLogged(true)
    } else {
      localStorage.removeItem('authtoken');
      delete api.defaults.headers.common['Authorization'];
      setLogged(false)
    }
  };

  
    return(
        <Authcontext.Provider value={{logged,setLogged,setAuthToken,token}}>{children}</Authcontext.Provider>
    )
}
export default AuthProvider 