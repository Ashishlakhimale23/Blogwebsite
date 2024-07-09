export function content(content){
        const para = content.filter(obj=>obj.type == "paragraph")
    const text = []
    para.forEach((obj)=>{text.push(obj.data.text)})
    const text2 = text.toString()
    return text2


}