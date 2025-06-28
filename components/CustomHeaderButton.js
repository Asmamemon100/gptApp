/*import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import colors from '../screens/constants/colors';

const CustomHeaderButton = (props) => {
    return (
         <HeaderButton 

            {...props}
            IconComponent={FontAwesome}
            iconSize={23}
            color={props.color ?? colors.primary}
        />
    );
};

export default CustomHeaderButton;
*/
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButton } from "react-navigation-header-buttons";
import colors from "../constants/colors";

export default CustomHeaderButton = (props) => {
    return <HeaderButton
            { ...props }
            IconComponent={FontAwesome}
            iconSize={23}
            color={props.color ?? colors.primary}
        />
}