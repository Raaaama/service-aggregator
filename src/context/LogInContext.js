import { createContext, useState } from "react";

const LogInContext = createContext();

export const AppProvider = ({children}) => {
    const [emadress, setEmadress] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LogInContext.Provider value={{emadress, setEmadress, password, setPassword}}>
            {children}
        </LogInContext.Provider>
    )
}

export default LogInContext