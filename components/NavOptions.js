import React from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
const data = [
    {
        id : '123',
        title : 'Get a ride',
        image : require('../assets/get_a_ride.png'),    //https://Links.papareact.com/3pn
        screen : 'Map', 
    },
    {
        id : '456',
        title : 'Offer ride',
        image : require('../assets/offer_ride.png'),    //'https://Links.papareact.com/28w',
        screen : 'Profile', 
    },
];

const NavOptions = () => {

    const navigation = useNavigation();
    return (
        <View>
            <FlatList 
                data = {data}
                keyExtractor = {(item) => item.id}
                horizontal
                renderItem = {({ item }) => (
                    <TouchableOpacity
                        onPress = {() =>navigation.navigate(item.screen)}
                        style = {tw`p-2 pl-5 pb-8 pt-4 bg-blue-100  m-2 w-40`}
                    >
                    <View>
                        <Image 
                            style = {{ width: 120, height : 120, resizeMode :'contain'}}
                            source = {
                                item.image
                            }           //{uri : item.image}
                        />
                        <Text style = {tw`mt-2 text-lg text-black font-bold `}>{item.title}</Text>
                        <Icon
                            style = {tw`p-2 bg-black rounded-full w-10 mt-4 `} 
                            name ="arrowright" color="white" type="antdesign" 
                        />
                    </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default NavOptions;
