import { Text } from 'react-native';
import { useContext } from 'react';
import Svg, { Path } from 'react-native-svg';
import LogInContext from '../../context/LogInContext';

const SearchIcon = (props) => {
    const col = 'white';

    const { searchChosen } = useContext(LogInContext);

    if (searchChosen == true) {
        return(
            <Svg width={props.size + 10} height={props.size + 10} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={col} class="w-6 h-6">
                <Path fill={col} d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                <Path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
        )

    }
    else {
        return (
            <Svg width={props.size + 10} height={props.size + 10} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={col} class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Svg>
        )
    }
}

export default SearchIcon;