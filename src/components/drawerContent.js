import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../context/authContext';

const DrawerContent = params => {
  const {logout} = React.useContext(AuthContext);

  return (
    <View>
      <SafeAreaView>
        <View style={styles.topBox}>
          <Text style={styles.firstName}>Priyashan</Text>
          <Text style={styles.lastName}>jayasankha</Text>
          <Text style={styles.position}>Director</Text>
        </View>
        <DrawerItem
          icon={() => <Icon name="home-outline" color="#5b5b5b" size={32} />}
          style={styles.drawerItem}
          label="Home"
          onPress={() => {
            params.navigation.navigate('Home', {screen: 'Notices'});
          }}
        />
        <DrawerItem
          icon={() => <Icon name="newspaper" color="#5b5b5b" size={32} />}
          style={styles.drawerItem}
          label="Add Notice"
          onPress={() => {
            params.navigation.navigate('AddNotice');
          }}
        />

        <View style={styles.logoutContainer}>
          <Text onPress={() => logout()} style={styles.logout}>
            Logout
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  topBox: {
    height: 150,
    backgroundColor: '#7B48AD',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  firstName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 35,
    marginLeft: 10,
    color: 'white',
  },
  lastName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: -10,
    color: 'white',
  },
  position: {
    fontFamily: 'Poppins-Regular',
    color: '#f6f6f6',
    marginLeft: 'auto',
    marginRight: 10,
  },
  drawerItem: {
    backgroundColor: '#f1f1f1',
  },
  logoutContainer: {
    margin: 10,
    marginTop: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 8,
  },
  logout: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    height: 'auto',
    color: 'red',
    fontSize: 20,
    width: '100%',
  },
});

export default DrawerContent;
