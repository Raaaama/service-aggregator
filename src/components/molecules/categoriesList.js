import {
    StyleSheet,
    FlatList,
    Dimensions
} from 'react-native';
import {useState, useEffect} from "react";
import Category from "../atoms/Category"

var width = Dimensions.get('window').width;

const CategoriesList = (props) => {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
       try {
        const response = await fetch('http://' + props.ip + ':8082/api/categories');
        const json = await response.json();
        setCategories(json);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
        getCategories();
    }, []);

    return(
        <FlatList
            contentContainerStyle={styles.categoriesList}
            data={categories}
            //extraData={fromFilter}
            renderItem={({ item }) => (
              <Category key={item.id} name={item.name} />
            )}
          />
    );
}

const styles = StyleSheet.create({
    categoriesList: {
        width: width * 0.8,
        marginTop: '60%',
    },
  })

export default CategoriesList