import { Twitter,Github } from "lucide-react"
import { useNavigate } from "react-router-dom"
export function Footer(){
    const navigate = useNavigate()
    return (
        
        <>
        <footer className="border-t  border-zinc-800 text-white px-2 sm:px-4  py-3 bg-zinc-900/80 ">
            <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 max-w-4xl mx-auto sm:justify-between">
                <div className="text-center ">
                    <h1 className="font-display text-zinc-400 font-medium sm:text-xl">©2024 Thoughts. All Rights Reserved</h1>
                    </div>
                    <div className="space-x-3 flex-shrink-0 flex justify-center">
                        <button className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-800"
                        onClick={()=>window.open(`https://x.com/ashishZeroOne`,'_blank')}
                        >
                            <Twitter size={25} />
                        </button>
                        <button className="p-2 rounded-full border border-zinc-800 hover:bg-zinc-800"
                        onClick={()=>window.open(`https://github.com/Ashishlakhimale23/Blogwebsite`,'_blank')}
                        >
                            <Github size={25}/>
                        </button>

                    </div>
            </div>
        </footer>
        </>
    )

}