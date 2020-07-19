import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import AuthContext from './context/authContext';

import Login from './screens/login';
import Signup from './screens/signup';
import NoticeCard from './components/noticeCard';
import Notices from './screens/notices';
import ViewNotice from './screens/viewNotice';
import AddNotice from './screens/addNotice';

import DrawerContent from './components/drawerContent';

// import Unknown from './components/unknown';

import store from './redux/store';
import actions from './redux/actions';

const App = () => {
  //////////////////////////////////////////
  // store.subscribe(() => {
  //   console.log(store.getState());
  // });

  // // dispatch
  // store.dispatch(actions.increment());
  // store.dispatch(actions.increment());
  /////////////////////////////////////////

  const [checkingAuth, setCheckingAuth] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  Auth().onAuthStateChanged(async user => {
    if (user) {
      if (userToken === null) {
        await Firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(res => {
            setUserToken(res.data());
            setCheckingAuth(false);
          });
      }
    } else {
      setCheckingAuth(false);
    }
  });

  const authContext = React.useMemo(() => {
    return {
      login: user => {
        setUserToken(user);
        return true;
      },
      getUser: () => {
        return userToken;
      },
      logout: () => {
        Auth()
          .signOut()
          .then(() => {
            setUserToken(null);
          });
      },
    };
  }, [userToken]);

  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();
  const DrawerStack = createDrawerNavigator();

  // screen stacks

  const AuthStackScreens = () => (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );

  const HomeStackScreens = () => (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Notices" component={Notices} />
      <HomeStack.Screen name="ViewNotice" component={ViewNotice} />
    </HomeStack.Navigator>
  );

  const DrawerStackScreens = () => (
    <DrawerStack.Navigator
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerStack.Screen name="Home" component={HomeStackScreens} />
      <DrawerStack.Screen name="AddNotice" component={AddNotice} />
    </DrawerStack.Navigator>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar
        translucent
        backgroundColor="#8E45EA"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <Spinner
              visible={checkingAuth}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            {userToken ? <DrawerStackScreens /> : <AuthStackScreens />}
          </SafeAreaView>
        </Provider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 80,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default App;
