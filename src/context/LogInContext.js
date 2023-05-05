import { createContext, useState } from "react";

const LogInContext = createContext();

export const AppProvider = ({ children }) => {
  const [ip, setIp] = useState("https://cc3d-2-135-26-114.ngrok-free.app");
  const [uid, setUid] = useState(undefined);
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
      const response = await fetch(ip + "/api/subcategories?idcat=" + id);
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
  const [chooseMultiple, setChooseMultiple] = useState();
  const getServiceTypes = async (id) => {
    try {
      const response = await fetch(ip + "/api/servicetypes?idsubc=" + id);
      const json = await response.json();
      setServiceTypes(json);
    } catch (error) {
      console.error(error);
    }
  };

  //providers
  const [providersModalVisible, setProvidersModalVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [providersTitle, setProvidersTitle] = useState("");

  const getProviders = async (id) => {
    try {
      const response = await fetch(ip + "/api/providers?idst=" + id);
      const json = await response.json();
      for (let i = 0; i < json.length; i++) {
        json[i].shown = true;
      }
      // console.log(json)
      setProviders(json);
      setCurrentServiceType(id);
    } catch (error) {
      console.error(error);
    }
  };

  //images
  const [providerPageModalVisible, setProviderPageModalVisible] =
    useState(false);

  const [images, setImages] = useState([]);
  const getImages = async (id) => {
    try {
      const response = await fetch(ip + "/api/image?idp=" + id);
      const json = await response.json();
      let temp = [];
      json.forEach((element) => {
        temp.push(element.image_url);
      });
      setImages(temp);
    } catch (error) {
      console.error(error);
    }
  };

  //ProviderInfo
  const [providerInfo, setProviderInfo] = useState([]);

  const getProviderInfo = async ([idp, idst]) => {
    try {
      const response = await fetch(
        ip + "/api/providers/findone/?idp=" + idp + "&idst=" + idst
      );
      const json = await response.json();
      setProviderInfo(json[0]);
    } catch (error) {
      console.error(error);
    }
  };

  //entollmentModal
  const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false);
  const [options, setOptions] = useState([{}]);
  const getOptions = async (idservices) => {
    try {
      const response = await fetch(ip + "/api/option?idservices=" + idservices);
      const json = await response.json();
      // console.log(json);
      setOptions(json);
    } catch (error) {
      console.error(error);
    }
  };

  //timetable
  const [timeOptions, setTimeOptions] = useState([]);
  function addMinutes(time, minutes) {
    let temp = "2024-03-14T" + time;
    temp = new Date(temp);
    let mls = temp.getTime() + minutes * 60000 - 6 * 60 * 60000;

    let temp2 = new Date(mls);
    let m = temp2.getMinutes();
    if (m == "0") {
      m = "00";
    }

    return temp2.getHours() + ":" + m;
  }

  //enrollments
  const [enrollments, setEnrollments] = useState([]);

  const enroll = async (ops, date, optionpicked) => {
    let dates = [];

    ops.forEach((el) => {
      if (el.chosen == true) {
        dates.push(date + " " + el.time + ":00");
      }
    });

    try {
      var theUrl = ip + "/api/enrollments/";
      dates.forEach((d) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = (e) => {
          if (xmlhttp.readyState !== 4) {
            return;
          }
          if (xmlhttp.status === 200) {
            console.log("success", xmlhttp.responseText);
          } else {
            console.log(xmlhttp.responseText);
            showAlert();
          }
        };
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xmlhttp.send(
          JSON.stringify({
            id: uid,
            datetime: d,
            optionpicked: optionpicked
          })
        );
      });
    } catch (error) {
      console.error(error);
    }
    setEnrollmentModalVisible(false);
    getUserEnrollments(uid)
  };

  function addZero(a) {
    if (a < 10) {
      a = "0" + a
    }
    return a
  }

  const getTO = async (id, day, date) => {
    let temp = date + "T00:00:00";
    temp = new Date(temp);

    let from = temp.getTime();
    from = new Date(from);
    from = from.toISOString().substring(0, 10);

    let to = temp.getTime() + 24 * 60 * 60000;
    to = new Date(to);
    to = to.toISOString().substring(0, 10);

    const response = await fetch(
      ip + "/api/enrollments?from=" + from + "&to=" + to + "&idop=" + id
    )
      .then((response) => response.json())
      .then(async (json) => {
        const response = await fetch(
          ip + "/api/timetable?idoption=" + id + "&dayoftheweek=" + day
        )
          .then((response) => response.json())
          .then((data) => {
            let busy = [];
            let busyTime;
            for (let i = 0; i < json.length; i++) {
              busyTime = new Date(json[i].signUpDate)
                .toString()
                .substring(16, 21);
              busy.push(busyTime);
            }

            let temp = [];

            var today = new Date();
            var currentTime = today.getHours() + ":" + today.getMinutes();
            var currentDate = today.getFullYear() + "-" + addZero(today.getMonth() + 1) + "-" + addZero(today.getDate());

            for (let i = 0; i < data.length; i++) {
              let time = data[i].startTime;
              if (!busy.includes(time)) {
                if (currentDate == from) {
                  if (currentTime < time) {
                    temp.push(time.substring(0, 5));
                  }
                } else {
                  temp.push(time.substring(0, 5));
                }
              }
              while (true) {
                time = addMinutes(time, 30);
                if (time + ":00" < data[i].endTime) {
                  if (!busy.includes(time)) {
                    if (currentDate == from) {
                      if (currentTime < time) {
                        temp.push(time);
                      }
                    } else {
                      temp.push(time);
                    }
                  }
                } else {
                  break;
                }
                time += ":00";
              }
            }

            let ops = [];
            temp.forEach((el) => {
              ops.push({
                time: el,
                chosen: false,
              });
            });

            setTimeOptions(ops);
          });
      });
  };

  const [userEnrollments, setUserEnrollments] = useState([]);
  const getUserEnrollments = async (id) => {
    try {
      const response = await fetch(
        ip + "/api/enrollments/customer/?idcus=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = new Date(data[i].signUpDate)
            temp = temp.getTime() + 6 * 60 * 60000;
            temp = new Date(temp);
            temp = temp.toISOString();
            data[i].signUpDate = temp.substring(8, 10) + "." + temp.substring(5, 7) + " " + temp.substring(11, 16);
            if (data[i].approved == 0) {
              data[i].approvedTxt = "Заявка отправлена"
            }
            else if (data[i].approved == 1) {
              data[i].approvedTxt = "Заявка одобрена"
            }
            else {
              data[i].approvedTxt = "Заявка отклонена"
            }
          }

          // console.log(data)
          setUserEnrollments(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LogInContext.Provider
      value={{
        ip, uid, setUid,
        categories, setCategories,
        idcat, setIdCat, 
        subcategories, getSubcategories, subcategoryTitle, setSubcategoryTitle,
        serviceTypeModalVisible, setServiceTypeModalVisible, serviceTypes, getServiceTypes, serviceTypeTitle, setServiceTypeTitle, currentServiceType, setCurrentServiceType, chooseMultiple, setChooseMultiple,
        providersModalVisible, setProvidersModalVisible, providers, setProviders, getProviders, providersTitle, setProvidersTitle,
        providerPageModalVisible, setProviderPageModalVisible, images, getImages, providerInfo, setProviderInfo, getProviderInfo, 
        enrollmentModalVisible, setEnrollmentModalVisible, options, getOptions, timeOptions, enroll, getTO,
        userEnrollments, getUserEnrollments,
        emadress, setEmadress, password, setPassword, 
        profileChosen, SetProfileChosen, homeChosen, SetHomeChosen, searchChosen, SetSearchChosen, setTimeOptions
      }}
    >
      {children}
    </LogInContext.Provider>
  );
};

export default LogInContext;
