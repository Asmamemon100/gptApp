/*import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import ChatScreen from '../screens/ChatScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import colors from '../screens/constants/colors';


enableScreens(); // MUST be called before any navigator is created



const options = {
  headerTitleStyle: {
    fontFamily: 'regular',
    color: colors.textColor
  },
  tabBarLabelStyle: {
    fontFamily: 'regular',
    color: colors.textColor
  }
  //tabBarShowLabel: false
}


const Tab = createBottomTabNavigator();


const MainNavigator = () => {
 

     return (
    <Tab.Navigator>
<Tab.Screen name="Chat" component={ChatScreen} options={
    {

      ...options,
    tabBarIcon: ({ color,size }) => {
        
       
    return <Entypo name="chat" size={size} color={color} />
    }
  }
  }/>

      <Tab.Screen name="Image" component={ImageScreen} options={
    {
      ...options,
    tabBarIcon: ({ color,size }) => {
    return <Entypo name="image" size={size} color={color} />
    }
  }
  }/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={
    {
      ...options,
    tabBarIcon: ({ color,size }) => {
    return <Ionicons name="settings-outline" size={size} color={color} />
    }
  }
  } />
    </Tab.Navigator>
  );
};

export default MainNavigator;

*/

import { Entypo, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import ChatScreen from '../screens/ChatScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsScreen from '../screens/SettingsScreen';

const options = {
  headerTitleStyle: {
    fontFamily: 'regular',
    color: colors.textColor
  },
  tabBarLabelStyle: {
    fontFamily: 'regular',
    color: colors.textColor
  },
  tabBarShowLabel: false
}

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Chat" component={ChatScreen} options={
            {
              ...options,
                tabBarIcon: ({ color, size }) => {
                    return <Entypo name="chat" size={size} color={color} />
                }
            }
          } />
          <Tab.Screen name="Image" component={ImageScreen} options={
            {
              ...options,
                tabBarIcon: ({ color, size }) => {
                    return <Entypo name="image" size={size} color={color} />
                }
            }
          } />
          <Tab.Screen name="Settings" component={SettingsScreen} options={
            {
              ...options,
                tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="settings-outline" size={size} color={color} />
                }
            }
          } />
        </Tab.Navigator>
    );
}

export default MainNavigator;