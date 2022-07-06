import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    TextInput,
    StyleSheet
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
import { RadioButton } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

const OfferRide = () => {

    
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const { currentUser } = useAuth();

    const [origin, setOrigin] = useState('');
    const [destination, setDetination] = useState('');
    
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setDate(currentDate);
        setShow(false);
    }
    console.log(currentUser.uid);
    const handlePress = () => {
        db.collection("users").doc(currentUser.uid).update({ startPoint: origin, destinationPoint: destination, Date: mydate , role : 'driver'});
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
     };
     const displayDatepicker = () => {
        showMode('date');
     };

     const displayTimepicker = () => {
        showMode('time');
     };

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
                <Text style = {{ fontSize : 25}}>Plan Your Journey</Text>
                <TextInput
                    placeholder="Start Point"
                    // value={displayName}
                    onChangeText={setOrigin}
                    style={{

                        marginTop: 40,
                        borderBottomWidth: 2,
                        width: "100%",
                    }}
                />
                <TextInput
                    placeholder="Destination Point"
                    //value={displayName}
                    onChangeText={setDetination}
                    style={{

                        marginTop: 40,
                        borderBottomWidth: 2,
                        width: "100%",
                    }}
                />

            <View style = {{marginTop : 20, display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                <Text style = {{fontSize : 20}}>Date : </Text>
                <View><TextInput placeholder="eg. 24/12/2021" value={mydate} style={{ width : 200}}/></View>
                <Button onPress={displayDatepicker} title="Select Date" />
            </View>
               {isDisplayDate && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={displaymode}
                     is24Hour={true}
                     display="default"
                     onChange={changeSelectedDate}
                    />
                )}
            
            <View style = {{marginTop : 20}}>
                <Button onPress={displayTimepicker} title="Select Time" />
            </View>
            {isDisplayDate && (
                <DateTimePicker
                    value={mydate}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
         </View>

            <View style = {{marginTop : 20}}>
                <Button onPress={handlePress} title="Submit" />
            </View>

        </React.Fragment>
    );
}

export default OfferRide;

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center"
    },
 });