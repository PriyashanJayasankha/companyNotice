import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Auth from '@react-native-firebase/auth';

const Login = params => {
  const [showPassword, setShowPassword] = useState({
    text: 'Show',
    security: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [tryingLogging, setTryingLogging] = useState(false);

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

  const tryLogin = () => {
    const newUser = {
      email: email,
      password: password,
    };

    if (newUser.email.length <= 0) {
      setErrorMessage('Enter your email!');
    } else if (newUser.password.length <= 0) {
      setErrorMessage('Enter your password!');
    } else {
      setTryingLogging(true);
      Auth()
        .signInWithEmailAndPassword(newUser.email, newUser.password)
        .then(() => {
          setTryingLogging(false);
        })
        .catch(error => {
          setTryingLogging(false);
          if (error.code === 'auth/invalid-email') {
            setErrorMessage('That email address is invalid!');
          } else if (error.code === 'auth/user-not-found') {
            setErrorMessage('You are not registered. Signup now!');
          } else if (error.code === 'auth/wrong-password') {
            setErrorMessage('Invaid password');
          } else if (error.code === 'auth/network-request-failed') {
            Alert.alert('Error !', 'Check your network connection');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Log In</Text>
      </View>
      <View style={styles.myDetailsBar}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          MGP Jayasankha - 17000653
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Spinner
              visible={tryingLogging}
              textContent={'Logging in...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.password}>
                  <TextInput
                    onChangeText={text => setPassword(text)}
                    style={{...styles.input, width: '100%'}}
                    secureTextEntry={showPassword.security}
                  />
                  <Text
                    onPress={changePasswordVisibility}
                    style={styles.showPassword}>
                    {showPassword.text}
                  </Text>
                </View>
              </View>

              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                onPress={() => tryLogin()}
                activeOpacity={0.8}
                style={styles.submitButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.noAccount}>
                <Text> Don't have account? </Text>
                <Text
                  onPress={() => params.navigation.push('Signup')}
                  style={styles.login}>
                  Signup
                </Text>
              </View>
            </View>
          </ScrollView>
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
    height: 60,
    backgroundColor: '#1F92D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myDetailsBar: {
    height: 20,
    backgroundColor: '#1F92D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  heading: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  form: {
    width: '90%',
  },
  names: {
    flexDirection: 'row',
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
    fontFamily: 'Poppins-Regular',
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPassword: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'right',
    width: 50,
    fontSize: 16,
    marginLeft: -60,
    color: '#1F92D1',
  },
  bottomButtons: {
    margin: 10,
    marginTop: 60,
    width: '90%',
    padding: 10,
  },
  submitButton: {
    borderRadius: 8,
    height: 50,
    backgroundColor: '#1F92D1',
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
  login: {
    textDecorationLine: 'underline',
    color: '#1F92D1',
  },
  errorMessage: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    width: '100%',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default Login;
