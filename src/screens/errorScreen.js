import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import AuthContext from '../context/authContext';

const ErrorScreen = params => {
  const {logout} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>{params.title}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.boxContainerInner}>
            <Text style={styles.message}>{params.message}</Text>
            <TouchableOpacity
              onPress={() => logout()}
              activeOpacity={0.8}
              style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
    height: '15%',
    backgroundColor: '#1F92D1',
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    color: 'white',
    marginTop: 'auto',
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    margin: 10,
    borderRadius: 0,
    elevation: 10,
    width: 380,
  },
  boxContainerInner: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  message: {
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    height: 50,
    width: '40%',
    backgroundColor: '#EA4F45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorScreen;
