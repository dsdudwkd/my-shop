import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, logIn, logOut } from "../api/firebase";

const AuthContext = createContext();


export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubScibe, setUnSubScribe] = useState();

    useEffect(()=>{
        const userChange = (newUser) => {
            console.log(newUser);
            setUser(newUser);
        };

        const unSubscribeFunc = onUserState(userChange);
        setUnSubScribe(()=>unSubscribeFunc);

        return () => {
            if(unSubscribeFunc){
                unSubscribeFunc();
            }
        }
    },[])

    return (
        <AuthContext.Provider value={{user, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}