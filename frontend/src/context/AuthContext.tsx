import React,{createContext, useContext, useState,} from 'react'





type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};
export const authContext=createContext<AuthContextType|null>(null)

export const AuthProvider = ({children

}:React.ReactNode ) => {
 const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  return (
    <div>
      <authContext.Provider value={{token,setToken}}>
        {children}
      </authContext.Provider>
    </div>
  )
}



export const useAuth=()=>{
  const context=useContext(authContext)

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;

}


