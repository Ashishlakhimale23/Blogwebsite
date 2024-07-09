import Code from "@editorjs/code"
import Embed from "@editorjs/embed" 
import List from "@editorjs/list"
import Header from "@editorjs/header"
import Image from "@editorjs/image"
import Inlinecode from "@editorjs/inline-code"
import Quote from "@editorjs/quote"


const uploadByURL =async (e)=>{
    const link = new Promise((resolve,reject)=>{
            try{
                resolve(e)
            }
            catch(err){
                reject(e)
            }
    })
    
    return link.then(url=> {
        return{
        success: 1,
        file: { url }}
    })
 
}

const uploadImageByFile = async (file) => {
    console.log(process.env.UPLOAD_PRESET)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.UPLOAD_PRESET);
    formData.append("api_key", process.env.API_KEY);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: 1,
                file: { url: data.secure_url }
            };
        } else {
            throw new Error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: 0,
            file: { url: '' }
        };
    }
}
const tool = {
    embed:Embed,
    code:Code,
    list:{
        class:List,
        inlineToolbar:true
    },
    quote:{
        class:Quote,
        inlineToolbar:true

    },
    inlineCode:Inlinecode,
    header:{
        class:Header,
        config:{
            placeholder:"Type heading...",
            levels: [2, 3, 4],
            defaultLevel:2,
            inlineToolbar:true
        }
        
        
    },
    image:{
        class:Image,
        config:{
            uploader:{
                uploadByUrl:uploadByURL,
                uploadByFile:uploadImageByFile
            }
        }
    }
}
export default tool;