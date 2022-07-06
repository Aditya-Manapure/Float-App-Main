import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../navigations/AuthContext';


const Register = () => {

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState([]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageArray, setImageArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation();
  const { currentUser } = useAuth()

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestPermissionsAsync();
    console.log('camera permission:', cameraPermission.status);
   
    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log('permission:', imagePermission.status);

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };
  

  useEffect(() => {
    permisionFunction();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
      setImageArray([...imageArray, data.uri]);
      setShowCamera(false);
    }
  };

  const handlePress = async () => {
    navigation.navigate("Profile");
  };

  const pickImagePan = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result.uri);
    if (!result.cancelled) {
      setImageArray([...imageArray, result.uri]);
    }
  };

  const pickImageAdhar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result.uri);
    if (!result.cancelled) {
      setImageArray([...imageArray, result.uri]);
    }
    // const user = currentUser;
    //console.log(user);
    // let aadharURL = null;
    // if (selectedImage) {
    //   const { url } = await uploadImage(
    //     selectedImage,
    //     `images/${user.uid}`,
    //     "Aadhar"
    //   );
    //   aadharURL = url;
    // }
    // //console.log(userData);
    // if (aadharURL) {
    //   userData.aadharURL = aadharURL;
    // }
    // console.log(userData);
    // await Promise.all([
    //   updateProfile(user, userData),
    //   setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
  //   ]);
  // };

  
    //console.log(userData);
    if (aadharURL) {
      userData.aadharURL = aadharURL;
    }
    console.log(userData);
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.container}>
      {showCamera && (
        <Camera ref={(ref) => setCamera(ref)} style={{ flex: 1 }} type={type} />
      )}
      {showCamera && <Button title={'Click'} onPress={takePicture} />}
      {!showCamera && (
        <>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', padding:10 }}>
            <TextInput placeholder={'Enter Aadhar Number'} />
            <View style={{ flexDirection: 'row' }}>
              <Button
                title={'Camera'}
                onPress={() => {
                  setShowCamera(true);
                }}
              />
              <Button title={'Gallery'} onPress={pickImageAdhar} />
            </View>
          </View>
          {imageArray.length > 0 && (
            <View style={{ height: 110 }}>
              <FlatList
                horizontal
                data={imageArray}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      margin: 5,
                    }}
                  />
                )}
              />
            </View>
          )}

        <View style={styles.container}>
              <View  style={{ flexDirection: 'row', padding:10 }}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <Text style={styles.label}> Do you have Driving License?</Text>
              </View>
            </View>   
            {isSelected ? 
             <View
             style={{ marginBottom:300,flexDirection: 'row', justifyContent: 'space-between',padding:10 }}>
             <Text>Upload Driving license </Text>
             <View style={{ flexDirection: 'row' }}>
               <Button
                 title={'Camera'}
                 onPress={() => {
                   setShowCamera(true);
                 }}
               />
               <Button title={'Gallery'} onPress={pickImagePan} />
             </View>
           </View> :<Text>"Click below submit"</Text>}
         
        </>
      )}
      
      <Button
            title="Submit"
            onPress={() => {
              navigation.navigate("Profile");
            }}
            
          />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },

  fixedRatio: {
    flex: 1,
  },
});