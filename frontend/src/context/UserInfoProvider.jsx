import { useState } from 'react';
import {UserContext} from '../context/context'

export function UserInfoProvider({children}){

const UserInfo ={
  pfplink:"",
  username:'',
}
const [info,setInfo] = useState(UserInfo)

    return (
      <UserContext.Provider
        value={{
         info,setInfo
        }}
      >
        {children}
      </UserContext.Provider>
    );
}