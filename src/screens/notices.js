import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Firestore from '@react-native-firebase/firestore';

import NoticeCard from '../components/noticeCard';

import Icon from 'react-native-vector-icons/Feather';

import AuthContext from '../context/authContext';

import Spinner from 'react-native-loading-spinner-overlay';

const Notices = params => {
  const {getUser} = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(true);
  const [notices, setNotices] = React.useState([]);

  const user = getUser();

  React.useEffect(() => {
    const subscriber = Firestore()
      .collection('notices')
      .orderBy('time', 'desc')
      .onSnapshot(querySnapshot => {
        let tempNotices = [];

        querySnapshot.forEach(documentSnapshot => {
          tempNotices.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        if (user.position === 2) {
          tempNotices = tempNotices.filter(item => item.for.director);
          tempNotices = tempNotices.map(item => {
            if (item.readBy.directors.includes(user.id)) {
              item = {...item, newForMe: false};
            } else {
              item = {...item, newForMe: true};
            }
            return item;
          });
        } else if (user.position === 3) {
          tempNotices = tempNotices.filter(item => item.for.seniorWorker);
          tempNotices = tempNotices.map(item => {
            if (item.readBy.seniorWorkers.includes(user.id)) {
              item = {...item, newForMe: false};
            } else {
              item = {...item, newForMe: true};
            }
            return item;
          });
        } else if (user.position === 4) {
          tempNotices = tempNotices.filter(item => item.for.juniorWorker);
          tempNotices = tempNotices.map(item => {
            if (item.readBy.juniorWorkers.includes(user.id)) {
              item = {...item, newForMe: false};
            } else {
              item = {...item, newForMe: true};
            }
            return item;
          });
        }

        setNotices(tempNotices);
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
          <Text style={styles.heading}>Notices</Text>
        </View>
      </View>
      <View style={styles.myDetailsBar}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          MGP Jayasankha - 17000653
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.scrollView}>
          <Spinner
            visible={loading}
            textContent={'Loading data...'}
            textStyle={styles.spinnerTextStyle}
          />
          <FlatList
            style={styles.flatlist}
            data={notices}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  params.navigation.navigate('ViewNotice', {item})
                }>
                <NoticeCard item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
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
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default Notices;
