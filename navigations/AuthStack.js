import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddUserData from '../screens/AddUserData';

//import AsyncStorage from '@react-native-community/async-storage';
//import { GoogleSignin } from '@react-native-community/google-signin';


const AuthStack = () => {

  const Stack = createNativeStackNavigator();
  //const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  /*useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  
    GoogleSignin.configure({
      webClientId: 'YOUR_APP_WEB_CLIENT_ID',
    });
  
  }, []);*/

  /*if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }*/

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      {/*<Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />*/}
      <Stack.Screen
        name="AddUserData"
        component={AddUserData}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;