import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { useContext, useState } from "react";
import LogInContext from "../../context/LogInContext";
import { ExpandableListView } from "react-native-expandable-listview";
import StarRating from "react-native-star-rating-widget";

function RateService(props) {
  const {
    uid,
    ip,
    categories,
    setIdCat,
    getSubcategories,
    setSubcategoriesModalVisible,
  } = useContext(LogInContext);

  const { item, getUserEnrollments } = props;
  const [rateVisible, setRateVisible] = useState(false);
  const [rating, setRating] = useState(item.rating);

  async function handleRating() {
    // console.log(item)
    try {
      var theUrl = ip + "/api/enrollments/updateRating";
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
          id: item.idenrollment,
          rating: rating,
        })
      );
    } catch (error) {
      console.error(error);
    }
    getUserEnrollments(uid);

    try {
      const response = await fetch(
        ip + "/api/option/rating?id=" + item.idoption
      );
      const json = await response.json();
      // console.log(json[0].rating);
      let serviceRating = json[0].rating,
        newRating = 0;
      if (serviceRating == 0) {
        newRating = rating;
      } else {
        newRating = (serviceRating + rating) / 2;
      }

      try {
        var theUrl = ip + "/api/option/rating";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = (e) => {
          if (xmlhttp.readyState !== 4) {
            return;
          }
          if (xmlhttp.status === 200) {
            console.log("success", xmlhttp.responseText);
          } else {
            console.log(xmlhttp.responseText);
            // showAlert();
          }
        };
        xmlhttp.open("PUT", theUrl);
        xmlhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xmlhttp.send(
          JSON.stringify({
            id: item.idoption,
            rating: newRating,
          })
        );
      } catch (error) {
        console.error(error);
      }

      try {
        var theUrl = ip + "/api/option/ratingNumber";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = (e) => {
          if (xmlhttp.readyState !== 4) {
            return;
          }
          if (xmlhttp.status === 200) {
            console.log("success", xmlhttp.responseText);
          } else {
            console.log(xmlhttp.responseText);
            // showAlert();
          }
        };
        xmlhttp.open("PUT", theUrl);
        xmlhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xmlhttp.send(
          JSON.stringify({
            id: item.idoption,
          })
        );
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return item.rating == 0 ? (
    <TouchableOpacity
      style={styles.rateBtn}
      onPress={() => setRateVisible(true)}
    >
      {rateVisible ? null : <Text style={styles.rate}>Оценить</Text>}
      {rateVisible ? (
        <View style={styles.rateContainer}>
          <StarRating
            color={"white"}
            enableHalfStar={false}
            style={styles.stars}
            //   starStyle={{backgroundColor: "black"}}
            rating={rating}
            onChange={setRating}
          />
          <TouchableOpacity style={styles.sendRatingBtn} onPress={handleRating}>
            <Text style={styles.sendRatingTxt}>Отправить</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  ) : (
    <StarRating
      color={"white"}
      enableHalfStar={false}
      style={styles.stars}
      //   starStyle={{backgroundColor: "black"}}
      rating={rating}
      onChange={(e) => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rateBtn: {
    backgroundColor: "#202124",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  rate: {
    alignSelf: "center",
    fontFamily: "Manrope",
    fontSize: 16,
    color: "white",
  },
  rateContainer: {
    // height: 120,
    backgroundColor: "#202124",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sendRatingBtn: {
    backgroundColor: "black",
    padding: 14,
    margin: 10,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  sendRatingTxt: {
    fontFamily: "Manrope",
    fontSize: 16,
    color: "white",
  },
  stars: {
    padding: 10,
    alignSelf: "center",
  },
});

export default RateService;
