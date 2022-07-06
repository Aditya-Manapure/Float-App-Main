import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    StyleSheet,
    FlatList
} from "react-native";
import tw from 'tailwind-react-native-classnames';
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
//import { FlatList } from "react-native-gesture-handler";

const TakeRide = () => {

    
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const { currentUser } = useAuth();

    const [users, setUsers] = useState([]);

    const [origin, setOrigin] = useState('');
    const [destination, setDetination] = useState('');
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setDate(currentDate);
        setShow(false);
    }
    console.log(currentUser.uid);
    const handlePress = () => {
        db.collection("users").doc(currentUser.uid).update({ startPoint: origin, destinationPoint: destination, Date: mydate , role : 'passenger'});
        db.collection("users").onSnapshot(snapshot =>{
            setUsers(snapshot.docs.map(doc => ({
                id : doc.id,
                users : doc.data()
            })));
        })
    }

    const data = [
        {
            id: '123',
            title: 'Peter Grey',
            mobile: '8945868438',
            image: require('../assets/2.png'),    //https://Links.papareact.com/3pn
            screen: 'MapScreen',
        },
        {
            id: '456',
            title: 'Harry Brown',
            mobile: '945868438',
            image: require('../assets/3.png'),    //'https://Links.papareact.com/28w',
            screen: 'EatScreen',
        },
        {
            id: '7',
            title: 'Alice Blue',
            mobile: '7945868438',
            image: require('../assets/4.png'),    //https://Links.papareact.com/3pn
            screen: 'MapScreen',
        },
        {
            id: '8',
            title: 'Peter Grey',
            mobile: '8945868438',
            image: require('../assets/2.png'),    //'https://Links.papareact.com/28w',
            screen: 'EatScreen',
        },
        {
            id: '9',
            title: 'Harry Brown',
            mobile: '945868438',
            image: require('../assets/3.png'),    //https://Links.papareact.com/3pn
            screen: 'MapScreen',
        },
        {
            id: '10',
            title: 'Alice Blue',
            mobile: '7945868438',
            image: require('../assets/4.png'),    //'https://Links.papareact.com/28w',
            screen: 'EatScreen',
        },
    ];

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
     };
     const displayDatepicker = () => {
        showMode('date');
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
                <Text style = {{ fontSize : 25}}>Get a Ride</Text>
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

            <View style = {{marginTop : 20}}>
                <Button onPress={displayDatepicker} title="Show date picker!" />
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
         </View>

            <View style = {{marginTop : 20}}>
                <Button onPress={handlePress} title="Submit" />
            </View>

            <View style={tw`h-1/5 bg-white`}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    horizontal
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => { }}
                            style={tw`p-2 pl-5 pb-8 pt-4 bg-blue-50 content-center m-2  h-4/5`}
                        >
                            <View>
                                <Image
                                    style={[tw`rounded-md`, { margin: 'auto', width: 40, height: 70, resizeMode: 'contain' }]}
                                    source={
                                        item.image
                                    }           //{uri : item.image}
                                />
                                <Text style={tw`mt-1 text-black text-xs`}>{item.title}</Text>
                                <Text style={tw`text-black text-xs `}>{item.mobile}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </React.Fragment>
    );
}

export default TakeRide;

const styles = StyleSheet.create({
    container: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center"
    },
 });