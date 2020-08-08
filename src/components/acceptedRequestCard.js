import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import Firestore from '@react-native-firebase/firestore';

const AcceptedRequestCard = params => {
  const reject = id => {
    Firestore()
      .collection('users')
      .doc(id)
      .update({accountStatus: 'rejected'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.titleAndValue}>
          <Text style={styles.title}>Name : </Text>
          <Text style={styles.value}>
            {params.item.firstName} {params.item.lastName}
          </Text>
        </View>
        <View style={styles.titleAndValue}>
          <Text style={styles.title}>Email : </Text>
          <Text style={styles.value}>{params.item.email}</Text>
        </View>
        <View style={styles.titleAndValue}>
          <Text style={styles.title}>Position : </Text>
          {params.item.position === 2 ? (
            <Text style={styles.value}>Director</Text>
          ) : (
            <View />
          )}
          {params.item.position === 3 ? (
            <Text style={styles.value}>Senior Worker</Text>
          ) : (
            <View />
          )}
          {params.item.position === 4 ? (
            <Text style={styles.value}>Junior Worker</Text>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                '',
                'Are you sure you want to reject this user ?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('cancel pressed'),
                  },
                  {
                    text: 'Reject',
                    onPress: () => reject(params.item.id),
                  },
                ],
                {cancelable: false},
              )
            }
            activeOpacity={0.8}
            style={styles.acceptButton}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 0,
    elevation: 10,
  },
  containerInner: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  titleAndValue: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#333333',
  },
  value: {
    fontFamily: 'Poppins-Medium',
    color: '#444444',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 'auto',
  },
  acceptButton: {
    borderRadius: 8,
    height: 30,
    width: 100,
    backgroundColor: '#EA4F45',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});

export default AcceptedRequestCard;
