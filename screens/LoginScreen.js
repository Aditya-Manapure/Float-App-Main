import { StyleSheet, Text, View , KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Image, Button } from 'react-native'
import React, { useRef, useEffect, useState, useContext } from 'react'
//import {  } from 'react-native-gesture-handler'
import { auth } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../navigations/AuthContext';
import GlobalContext from "../navigations/GlobalContext";
import { color } from 'react-native-reanimated';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState("signUp");

    const navigation = useNavigation();

    const {
        theme: { colors },
      } = useContext(GlobalContext);

    /*useEffect(()=> {
        const unsubcribe = auth.onAuthStateChanged(user =>{
            if(user){
                navigation.navigate("Home");
            }
        })
        return unsubcribe;
    }, [])*/

    //const emailRef = useRef();
    //const passwordRef = useRef();
    //const history = useHistory();

    const {login, signup} = useAuth(); 
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e){
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            if (mode === "signIn"){
                await login(email, password);
                setError('logged in');
            }
            if (mode === "signUp") {
                await signup(email, password)
                setError('Signed Up');
            }
        }
        catch{
            setError('Failed to logged in');
        }
        setLoading(false);
    }



    /*const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Register in with ",user.email);
        })
        .catch(error => alert(error.message))
    }*/

    /*const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with ", user.email);
        })
        .catch(error => alert(error.message))
    }*/

    return (
        <>
        {/*<KeyboardAvoidingView 
            style = {styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value = {email}
                //inputRef={emailRef}
                onChangeText = { text => setEmail(text)}
                style = {styles.input}
            />
            <TextInput
                placeholder='Password'
                value = {password}
                //inputRef={passwordRef}
                onChangeText = { text => setPassword(text)}
                style = {styles.input}
                secureTextEntry
            />
        </View>
        
        <View style = {styles.buttonContainer}>
            <TouchableOpacity
                //disabled = {loading}
                onPress = {handleLogin}
                style = {styles.button}
            >
                <Text style = {styles.buttonText}> Login </Text> 
            </TouchableOpacity>

            <TouchableOpacity
                onPress = {handleSignUp () => {navigation.navigate('SignUp')}}
                style = {styles.buttonOutline}
            >
                <Text style = {styles.buttonOutlineText}> Register </Text> 
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    */}
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <Text
                style={{ color: '#000', fontSize: 24, marginBottom: 20 }}
            >
                Welcome to Float App
            </Text>
            <Image
                source={require("../assets/welcome_icon.png")}
                style={{ width: 200, height: 200 }}
                resizeMode="cover"
            />
            <View style={{ marginTop: 20 }}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 250,
                    }}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        width: 250,
                        marginTop: 20,
                    }}
                />
                <View style={{ marginTop: 20 }}>
                <Button
                    title={mode === "signUp" ? "Sign Up" : "Sign in"}
                    disabled={!password || !email}
                    color= '#4C8BF5'
                    onPress={handleLogin}
                />
                </View>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() =>
                        mode === "signUp" ? setMode("signIn") : setMode("signUp")
                    }
                >
                    <Text style={{ color: colors.primary }}>
                        {mode === "signUp"
                        ? "Already have an account? Sign in"
                        : "Don't have an account? Sign Up"}
                    </Text>
                </TouchableOpacity>
            </View>
         </View>
         </>
    ) 
}

export default LoginScreen;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    inputContainer : {
        width : '80%'
    },
    input : {
        backgroundColor : 'white',
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 10,
        marginTop : 10,
    },
    buttonContainer : {
        width : '60%',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 40
    },
    button : {
        backgroundColor : '#0782F9',
        width : '100%',
        padding : 15,
        borderRadius : 10,
        alignItems : 'center',
    },
    buttonOutline : {
       backgroundColor : 'white',
       marginTop : 5,
       borderColor : '#0782F9',
       borderWidth : 2,

    },
    buttonText :{
       color : 'white',
       fontWeight : '700',
       fontSize : 16,
    },
    buttonOutlineText :{
       color : '#0782F9',
       fontWeight : '700',
       fontSize : 16,

    }
})