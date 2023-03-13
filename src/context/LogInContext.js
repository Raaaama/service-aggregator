import { createContext, useState } from "react";

const LogInContext = createContext();

export const AppProvider = ({children}) => {
    const [ip, setIp] = useState("https://3da3-2-135-26-114.eu.ngrok.io")
    const [uid, setUid] = useState();
    const [emadress, setEmadress] = useState("");
    const [password, setPassword] = useState("");
    const [searchChosen, SetSearchChosen] = useState(false);
    const [profileChosen, SetProfileChosen] = useState(false);
    const [homeChosen, SetHomeChosen] = useState(true);

    return (
        <LogInContext.Provider value={{ip, uid, setUid,
            emadress, setEmadress, password, setPassword, 
        profileChosen, SetProfileChosen, homeChosen, SetHomeChosen, searchChosen, SetSearchChosen}}>
            {children}
        </LogInContext.Provider>
    )
}

export default LogInContext