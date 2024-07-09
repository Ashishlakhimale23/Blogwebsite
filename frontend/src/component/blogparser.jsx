

function IMG({url,caption}){
    return (
        <div className="mt-4 mb-4 w-full">
            <img src={url} className="w-full" />
            {
                caption.length ? <p className="mt-2 p-2 text-center">{caption}</p>:""
            }
        </div>
   
    ) 
}
function Quote({quote,caption}){
    return (
        <div className="p-3 border-l-4 border-red-400 ">
            <p>{quote}</p>
            {caption.length? <p>{caption}</p>:""}
        </div>
    )
}
function List({style,items}){
    return(
        <ol className={`${style=="ordered"?"list-decimal":"list-disc"} p-8 pt-5 pb-5 ` }>
            {
                items.map((listitem,i)=>{
                    return <li key={i} dangerouslySetInnerHTML={{__html:listitem}} className="text-xl leading-8"></li>
                })
            }
        </ol>

    )
}
function Code({code}){
    return(
     <pre className="bg-gray-300 p-10 overflow-scroll w-full mt-4 mb-4">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>)
}
function BlogParser({block}){
    const {type,data} =block
    if(type=="paragraph"){
        return <p dangerouslySetInnerHTML={{__html:data.text}} className="text-xl leading-8"></p>
    }
    if(type=="image"){
        return <IMG url={data.file.url} caption={data.caption}></IMG>
    }
    if(type=="header"){
        if(data.level == 2){
            return <h2 dangerouslySetInnerHTML={{__html:data.text}} className="text-2xl font-bold mt-6"></h2>
        }
        if(data.level == 3){
            return <h3 dangerouslySetInnerHTML={{__html:data.text}} className="text-3xl font-bold  mt-6"></h3>
        }
        if(data.level == 4){
            return <h4 dangerouslySetInnerHTML={{__html:data.text}} className="text-4xl font-bold  mt-6"></h4>
        }
    }
    if(type=="quote"){
        return <Quote quote={data.text} caption={data.caption}></Quote>
    }
    if(type=="code"){
        return <Code code={data.code}></Code>
    }
    if(type=="list"){
        return <List style={data.style} items={data.items}></List>
    }

}
export default BlogParser;