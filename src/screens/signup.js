import React, {useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import AuthContext from '../context/authContext';

// validate = text => {
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (reg.test(text) === false) {
//     console.log('Email is Not Correct');
//     this.setState({email: text});
//     return false;
//   } else {
//     this.setState({email: text});
//     console.log('Email is Correct');
//   }
// };

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
      password: password,
    };

    if (newUser.email.length <= 0) {
      setErrorMessage('Enter your email!');
    } else if (newUser.firstName.length <= 0) {
      setErrorMessage('Enter your first name!');
    } else if (newUser.lastName.length <= 0) {
      setErrorMessage('Enter your last name!');
    } else if (newUser.password.length <= 0) {
      setErrorMessage('Enter your password!');
    } else {
      Auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(res => {
          //success Auth
          res.user.updateProfile({displayName: position.toString()});
          Firestore()
            .collection('users')
            .doc(res.user.uid)
            .set({...newUser, id: res.user.uid})
            .then(() => {
              login({...newUser, id: res.user.uid});
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            setErrorMessage('That email address is invalid!');
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Sign Up</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
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
                    icon: () => <Icon name="user" size={18} color="#8E45EA" />,
                  },
                  {
                    label: 'Senior Worker',
                    value: 3,
                    icon: () => <Icon name="user" size={18} color="#8E45EA" />,
                  },
                  {
                    label: 'Junior Worker',
                    value: 4,
                    icon: () => <Icon name="user" size={18} color="#8E45EA" />,
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
    marginTop: 50,
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
    color: '#8E45EA',
  },
  submitButton: {
    margin: 10,
    marginTop: 50,
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
  login: {
    textDecorationLine: 'underline',
    color: '#8E45EA',
  },
  errorMessage: {
    fontFamily: 'Poppins-Regular',
    color: 'red',
    width: '100%',
    textAlign: 'center',
  },
});

export default Signup;
