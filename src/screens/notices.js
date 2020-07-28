import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Firestore from '@react-native-firebase/firestore';

import NoticeCard from '../components/noticeCard';

import Icon from 'react-native-vector-icons/Feather';

import AuthContext from '../context/authContext';

import Spinner from 'react-native-loading-spinner-overlay';

const windowHeight = Dimensions.get('window').height;

const Notices = params => {
  //   Alert.alert('Alert Title', 'My Alert Msg', [], {cancelable: false});

  const {getUser} = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(true); // Set loading to true on component mount
  const [notices, setNotices] = React.useState([]);

  const user = getUser();

  React.useEffect(() => {
    const subscriber = Firestore()
      .collection('notices')
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
        <Text style={styles.heading}>Notices</Text>
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
          data={notices}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => params.navigation.navigate('ViewNotice', {item})}>
              <NoticeCard item={item} />
            </TouchableOpacity>
          )}
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

export default Notices;
