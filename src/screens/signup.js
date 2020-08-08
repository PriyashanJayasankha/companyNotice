import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import AuthContext from '../context/authContext';

const Signup = params => {
  const [showPassword, setShowPassword] = useState({
    text: 'Show',
    security: true,
  });

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [position, setPosition] = useState(2);

  const [registering, setRegistering] = useState(false);
  const [logging, setLogging] = useState(false);

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

  const {login} = React.useContext(AuthContext);

  const tryRegister = () => {
    const newUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      position: position,
      accountStatus: 'pending',
    };

    if (newUser.email.length <= 0) {
      setErrorMessage('Enter your email!');
    } else if (newUser.firstName.length <= 0) {
      setErrorMessage('Enter your first name!');
    } else if (newUser.lastName.length <= 0) {
      setErrorMessage('Enter your last name!');
    } else if (password.length <= 0) {
      setErrorMessage('Enter your password!');
    } else {
      setRegistering(true);
      Auth()
        .createUserWithEmailAndPassword(newUser.email, password)
        .then(res => {
          //success Auth
          setRegistering(false);
          setLogging(true);
          res.user.updateProfile({displayName: position.toString()});
          Firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({...newUser, id: res.user.uid})
            .then(() => {
              setLogging(false);
              login({...newUser, id: res.user.uid});
            });
        })
        .catch(error => {
          setRegistering(false);
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            setErrorMessage('That email address is invalid!');
          }
          if (error.code === 'auth/weak-password') {
            setErrorMessage('Password must be atleast 6 characters');
          }
          if (error.code === 'auth/network-request-failed') {
            Alert.alert('Error !', 'Check your network connection');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Sign Up</Text>
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
              visible={registering}
              textContent={'Signing up...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Spinner
              visible={logging}
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

              <View style={styles.names}>
                <View style={{...styles.inputGroup, flex: 1}}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                  />
                </View>
                <View style={{...styles.inputGroup, flex: 1}}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    onChangeText={text => setLastName(text)}
                    style={styles.input}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Your Position</Text>
                <DropDownPicker
                  items={[
                    {
                      label: 'Director',
                      value: 2,
                      icon: () => (
                        <Icon name="user" size={18} color="#1F92D1" />
                      ),
                    },
                    {
                      label: 'Senior Worker',
                      value: 3,
                      icon: () => (
                        <Icon name="user" size={18} color="#1F92D1" />
                      ),
                    },
                    {
                      label: 'Junior Worker',
                      value: 4,
                      icon: () => (
                        <Icon name="user" size={18} color="#1F92D1" />
                      ),
                    },
                  ]}
                  defaultValue={position}
                  containerStyle={dropDownStyle.containerStyle}
                  style={dropDownStyle.style}
                  itemStyle={dropDownStyle.itemStyle}
                  dropDownStyle={dropDownStyle.dropDownStyle}
                  onChangeItem={item => setPosition(item.value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.password}>
                  <TextInput
                    onChangeText={text => setPassword(text)}
                    // eslint-disable-next-line react-native/no-inline-styles
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
                onPress={() => tryRegister()}
                activeOpacity={0.8}
                style={styles.submitButton}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>

              <View style={styles.noAccount}>
                <Text> Alredy a member? </Text>
                <Text
                  onPress={() => params.navigation.pop()}
                  style={styles.login}>
                  Login
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const dropDownStyle = {
  containerStyle: {},
  style: {
    height: 50,
    backgroundColor: '#F6f6f6',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderRadius: 8,
  },
  itemStyle: {
    justifyContent: 'flex-start',
    backgroundColor: '#F6f6f6',
  },
  dropDownStyle: {
    marginTop: 2,
    backgroundColor: '#F6f6f6',
  },
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

export default Signup;
