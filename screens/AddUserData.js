import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import Constants from "expo-constants";
import GlobalContext from "../navigations/GlobalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { auth, db, storage } from "../firebaseConfig";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../navigations/AuthContext';


const AddUserData = () => {

  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const navigation = useNavigation();

  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    const user = currentUser;
    //console.log(user);
    let photoURL = null;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    //console.log(userData);
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    console.log(userData);
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("Profile");
  }


  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingTop: Constants.statusBarHeight + 20,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>
          Profile Info
        </Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              // color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        <View style={{ marginTop: "auto"}}> 
        <Button
            title="Back"
            onPress={() => {
              navigation.navigate("Profile");
            }}
            
          />
          <Button
            title="Save"
            onPress={handlePress}
          />
          <Button
            title="Add Documents"
            onPress={() => {
              navigation.navigate("Register");
            }}
           
          />

        </View>
       </View> 
    </React.Fragment>
  );
}

export default AddUserData;