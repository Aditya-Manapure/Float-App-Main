import React, { useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import {useAuth} from './AuthContext';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
    const {currentUser, setCurrentUser} = useAuth();
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (currentUser) => {
      setCurrentUser(currentUser);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return (
      <NavigationContainer>
        {currentUser ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };
  
  export default Routes;
