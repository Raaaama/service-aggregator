import { createContext, useState } from "react";

const LogInContext = createContext();

export const AppProvider = ({children}) => {
    const [ip, setIp] = useState("https://67fa-2-135-26-114.eu.ngrok.io")
    const [uid, setUid] = useState();
    const [emadress, setEmadress] = useState("");
    const [password, setPassword] = useState("");

    //screens
    const [searchChosen, SetSearchChosen] = useState(false);
    const [profileChosen, SetProfileChosen] = useState(false);
    const [homeChosen, SetHomeChosen] = useState(true);

    //categories
    const [categories, setCategories] = useState([]);

    //subcategories
    const [idcat, setIdCat] = useState(1);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoryTitle, setSubcategoryTitle] = useState("");
    const getSubcategories = async (id) => {
        try {
            const response = await fetch(
                ip + "/api/subcategories?idcat=" + id
            );
            const json = await response.json();
            setSubcategories(json);
        } catch (error) {
            console.error(error);
        }
    };

    //serviceTypes
    const [serviceTypeModalVisible, setServiceTypeModalVisible] = useState(false);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [serviceTypeTitle, setServiceTypeTitle] = useState("");
    const getServiceTypes = async (id) => {
        try {
            const response = await fetch(
                ip + "/api/servicetypes?idsubc=" + id
            );
            const json = await response.json();
            setServiceTypes(json);
        } catch (error) {
            console.error(error);
        }
    }
    

    //providers
    const [providersModalVisible, setProvidersModalVisible] = useState(false);
    const [providers, setProviders] = useState([]);
    const [providersTitle, setProvidersTitle] = useState("");

    const getProviders = async(id) => {
        try {
            const response = await fetch(
                ip + "/api/providers?idst=" + id
            );
            const json = await response.json();
            setProviders(json);
        } catch (error) {
            console.error(error);
        }
    }

    //images
    const [providerPageModalVisible, setProviderPageModalVisible] = useState(false);
    


    const [images, setImages] = useState([]);
    const getImages = async(id) => {
        try {
            const response = await fetch(
                ip + "/api/image?idp=" + id
            );
            const json = await response.json();
            let temp = []
            json.forEach(element => {
                temp.push(element.image_url)
            });
            setImages(temp);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <LogInContext.Provider value={{
            ip, uid, setUid,
            categories, setCategories,
            idcat, setIdCat, subcategories, getSubcategories, subcategoryTitle, setSubcategoryTitle,
            serviceTypeModalVisible, setServiceTypeModalVisible, serviceTypes, getServiceTypes, serviceTypeTitle, setServiceTypeTitle,
            providersModalVisible, setProvidersModalVisible, providers, getProviders, providersTitle, setProvidersTitle,
            providerPageModalVisible, setProviderPageModalVisible,
            images, getImages,
            emadress, setEmadress, password, setPassword, 
            profileChosen, SetProfileChosen, homeChosen, SetHomeChosen, searchChosen, SetSearchChosen,
            }}>
            {children}
        </LogInContext.Provider>
    )
}

export default LogInContext