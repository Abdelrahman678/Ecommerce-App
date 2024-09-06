import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserTokenContext = createContext("");

export default function UserTokenContextProvider({children}) {
    const [userToken,setUserToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const decodeToken = ()=>{
      const data = jwtDecode(localStorage.getItem("userToken"))
      setUserId(data.id)
      // console.log("user Id ==>",data.id);
    }

    useEffect(()=>{
      if(localStorage.getItem("userToken") != null){
        setUserToken(localStorage.getItem("userToken"))
        // const data = jwtDecode(localStorage.getItem("userToken"))
        // setUserId(data.id)
        decodeToken()
      }
    },[])
    return (
      <UserTokenContext.Provider value={{userToken,setUserToken,userId,setUserId,decodeToken}}> 
        {children}
      </UserTokenContext.Provider>
    );
  }
  