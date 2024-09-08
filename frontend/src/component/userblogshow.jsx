import { useNavigate } from "react-router-dom";
import { getdate } from "../utils/date";
function UserBlogShow({
    title,
    publishedOn,
    BlogLink
}){
    const navigate = useNavigate()
    return(
        <>
        <div className="text-xl font-semibold text-black m-0 mt-2 mb-2 cursor-pointer"  onClick={()=>{navigate(`/blog/${BlogLink}`)}}>
            <p className="mb-1">{title}</p>
            <p>written on {getdate(publishedOn)}</p> </div>
            <hr className="border-2 border-black rounded-full"/>
        </>

    )
}
export default UserBlogShow;