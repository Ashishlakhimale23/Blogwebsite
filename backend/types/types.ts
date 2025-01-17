export interface user {
    username : string,
    email : string ,
    password : string 
}

export interface login extends Omit<user,'username'> {}

export interface blog { 
  title : string,
  banner : string ,
  result : boolean,
  content : object[]
} 

export interface updateUserInfo  {
    username : string,
    email : string,
    twitterUrl : string,
    githubUrl : string,
    techStacks :string[],
    bio : string
}