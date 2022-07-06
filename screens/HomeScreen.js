import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//var openrouteservice = require("openrouteservice-js");
//import { GOOGLE_MAPS_APIKEY } from "@env";
//import Geolocation from 'react-native-geolocation-service';
//import { FlipInEasyX } from 'react-native-reanimated';

//navigator.geolocation = require('@react-native-community/geolocation');

const HomeScreen = () => {
  /*var Geocode = new openrouteservice.Geocode({ api_key: "5b3ce3597851110001cf62482663b0bbdc844998bea788272def8559"});

  Geocode.geocode({
    text: "Heidelberg",
    //boundary_circle: { lat_lng: [49.412388, 8.681247], radius: 50 },
    //boundary_bbox: [[49.260929, 8.40063], [49.504102, 8.941707]],
    //boundary_country: ["DE"]
  })
  .then(function(response) {
    // Add your own result handling here
    console.log("response", JSON.stringify(response));
  })
  .catch(function(err) {
    var str = "An error occurred: " + err;
    console.log(str);
  });**/

  /*Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );*/

  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <View style={styles.container}>
          <View style={styles.button} />
          <View style={styles.button} />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source={
              require('../assets/Logo.png')
                /*{
                  //uri : "",
              }*/}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                marginTop: 30,
                marginRight: 5,
                resizeMode: "contain",
              }}
              source={
                require('../assets/1.png')
                  /*{
                    //uri : "",
                }*/}
            />
          </TouchableOpacity>
        </View>
        {/*<GooglePlacesAutocomplete
              styles={{
                  container :{
                      flex : 0
                  },
                  textInput : {
                    fontSize : 18,  
                  }
              }}
              query = {{
                  key : GOOGLE_MAPS_APIKEY,
                  language : 'en',
              }} 
              placeholder='Starting Position'
              nearbyPlacesAPI = 'GooglePlacesSearch'
              debounce={400}
        />*/}
        <NavOptions />

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'green',
    width: '40%',
    height: 40
  }
});
