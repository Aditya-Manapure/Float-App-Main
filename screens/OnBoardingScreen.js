import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
    <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnBoardingScreen = ({navigation}) => {
    return (
        <Onboarding
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("Login")} 
            onDone={() => navigation.navigate("Login")} 
            bottomBarColor = '#fff'
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image 
                    style = {{
                        width : 250,
                        height : 200,
                        resizeMode :"contain",
                    }}
                    source={require('../assets/ss1.png')}
                />,
                title: 'Car Pooling',
                subtitle: 'Connect to near by traveller',
                },
                {
                backgroundColor: '#fff',
                image: <Image 
                    style = {{
                        width : 250,
                        height : 200,
                        resizeMode :"contain",
                    }}
                    source={require('../assets/ss2.png')} />,
                title: 'Taxi Service',
                subtitle: 'Free to find you Taxi near by you with lots options.',
                },
                {
                backgroundColor: '#fff',
                image: <Image 
                    style = {{
                        width : 250,
                        height : 200,
                        resizeMode :"contain",
                    }}
                    source={require('../assets/ss3.png')} />,
                title: 'Bike pooling',
                subtitle: 'Enjoy the ride of bike and make connections',
                },
                
            ]}
        />
    );
};

export default OnBoardingScreen;

const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    }
});