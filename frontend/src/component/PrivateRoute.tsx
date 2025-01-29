import {Outlet,Navigate} from "react-router-dom"
export function PrivateRoute(){
    const authtoken = localStorage.getItem("authtoken")
    return authtoken ? <Outlet/> : <Navigate to='/login'/>

}