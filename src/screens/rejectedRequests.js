import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import Firestore from '@react-native-firebase/firestore';

import RejectedRequestCard from '../components/rejectedRequestCard';

import Icon from 'react-native-vector-icons/Feather';

import Spinner from 'react-native-loading-spinner-overlay';

const windowHeight = Dimensions.get('window').height;

const RejectedRequests = params => {
  const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
  const [rejectedRequests, setRejectedRequests] = React.useState([]);

  React.useEffect(() => {
    const subscriber = Firestore()
      .collection('users')
      .where('accountStatus', '==', 'rejected')
      .onSnapshot(querySnapshot => {
        let tempRequests = [];

        querySnapshot.forEach(documentSnapshot => {
          tempRequests.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRejectedRequests(tempRequests);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Rejected Requests</Text>
        <Icon
          onPress={() => params.navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
          size={32}
          color="white"
        />
      </View>
      <View style={styles.bottomContainer}>
        <Spinner
          visible={loading}
          textContent={'Loading data...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          style={styles.flatlist}
          data={rejectedRequests}
          renderItem={({item}) => <RejectedRequestCard item={item} />}
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
    height: '15%',
    backgroundColor: '#1F92D1',
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    color: 'white',
    marginTop: 'auto',
    fontFamily: 'Poppins-Medium',
    marginBottom: -20,
  },
  icon: {
    marginRight: 'auto',
    marginLeft: 10,
    marginBottom: 10,
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

export default RejectedRequests;
