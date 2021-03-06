import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import moment from 'moment';

const NoticeCard = params => {
  let audiance = '|';

  if (
    params.item.for.director &&
    params.item.for.seniorWorker &&
    params.item.for.juniorWorker
  ) {
    audiance += ' All |';
  } else {
    if (params.item.for.director) {
      audiance += ' Directors |';
    }
    if (params.item.for.seniorWorker) {
      audiance += ' Senior Workers |';
    }
    if (params.item.for.juniorWorker) {
      audiance += ' Junior Workers |';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.titleAndStatus}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {params.item.title}
          </Text>
          {params.item.newForMe && params.item.isNew ? (
            <Text style={styles.statusNew}>New</Text>
          ) : (
            <View />
          )}
          {params.item.newForMe && !params.item.isNew ? (
            <Text style={styles.statusUpdated}>Updated</Text>
          ) : (
            <View />
          )}
        </View>
        <Text style={styles.audiance}>Notice for : {audiance} </Text>
        <View
          style={{
            borderBottomColor: '#888888',
            borderBottomWidth: 0.5,
          }}
        />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {params.item.description}
        </Text>
        {params.item.isNew ? (
          <Text style={styles.time}>
            Added: {moment(params.item.time).fromNow()}
          </Text>
        ) : (
          <Text style={styles.time}>
            Updated: {moment(params.item.time).fromNow()}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
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
  statusNew: {
    marginLeft: 'auto',
    fontFamily: 'Poppins-Bold',
    color: '#01A77F',
    marginTop: -18,
    marginRight: -10,
  },
  statusUpdated: {
    marginLeft: 'auto',
    fontFamily: 'Poppins-Bold',
    color: '#EABC45',
    marginTop: -18,
    marginRight: -10,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#aaaaaa',
    marginTop: 10,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    height: 40,
    textAlignVertical: 'center',
  },
  audiance: {
    fontFamily: 'Poppins-Regular',
    color: '#3e3b3b',
  },
});

export default NoticeCard;
