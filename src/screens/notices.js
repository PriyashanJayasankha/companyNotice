import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
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
        } else if (user.position === 3) {
          tempNotices = tempNotices.filter(item => item.for.seniorWorker);
        } else if (user.position === 4) {
          tempNotices = tempNotices.filter(item => item.for.juniorWorker);
        }

        setNotices(tempNotices);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // const getNotices = async () => {
  //   return await Firestore()
  //     .collection('Users')
  //     .get()
  //     .then(snapshot => {
  //       snapshot.docs.forEach(doc => {
  //         console.warn(doc.data());
  //       });
  //     });
  // };

  // const notices = getNotices();

  //console.warn(notices);

  const titles = ['aaa', 'bbb', 'ccc'];
  const posts = titles.map(item => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => params.navigation.push('ViewNotice')}>
      <NoticeCard title={item} />
    </TouchableOpacity>
  ));

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
    backgroundColor: '#8E45EA',
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
