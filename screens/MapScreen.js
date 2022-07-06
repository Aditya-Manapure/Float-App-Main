import { StyleSheet, Text, TextInput, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React, { useEffect, useState } from 'react';
import Map from '../components/Map';
import MapView from 'react-native-maps';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
const MapScreen = () => {

    /*var openrouteservice = require("openrouteservice-js");
    var Directions = new openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62482663b0bbdc844998bea788272def8559"});

    const [PolyLines, setPolygonLines] = useState([]);

    // Direction Request
    useEffect(() => {
          return Directions.calculate({
            coordinates: [[8.690958, 49.404662], [8.687868, 49.390139]],
            profile: 'foot-walking',
            extra_info: ['waytype', 'steepness'],
            format: 'geojson'
        })
        .then(function(geojson) {
            // Add your own result handling here
            var PolyLine = geojson.features[0].geometry.coordinates.map(c => ({latitude: c[0], longitude: c[1]}))
            console.log("PolyLine : ");
            console.log(JSON.stringify(geojson));
            setPolygonLines(PolyLine);
            console.log(PolyLine);
            return PolyLine
        })
        .catch(function(err) {
            var str = "An error occurred: " + err;
            console.log(str);
        });
    },[])
    console.log(PolyLines);*/

    /*let request = new XMLHttpRequest();

    request.open('POST', "https://api.openrouteservice.org/v2/directions/driving-car/json");

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', '5b3ce3597851110001cf62482663b0bbdc844998bea788272def8559');

    var jsonObject;

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            this.jsonObject = this.responseText;
            console.log("121423JSON_OBJECT-----------------------------");
            if(typeof jsonObject === 'string') console.log("STRINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
        }
    };

    const body = '{"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]]}';

    request.send(body);
    console.log("JSON_OBJECT-----------------------------");
    console.log(jsonObject);*/



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
    return (
        <View>
            <View style={tw`h-4/5`} >

                <Map
                    style={{
                        flex: 1,
                    }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        top: 57, left: 0, right: 0, height: 35,
                        alignItems: 'center', justifyContent: 'center',
                        marginLeft: 12,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#444'
                    }}
                >From</Text>
                <TextInput
                    placeholder='Shaniwar Wada, Pune'
                    /*style = {{ backgroundColor : 'white',
                               marginLeft : 10,
                               height : 35,
                               padding : 5,
                               width : '45%',
                    }}*/
                    style={{
                        backgroundColor: 'white', position: 'absolute',
                        top: 80, left: 0, right: 0, height: 35,
                        alignItems: 'center', justifyContent: 'center',
                        marginLeft: 10, width: '65%',
                        padding: 5,
                        paddingLeft: 10,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: 'lightblue'
                    }}
                />

                <Text
                    style={{
                        position: 'absolute',
                        top: 127, left: 0, right: 0, height: 35,
                        alignItems: 'center', justifyContent: 'center',
                        marginLeft: 12,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#444'
                    }}
                >Destination</Text>
                <TextInput
                    placeholder='Sinhagad Fort, Pune'
                    /*style = {{ backgroundColor : 'white',
                               marginLeft : 10,
                               height : 35,
                               padding : 5,
                               width : '45%',
                    }}*/
                    style={{
                        backgroundColor: 'white', position: 'absolute',
                        top: 150, left: 0, right: 0, height: 35,
                        alignItems: 'center', justifyContent: 'center',
                        marginLeft: 10, width: '65%',
                        padding: 5,
                        paddingLeft: 10,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: 'lightblue'
                    }}

                />
            </View>
            <View style={styles.container}>
                <View style={styles.button} />
                <View style={styles.button} />
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

        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
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
