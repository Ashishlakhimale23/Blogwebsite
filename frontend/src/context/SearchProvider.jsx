import { searchpopover } from "./context"
import { useState } from "react"
function SearchProvider({children}){
const [search,setSearch] = useState(false)
    return (
        <>
        <searchpopover.Provider value={{search,setSearch}}>{children}</searchpopover.Provider>

        </>
    )
}
export default SearchProvider