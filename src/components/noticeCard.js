import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const NoticeCard = ({params}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.titleAndStatus}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.status}>New</Text>
        </View>
        <Text style={styles.time}>Added: 2 minutes ago</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          cascac cacasc cascasc cascasc cascsac cascasc cascasc cascascas casc
          ascc cascascas cascasca cascsa
        </Text>
        <Text style={styles.audiance}> Notice for : All </Text>
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
  titleAndStatus: {
    flexDirection: 'row',
  },
  title: {
    marginRight: 'auto',
    fontFamily: 'Poppins-Bold',
    color: '#333333',
    fontSize: 18,
  },
  status: {
    marginLeft: 'auto',
    fontFamily: 'Poppins-Bold',
    color: '#01A77F',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#aaaaaa',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  audiance: {
    fontFamily: 'Poppins-Regular',
    color: '#3e3b3b',
    marginTop: 10,
  },
});

export default NoticeCard;
