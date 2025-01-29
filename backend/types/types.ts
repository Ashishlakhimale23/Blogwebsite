export interface user {
    username : string,
    email : string ,
    password : string 
}

export interface login extends Omit<user,'username'> {}

interface ContentObject {
  id : string,
  type:string,
  data :object 
}

export interface blog { 
  title : string,
  banner : string ,
  result : boolean,
  content : ContentObject[]
} 

export interface updateUserInfo  {
    username : string,
    email : string,
    pfplink : string,
    twitterUrl : string,
    githubUrl : string,
    techStacks :string[],
    bio : string
}