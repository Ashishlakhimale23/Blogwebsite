import { useState } from "react"
import { WholeBlogAndUser } from "./context"
const searchcontentstructure = {
    blogs:[],
    users:[]
}
export function SearchContentProvider({children}){
    const [searchcontent,setSearchcontent] = useState(searchcontentstructure)     
    return (
        <>
       <WholeBlogAndUser.Provider value={{searchcontent,setSearchcontent}}>{children}</WholeBlogAndUser.Provider>
        </>
    )
}
