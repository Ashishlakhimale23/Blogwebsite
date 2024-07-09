import { useNavigate } from "react-router-dom";
import { getdate } from "../utils/date";
function UserBlogShow({
    title,
    _id,
    publishedOn
}){
    const navigate = useNavigate()
    return(
        <>
        <div className="text-xl font-semibold text-black m-0 mt-2 mb-2 cursor-pointer"  onClick={()=>{navigate(`/blog/${encodeURIComponent(title)}`,{state:{data:{id:_id}}})}}>
            <p className="mb-1">{title}</p>
            <p>written on {getdate(publishedOn)}</p> </div>
            <hr className="border-2 border-black rounded-full"/>
        </>

    )
}
export default UserBlogShow;