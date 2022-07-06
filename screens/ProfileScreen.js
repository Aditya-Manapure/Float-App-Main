import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import FormButton from '../components/FormButton';
import { useAuth } from '../navigations/AuthContext';

import { db } from '../firebaseConfig';
import { shadow, TouchableRipple } from 'react-native-paper';
//import PostCard from '../components/PostCard';

const ProfileScreen = ({ navigation, route }) => {
  const { currentUser, logout } = useAuth();

  //const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  /*const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };*/

  /*useEffect( () => {
    db.collection('users').onSnapshot(snapshot =>{
      setUsers(snapshot.docs.map(doc =>( {
        id : doc.id, 
        user : doc.data()
      })));
    })
  },[]);*/


  useEffect(() => {
    getUser();
    console.log('userProfile');
    console.log(userData);
    //fetchPosts();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  console.log(currentUser.uid);
  const getUser = async () => {
    /*await db.collection('users')
    .doc( route.params ? route.params.userId : currentUser.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })*/
    console.log('getUser');
    const documentSnapshot = await db.collection('users')
      .doc(currentUser.uid)
      .get();
    //console.log(documentSnapshot);

    const userData = documentSnapshot.data();
    setUserData(userData);

  }



  const handleDelete = () => { };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{ uri: userData ? userData.photoURL || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' }}
        />
        <Text style={styles.userName}>{userData ? userData.displayName || 'Test' : 'Test'}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
          {userData ? userData.email || 'No email added.' : ''}
        </Text>
        <Text style={styles.aboutUser}>
          {userData ? userData.about || 'No details added.' : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => { }}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('AddUserData');
                }}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
             
            </>
          )}
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>1</Text>
            <Text style={styles.userInfoSubTitle}>Users</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>Rs.10</Text>
            <Text style={styles.userInfoSubTitle}>Available Money</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Lift Strike</Text>
          </View>
        </View>

        {/*posts.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))*/}

        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => { navigation.navigate('AddVehicle'); }}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#2e64e5" size={25} />
              <Text style={styles.menuItemText}>Vehicle Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('ListUsers');}}>
            <View style={styles.menuItem}>
              <Icon name="account-search-outline" color="#2e64e5" size={25} />
              <Text style={styles.menuItemText}>Find Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#2e64e5" size={25} />
              <Text style={styles.menuItemText}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#2e64e5" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <View style={styles.menuItem}>
              <Icon name="account-settings" color="#2e64e5" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  userImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    borderBottomColor: '#2e64e5',
    borderBottomWidth: 2,
    borderTopColor: '#2e64e5',
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 8,
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  menuWrapper: {
    marginTop: 10,

  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginRight: 170
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});




















/*import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
//import { Icon } from 'react-native-elements';

const ProfileScreen = () => {

    return (
        <SafeAreaView style={tw`bg-white h-full py-12`}>
            <View style = {styles.container}>
                <View style = {styles.userInfoSection}>
                    <View style={{ flexDirection :'row', marginTop : 15 }}>
                        <Avatar.Image
                            size={75}
                            borderColor = {'black'}
                            rounded
                            source = {require('../assets/1.png')}
                        />
                        <View style={{marginLeft: 20}}>
                            <Text style={styles.title}>Aditya Manapure</Text>
                            <Text style={styles.caption}>Best Driver</Text>
                        </View>
                    </View>
                </View>
            </View>
               <View style={styles.row}>
                   <Icon name='map-maker-radius' color='#777777' size={20}/>
                   <Text style={{color : '#777777', marginLeft : 20}}>Bhandara, India</Text>
               </View> 
               <View style={styles.row}> 
                   <Icon name='map-maker-radius' color='#777777' size={20}/>
                   <Text style={{color : '#777777', marginLeft : 20}}>Bhandara, India</Text>
               </View> 
               <View style={styles.row}>
                   <Icon name='map-maker-radius' color='#777777' size={20}/>
                   <Text style={{color : '#777777', marginLeft : 20}}>Bhandara, India</Text>
               </View> 
               <View style={styles.row}>
                   <Icon name='map-maker-radius' color='#777777' size={20}/>
                   <Text style={{color : '#777777', marginLeft : 20}}>Bhandara, India</Text>
               </View> 
            <View style={styles.userInfoSection}>
            </View>

            <View style={[styles.infoBoxWrapper,{
                borderRightColor : '#dddddd',
                borderRightWidth : 1
            }]}>
                <View style={styles.infoBox}>
                    <Text>$150</Text>
                    <Text>Wallet</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>15</Text>
                    <Text>Lifted</Text>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableOpacity onPress = {() => {}}>
                     <View style={styles.menuItem}>
                         <Icon name='heart-outline' color='#FF6347' size={25} />
                         <Text Style={styles.menuItemText}>Your Favorites</Text>
                     </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {}}>
                     <View style={styles.menuItem}>
                         <Icon name='bank' color='#FF6347' size={25} />
                         <Text Style={styles.menuItemText}>Credit to bank</Text>
                     </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {}}>
                     <View style={styles.menuItem}>
                         <Icon name='share-outline' color='#FF6347' size={25} />
                         <Text Style={styles.menuItemText}>Your Favorites</Text>
                     </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {}}>
                     <View style={styles.menuItem}>
                         <Icon name='account-check-outline' color='#FF6347' size={25} />
                         <Text Style={styles.menuItemText}>Add User</Text>
                     </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => {}}>
                     <View style={styles.menuItem}>
                         <Icon name='settings-outline' color='#FF6347' size={25} />
                         <Text Style={styles.menuItemText}>Your Favorites</Text>
                     </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 15,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });*/