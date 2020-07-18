import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AuthContext from '../context/authContext';

const Login = params => {
  const {logIn} = React.useContext(AuthContext);

  const [showPassword, setShowPassword] = useState({
    text: 'Show',
    security: true,
  });

  const changePasswordVisibility = () => {
    if (showPassword.security) {
      setShowPassword({
        text: 'Hide',
        security: false,
      });
    } else {
      setShowPassword({
        text: 'Show',
        security: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Log In</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.password}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={showPassword.security}
                />
                <Text
                  onPress={changePasswordVisibility}
                  style={styles.showPassword}>
                  {showPassword.text}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => console.warn(logIn())}
              activeOpacity={0.8}
              style={styles.submitButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.noAccount}>
              <Text> Dont have an account? </Text>
              <Text
                onPress={() => params.navigation.push('Signup')}
                style={styles.signup}>
                {' '}
                Sign Up{' '}
              </Text>
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
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
  },
  bottomContainer: {
    flex: 1,
    alignContent: 'center',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    marginTop: 100,
  },
  inputGroup: {
    margin: 10,
  },
  inputLabel: {
    color: '#666666',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: 50,
    backgroundColor: '#F6f6f6',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingStart: 20,
    paddingEnd: 20,
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPassword: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginLeft: -60,
    color: '#8E45EA',
  },
  submitButton: {
    margin: 10,
    marginTop: 100,
    borderRadius: 8,
    height: 50,
    backgroundColor: '#8E45EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontSize: 16,
  },
  noAccount: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signup: {
    textDecorationLine: 'underline',
    color: '#8E45EA',
  },
});

export default Login;
