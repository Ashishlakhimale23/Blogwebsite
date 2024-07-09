import { useState } from 'react';
import {UserContext} from '../context/context'

export function UserInfoProvider({children}){

const UserInfo ={
  _id:"",
  username:"",
  email:"",
  pfplink:"",
  aboutyou:"",
  github:"",
  twitter:"",
  techstack:[],
  blogs:[],
  draft:[],
  joinedOn:"",
  bookmarks:[]
}
const [info,setInfo] = useState(UserInfo)
const [initialinfo,setInitialinfo] = useState(UserInfo)
    return (
      <UserContext.Provider
        value={{
         info,setInfo,initialinfo,setInitialinfo
        }}
      >
        {children}
      </UserContext.Provider>
    );
}