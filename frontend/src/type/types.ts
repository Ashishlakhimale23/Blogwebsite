import React,{ReactElement} from "react"

interface author {
    username :string,
    _id : string , 
    pfplink : string 
}

export interface CardType {
    _id:string,
    BlogLink:string,
    banner:string,
    title:string,
    author:author,
    publishedOn:string,
    bookmarks:string[],
    handleremovebookmark:(id:string)=>void,
    handlesavebookmark:(id:string)=>void
}

export interface UserBlog extends Omit<Blogs,"author">{
    _id:string,
    BlogLink:string
}

export interface Bookmarks {
  title :string
  publishedOn :string
  BlogLink:string
}

export interface UserPredicatedBlogs{
    username : string ,
    joinedOn : string ,
    pfplink : string
}

export interface Blogs {
    author : author
    title : string ,
    banner : string ,
    content : Block[],
    publishedOn : string
}

export interface Drafts extends Omit<Blogs,'author'> {
    _id : string
}


export interface UserBlogCard {
    title : string,
    BlogLink : string,
    publishedOn : string
}
export interface UserInfo extends  author{
  email:string,
  aboutyou:string,
  github:string,
  twitter:string,
  techstack:string[],
  blogs?:UserBlogCard[]
  joinedOn : string
}

export interface EditBlog {
        _id:string
        content:Block[],
        title :string,
        banner:string,
        edited:boolean,
        
}

export interface BlogContextType {
    blog: EditBlog;
    setBlog: React.Dispatch<React.SetStateAction<EditBlog>>;
    texteditor: { isReady: boolean; instance: null };
    setTexteditor: React.Dispatch<React.SetStateAction<{ isReady: boolean; instance: null }>>;
}

export interface AuthContextType{
    logged:boolean,
    setLogged:React.Dispatch<React.SetStateAction<boolean>>
}

export interface SeachContextType{
    search:boolean,
    setSearch:React.Dispatch<React.SetStateAction<boolean>>
}

export interface UserInfoContext{
    info : {
        username : string,
        pfplink : string
    }
    setInfo :React.Dispatch<React.SetStateAction<{
        username : string,
        pfplink : string
    }>>
}

export interface Block{
  type:keyof Components,
  data :Data 
}

export interface Data {
  text?:string,
  file?:{
    url:string
  },
  level?:number,
  caption?:string,
  alt?:string,
  code?:string,
  language?:string,
  style?:string,
  items?:any

}


export type Components = {
  paragraph: () => ReactElement;
  image: () => ReactElement;
  header: () => ReactElement;
  quote: () => ReactElement;
  code: () => ReactElement;
  list: () => ReactElement;
};