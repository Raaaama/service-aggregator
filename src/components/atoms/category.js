import {
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    View,
    Image,
    FlatList
} from 'react-native';

const Category = (props) => {
    return(
        <Text style={styles.category}>
            {props.name}
        </Text>
    );
}

const styles = StyleSheet.create({
    category: {
        fontFamily: 'Manrope',
        fontSize: 35,
        color: "white",
        backgroundColor: "#0e0e0f",
        
        padding: 15,
        margin: 7,
        textAlign: 'center',

        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
  })

export default Category