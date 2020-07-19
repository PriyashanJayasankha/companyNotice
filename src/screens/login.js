import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import AuthContext from '../context/authContext';

const Login = params => {
  const {login} = React.useContext(AuthContext);

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
        .then(async res => {
          //success Auth
          const user = await Firestore()
            .collection('users')
            .doc(res.user.uid)
            .get();

          login(user.data());

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
          }
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
          <Spinner
            visible={tryingLogging}
            textContent={'Logging in...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail</Text>
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

            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <TouchableOpacity
              onPress={() => tryLogin()}
              activeOpacity={0.8}
              style={styles.submitButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.noAccount}>
              <Text> Dont have an account? </Text>
              <Text
                onPress={() => params.navigation.push('Signup')}
                style={styles.signup}>
                Sign Up
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
