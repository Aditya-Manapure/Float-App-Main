import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TextInput, Keyboard } from 'react-native';
import filter from 'lodash.filter';
import React, { useState, useEffect } from 'react';


export default function ListUsers() {

  const data1 = [
    { id: '1', title: 'First item' , picture : { thumbnail : require('../assets/2.png')}, name : { first : 'Peter', last : 'Grey', mobile : "922342342"}, location : {startPoint : 'Sangli', destinationPoint : 'Pune'}, dateTime : {date : "21/06/22", time : "5:00pm"}},
    { id: '2', title: 'Second item', picture : { thumbnail : require('../assets/3.png')}, name : { first : 'Harry', last : 'Brown', mobile : "922342342"}, location : {startPoint : 'Mumbai', destinationPoint : 'Goa' }, dateTime : { date :"24/06/22", time : "4:00pm"}},
    { id: '3', title: 'Third item', picture : { thumbnail : require('../assets/4.png')}, name : { first : 'Alice', last : 'Blue', mobile : "922342342"}, location : {startPoint : 'Delhi', destinationPoint : 'Srinagar' }, dateTime : { date :"25/06/22", time : "6:00am"}},
    { id: '4', title: 'Fourth item', picture : { thumbnail : require('../assets/2.png')}, name : { first : 'George', last : 'Green', mobile : "922342342"}, location : {startPoint : 'Nagpur', destinationPoint : 'Pune'}, dateTime : { date :"27/06/22", time : "7:00am"}}
  ];

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(data1);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState(data1);

    

      const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
          return contains(user, formattedQuery);
        });
        setData(filteredData);
        setQuery(text);
      };
      
      const contains = ({ name, location, email }, query) => {
        const { first, last, mobile } = name;
        const { startPoint, destinationPoint } = location;
      
        if (first.toLowerCase().includes(query) || last.toLowerCase().includes(query) || startPoint.toLowerCase().includes(query) || destinationPoint.toLowerCase().includes(query) ) {
          return true;
        }
      
        return false;
      };

      /*useEffect(() => {
        setIsLoading(true);
      
        fetch(API_ENDPOINT)
          .then(response => response.json())
          .then(response => {
            setData(response.results);
      
            // ADD THIS
            setFullData(response.results);
      
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            setError(err);
          });
      }, []);*/

      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
    
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }

      function renderHeader() {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              marginVertical: 10,
              borderRadius: 20
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            />
          </View>
        );
      }


    return (
      <View style={styles.container}>
      <Text style={styles.text}>Favorite Contacts</Text>
      
      <FlatList
        ListHeaderComponent={renderHeader}
        data={data}
        keyExtractor={item => item.first}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={item.picture.thumbnail}
              style={styles.coverImage}
            />
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{`${item.name.first} ${
                item.name.last
              }`}</Text>
              <Text style={{marginLeft : 12}} >Mobile : 923441124</Text>
              <Text style={{marginLeft : 12}}>{`${item.location.startPoint} -> ${
                item.location.destinationPoint
              }`}</Text>
              <Text style={{marginLeft : 12}}>Date : {item.dateTime.date}</Text>
              <Text style={{marginLeft : 12}}>Time : {item.dateTime.time}</Text>
            </View>
            <View style={styles.metaInfo}>
              
            </View>
          </View>
        )}
      />
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#101010',
      marginTop: 60,
      fontWeight: '700'
    },
    listItem: {
      marginTop: 10,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      flexDirection: 'row'
    },
    coverImage: {
      width: 100,
      height: 100,
      borderRadius: 8
    },
    metaInfo: {
      marginLeft: 10
    },
    title: {
      fontSize: 18,
      width: 200,
      padding: 10
    }
  });