import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../context/authContext';

import {CommonActions} from '@react-navigation/native';

const DrawerContent = params => {
  const {logout} = React.useContext(AuthContext);
  const {getUser} = React.useContext(AuthContext);

  const user = getUser();
  let position = '';

  switch (user.position) {
    case 1:
      position = 'Admin';
      break;
    case 2:
      position = 'Director';
      break;
    case 3:
      position = 'Senior Worker';
      break;
    case 4:
      position = 'Junior Worker';
      break;
    default:
      position = '';
  }

  const tryLogout = () => {
    params.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
    logout();
  };

  return (
    <View>
      <SafeAreaView style={styles.page}>
        <View style={styles.topBox}>
          <Text style={styles.firstName}>{user.firstName}</Text>
          <Text style={styles.lastName}>{user.lastName}</Text>
          <Text style={styles.position}>{position}</Text>
        </View>
        <DrawerItem
          icon={() => <Icon name="home-outline" color="#33799F" size={32} />}
          style={styles.drawerItem}
          label="Home"
          onPress={() => {
            params.navigation.navigate('Home', {screen: 'Notices'});
          }}
        />

        {user.position === 1 ? (
          <View>
            <DrawerItem
              icon={() => <Icon name="newspaper" color="#33799F" size={32} />}
              style={styles.drawerItem}
              label="Add Notice"
              onPress={() => {
                // params.navigation.navigate('AddNotice');
                params.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'AddNotice'}],
                  }),
                );
                params.navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'AddNotice'}],
                  }),
                );
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="account-plus-outline" color="#33799F" size={32} />
              )}
              style={styles.drawerItem}
              label="New requests"
              onPress={() => {
                //params.navigation.navigate('NewRequests');
                params.navigation.dispatch(
                  CommonActions.reset({
                    index: 2,
                    routes: [{name: 'NewRequests'}],
                  }),
                );
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="account-remove-outline" color="#33799F" size={32} />
              )}
              style={styles.drawerItem}
              label="Rejected requests"
              onPress={() => {
                //params.navigation.navigate('RejectedRequests');
                params.navigation.dispatch(
                  CommonActions.reset({
                    index: 3,
                    routes: [{name: 'RejectedRequests'}],
                  }),
                );
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="account-multiple-check-outline"
                  color="#33799F"
                  size={32}
                />
              )}
              style={styles.drawerItem}
              label="Accepted requests"
              onPress={() => {
                //params.navigation.navigate('AcceptedRequests');
                params.navigation.dispatch(
                  CommonActions.reset({
                    index: 4,
                    routes: [{name: 'AcceptedRequests'}],
                  }),
                );
              }}
            />
          </View>
        ) : (
          <View />
        )}

        <View style={styles.logoutContainer}>
          <Text onPress={() => tryLogout()} style={styles.logout}>
            Logout
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
  },
  topBox: {
    height: 150,
    backgroundColor: '#33799F',
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
    backgroundColor: '#ffffff',
    borderColor: '#f6f6f6',
    borderBottomWidth: 1,
  },
  logoutContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderRadius: 8,
    marginTop: 'auto',
  },
  logout: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    height: 'auto',
    color: '#33799F',
    fontSize: 20,
    width: '100%',
  },
});

export default DrawerContent;
