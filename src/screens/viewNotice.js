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

const windowHeight = Dimensions.get('window').height;

const ViewNotice = params => {
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Logo dessign for my new bussiness</Text>
          <Text style={styles.audianceLabel}>Norice for : </Text>
          <Text style={styles.audiance}>Directors | Senior Workers </Text>
          <Text style={styles.description}>
            I need some one who can design me a stunning logo for my new beauti
            saloon ...I need some one who can design me a stunning logo for my
            new beauti saloon ...I need some one who can design me a stunning
            logo for my new beauti saloon ...I need some one who can design me a
            stunning logo for my new beauti saloon ...I need some one who can
            design me a stunning logo for my new beauti saloon ...I need some
            one who can design me a stunning logo for my new beauti saloon ...I
            need some one who can design me a stunning logo for my new beauti
            saloon.
          </Text>
          <Text style={styles.time}>Added : 2 minutes ago</Text>

          <View style={styles.adminPart}>
            <Text style={styles.viewTitle}>Viewed By :</Text>
            <Text style={styles.viewCount}>4 - Directors</Text>
            <Text style={styles.viewCount}>10 - Senior Workers</Text>
            <Text style={styles.viewCount}>50 - Junior Workers</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.updateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scrollView: {
    width: '100%',
    minHeight: windowHeight - (windowHeight * 18) / 100,
    padding: 30,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 5,
  },
  audianceLabel: {
    color: '#AAAAAA',
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
  },
  time: {
    marginLeft: 'auto',
    color: '#AAAAAA',
    fontFamily: 'Poppins-Medium',
  },
  adminPart: {
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
