import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
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
import { RadioButton } from "react-native-paper";

const AddVehicle = () => {

    const { currentUser } = useAuth();

    const [vehicleNo, setVehicleNo] = useState('');
    const [model, setModel] = useState('');
    const [checked, setChecked] = React.useState('car');

    const handlePress = () => {
        db.collection("users").doc(currentUser.uid).update({ vehicleNo: vehicleNo, vehicleModel: model, vehicleType: checked });
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
                <TextInput
                    placeholder="Enter vehicle number"
                    // value={displayName}
                    onChangeText={setVehicleNo}
                    style={{

                        marginTop: 40,
                        borderBottomWidth: 2,
                        width: "100%",
                    }}
                />
                <TextInput
                    placeholder="Model name"
                    //value={displayName}
                    onChangeText={setModel}
                    style={{

                        marginTop: 40,
                        borderBottomWidth: 2,
                        width: "100%",
                    }}
                />
                <View style ={{flexDirection : 'row' ,padding :20, justifyContent : 'space-around' }}>
                    <RadioButton
                        label='car'
                        value='car'
                        status={checked === 'car' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('car')}
                    /><Text>Car</Text>
                    <RadioButton
                        value="bike"
                        status={checked === 'bike' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('bike')}
                    /><Text>Bike</Text>
                    <RadioButton
                        label='taxi'
                        value='taxi'
                        status={checked === 'taxi' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('taxi')}
                    /><Text>Taxi</Text>
                </View>
                <View style={{ marginTop: "auto", width: 80 }}>
                    <Button
                        title="Submit"
                        onPress={handlePress}
                    />
                </View>
            </View>
        </React.Fragment>
    );
}
export default AddVehicle;