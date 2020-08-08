import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Firestore from '@react-native-firebase/firestore';

import NewRequestCard from '../components/newRequestCard';

import Icon from 'react-native-vector-icons/Feather';

import Spinner from 'react-native-loading-spinner-overlay';

const windowHeight = Dimensions.get('window').height;

const NewRequests = params => {
  const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
  const [newRequests, setNewRequests] = React.useState([]);

  React.useEffect(() => {
    const subscriber = Firestore()
      .collection('users')
      .where('accountStatus', '==', 'pending')
      .onSnapshot(querySnapshot => {
        let tempRequests = [];

        querySnapshot.forEach(documentSnapshot => {
          tempRequests.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setNewRequests(tempRequests);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon
          onPress={() => params.navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
          size={32}
          color="white"
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>New Requests</Text>
        </View>
      </View>
      <View style={styles.myDetailsBar}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          MGP Jayasankha - 17000653
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Spinner
          visible={loading}
          textContent={'Loading data...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          style={styles.flatlist}
          data={newRequests}
          renderItem={({item}) => <NewRequestCard item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 60,
    backgroundColor: '#1F92D1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  myDetailsBar: {
    height: 20,
    backgroundColor: '#1F92D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  icon: {
    zIndex: 1,
    marginLeft: 10,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -42,
  },
  heading: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  bottomContainer: {
    flex: 1,
    alignContent: 'center',
  },
  flatlist: {
    minHeight: windowHeight - (windowHeight * 18) / 100,
    width: '100%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default NewRequests;
