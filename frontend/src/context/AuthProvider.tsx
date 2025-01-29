import {  useState } from "react"
import  { Authcontext } from "./context" 
import { api } from "../utils/axiosroute"

function AuthProvider({children}:{children:React.ReactNode}){
    const [logged,setLogged] = useState<boolean>(false)
  
    return(
        <Authcontext.Provider value={{logged,setLogged}}>{children}</Authcontext.Provider>
    )
}
export default AuthProvider 