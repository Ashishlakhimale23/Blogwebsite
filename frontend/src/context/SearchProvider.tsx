import { searchpopover } from "./context"
import React, { useState } from "react"
function SearchProvider({children}:{children:React.ReactNode}){
const [search,setSearch] = useState(false)
    return (
        <>
            <searchpopover.Provider value={{search,setSearch}}>{children}</searchpopover.Provider>
        </>
    )
}
export default SearchProvider