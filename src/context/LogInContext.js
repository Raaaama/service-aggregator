import { createContext, useState } from "react";

const LogInContext = createContext();

export const AppProvider = ({children}) => {
    const [ip, setIp] = useState("https://39f7-2-135-26-114.eu.ngrok.io")
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
    const [currentServiceType, setCurrentServiceType] = useState();
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
            setCurrentServiceType(id);
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

    //ProviderInfo
    const [providerInfo, setProviderInfo] = useState([]);

    const getProviderInfo = async([idp, idst]) => {
        try {
            const response = await fetch(
                ip + "/api/providers/findone/?idp=" + idp + "&idst=" + idst
            );
            const json = await response.json();
            setProviderInfo(json[0]);
        } catch (error) {
            console.error(error);
        }
    }

    //entollmentModal
    const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false);
    const [options, setOptions] = useState([{}]);
    const getOptions = async(idservices) => {
        try {
            const response = await fetch(
                ip + "/api/option?idservices=" + idservices
            );
            const json = await response.json();
            // console.log(json);
            setOptions(json);
        } catch (error) {
            console.error(error);
        }
    }

    //timetable
    const [timeOptions, setTimeOptions] = useState([]);
    function addMinutes(time, minutes) {
        let temp = '2024-03-14T' + time
        temp = new Date(temp);
        let mls = temp.getTime() + minutes * 60000 - 6 * 60 * 60000;
        
        let temp2 = new Date(mls)
        let m = temp2.getMinutes()
        if (m == "0") {
            m = "00"
        }

        return (temp2.getHours() + ":" + m);
    }

    const getTimetable = async(id, day) => {
        try {
            const response = await fetch(
                ip + "/api/timetable?idoption=" + id + "&dayoftheweek=" + day
            );
            const json = await response.json();
            
            let temp = []
            let num = 0
            for (let i = 0; i < json.length; i++) {
                let time = json[i].startTime
                temp.push(time.substring(0,5))
                num++;  
                while (true) {
                    time = addMinutes(time, 30);
                    if (time + ":00" < json[i].endTime) {
                        temp.push(time)
                        num++;
                    }
                    else {
                        break
                    }
                    time += ":00"
                }
            }

            let busy = []
            let busyTime;
            for (let i = 0; i < enrollments.length; i++) {
                busyTime = new Date(enrollments[i].signUpDate).toString().substring(16,21)
                busy.push(busyTime)
            }

            let difference = temp.filter(x => !busy.includes(x));
            setTimeOptions(difference);

        } catch (error) {
            console.error(error);
        }
    }

    //enrollments
    const [enrollments, setEnrollments] = useState([])
    const getEnrollments = async(date) => {
        try {
            let temp = date + 'T00:00:00'
            temp = new Date(temp);

            let from = temp.getTime();
            from = new Date(from)
            from = from.toISOString().substring(0, 10)

            let to = temp.getTime() + 24 * 60 * 60000;
            to = new Date(to)
            to = to.toISOString().substring(0, 10)

            const response = await fetch(
                ip + "/api/enrollments?from=" + from + "&to=" + to
            );
            const json = await response.json();
            setEnrollments(json);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <LogInContext.Provider value={{
            ip, uid, setUid,
            categories, setCategories,
            idcat, setIdCat, subcategories, getSubcategories, subcategoryTitle, setSubcategoryTitle,
            serviceTypeModalVisible, setServiceTypeModalVisible, serviceTypes, getServiceTypes, serviceTypeTitle, setServiceTypeTitle, currentServiceType, setCurrentServiceType,
            providersModalVisible, setProvidersModalVisible, providers, getProviders, providersTitle, setProvidersTitle,
            providerPageModalVisible, setProviderPageModalVisible,
            images, getImages, providerInfo, setProviderInfo, getProviderInfo,
            enrollmentModalVisible, setEnrollmentModalVisible,
            options, getOptions,
            getTimetable, timeOptions, getEnrollments,
            emadress, setEmadress, password, setPassword, 
            profileChosen, SetProfileChosen, homeChosen, SetHomeChosen, searchChosen, SetSearchChosen,
            }}>
            {children}
        </LogInContext.Provider>
    )
}

export default LogInContext