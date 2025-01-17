export function RemoveAllTheSpace(str:string):string{
    let str1 = str.trim()
    let array = str.split(" ")
    array = array.filter(element => element!="")
    str1 = array.join("-")
    return str1 
}

export function RemoveExtraSpace(str:string):string{
    let str1 = str.trim()
    let array = str.split(" ")
    array = array.filter(element => element!="")
    str1 = array.join(" ")
    return str1
}