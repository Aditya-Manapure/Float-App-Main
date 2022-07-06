import React, {useState, useEffect} from 'react';
import Providers from './navigations/index';
import { StyleSheet, Text, View, LogBox } from 'react-native';
/*import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import EatScreen from './screens/EatScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import Tabs from './navigations/Tabs';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';*/


/*LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);*/


export default function App() {
  //const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  //const Stack = createNativeStackNavigator();
  //onboarding using async-storage
  /*useEffect(() =>{

  }, [])*/

  return (
    <>
    <Providers />
    {/*<Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
            <Stack.Screen 
              name = 'Onboarding'
              component = {OnBoardingScreen} 
              options={{
                headerShown :false
              }}
            />
            <Stack.Screen 
              name = 'Login'
              component = {LoginScreen} 
              options={{
                headerShown :false
              }}
            />
            <Stack.Screen 
              name = 'Home'
              component = {HomeScreen} 
              options={{
                headerShown :false
              }}
            />
            <Stack.Screen 
              name = 'Map'
              component = {MapScreen} 
              options={{
                headerShown :false
              }}
            />
            <Stack.Screen 
              name = 'Profile'
              component = {ProfileScreen} 
              options={{
                headerShown :false
              }}
            />
            <Stack.Screen 
              name = 'EatScreen'
              component = {EatScreen} 
              options={{
                headerShown :false
              }}
            /> 
        </Stack.Navigator> 
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>*/}
  </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
