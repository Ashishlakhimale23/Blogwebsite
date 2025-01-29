import React, { useState } from 'react';
import {UserContext} from './context'

export function UserInfoProvider({children}:{children : React.ReactNode}){

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