import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import Firestore from '@react-native-firebase/firestore';

import AuthContext from '../context/authContext';

import moment from 'moment';

const windowHeight = Dimensions.get('window').height;

const ViewNotice = params => {
  const item = params.route.params.item;

  const {getUser} = React.useContext(AuthContext);

  const user = getUser();

  switch (user.position) {
    case 2:
      if (!item.readBy.directors.includes(user.id)) {
        Firestore()
          .collection('notices')
          .doc(item.id)
          .set(
            {readBy: {directors: [...item.readBy.directors, user.id]}},
            {merge: true},
          );
      }
      break;
    case 3:
      if (!item.readBy.seniorWorkers.includes(user.id)) {
        Firestore()
          .collection('notices')
          .doc(item.id)
          .set(
            {readBy: {seniorWorkers: [...item.readBy.seniorWorkers, user.id]}},
            {merge: true},
          );
      }
      break;
    case 4:
      if (!item.readBy.juniorWorkers.includes(user.id)) {
        Firestore()
          .collection('notices')
          .doc(item.id)
          .set(
            {readBy: {juniorWorkers: [...item.readBy.juniorWorkers, user.id]}},
            {merge: true},
          );
      }
      break;
    default:
      break;
  }

  let audiance = '|';

  if (item.for.director && item.for.seniorWorker && item.for.juniorWorker) {
    audiance += ' All |';
  } else {
    if (item.for.director) {
      audiance += ' Directors |';
    }
    if (item.for.seniorWorker) {
      audiance += ' Senior Workers |';
    }
    if (item.for.juniorWorker) {
      audiance += ' Junior Workers |';
    }
  }

  const deleteNotice = () => {
    Firestore()
      .collection('notices')
      .doc(item.id)
      .delete();
    params.navigation.navigate('Notices');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>View Notice</Text>
        <Icon
          onPress={() => params.navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
          size={32}
          color="white"
        />
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.audianceLabel}>Norice for : </Text>
          <Text style={styles.audiance}>{audiance}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.isNew ? (
            <Text style={styles.time}>
              Added: {moment(item.time).fromNow()}
            </Text>
          ) : (
            <Text style={styles.time}>
              Updated: {moment(item.time).fromNow()}
            </Text>
          )}

          <View style={styles.viewedBy}>
            <Text style={styles.viewTitle}>Viewed By :</Text>

            {item.for.director ? (
              <Text style={styles.viewCount}>
                {item.readBy.directors.length} - Directors
              </Text>
            ) : (
              <View />
            )}

            {item.for.seniorWorker ? (
              <Text style={styles.viewCount}>
                {item.readBy.seniorWorkers.length} - Senior Workers
              </Text>
            ) : (
              <View />
            )}

            {item.for.juniorWorker ? (
              <Text style={styles.viewCount}>
                {item.readBy.juniorWorkers.length} - Junior Workers
              </Text>
            ) : (
              <View />
            )}
          </View>
          {user.position === 1 ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => deleteNotice()}
                activeOpacity={0.8}
                style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => params.navigation.push('UpdateNotice', {item})}
                activeOpacity={0.8}
                style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
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
  scrollView: {
    width: '100%',
    minHeight: windowHeight - (windowHeight * 18) / 100,
    padding: 30,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: '#333333',
    marginBottom: 5,
  },
  audianceLabel: {
    color: '#444444',
    fontFamily: 'Poppins-Medium',
  },
  audiance: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    borderColor: '#33799F',
  },
  time: {
    marginLeft: 'auto',
    color: '#444444',
    fontFamily: 'Poppins-Medium',
  },
  viewedBy: {
    marginTop: 50,
  },
  viewTitle: {
    fontFamily: 'Poppins-Bold',
  },
  viewCount: {
    fontFamily: 'Poppins-Medium',
    margin: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 50,
  },
  deleteButton: {
    borderRadius: 8,
    height: 50,
    width: '40%',
    backgroundColor: '#EA4F45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
  },
  updateButton: {
    borderRadius: 8,
    height: 50,
    width: '40%',
    backgroundColor: '#EABC45',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
  },
});

export default ViewNotice;
