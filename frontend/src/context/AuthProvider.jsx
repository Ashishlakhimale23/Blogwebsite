import {  useState , useEffect} from "react"
import  { Authcontext } from "./context.js" 
import { api } from "../utils/axiosroute.js"
function AuthProvider({children}){
    const [logged,setLogged] = useState(false)
  
    return(
        <Authcontext.Provider value={{logged,setLogged}}>{children}</Authcontext.Provider>
    )
}
export default AuthProvider 