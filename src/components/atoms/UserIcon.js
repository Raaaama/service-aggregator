import { Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useContext } from 'react';
import LogInContext from '../../context/LogInContext';

const UserIcon = (props) => {
    const col = 'white';

    const { profileChosen } = useContext(LogInContext);

    if (profileChosen == true) {
        return(
            <Svg width={props.size} height={props.size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={col} class="w-6 h-6">
                <Path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </Svg>
        )
    }
    else {
        return (
            <Svg width={props.size} height={props.size} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={col} class="w-6 h-6">
                <Path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </Svg>
        )
    }
}

export default UserIcon;