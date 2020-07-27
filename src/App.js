import 'react-native-gesture-handler';
import React, {useReducer} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Auth, {firebase} from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import AuthContext from './context/authContext';

import Login from './screens/login';
import Signup from './screens/signup';
import Notices from './screens/notices';
import ViewNotice from './screens/viewNotice';
import AddNotice from './screens/addNotice';
import NewRequests from './screens/newRequests';
import RejectedRequests from './screens/rejectedRequests';
import AcceptedRequests from './screens/acceptedRequests';
import ErrorScreen from './screens/errorScreen';
import UpdateNotice from './screens/updateNotice';

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

  const [loading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState({
    user: null,
    loading: true,
  });

  React.useEffect(() => {
    Auth().onAuthStateChanged(async user => {
      if (user) {
        if (userToken.user === null) {
          const userdata = await Firestore()
            .collection('users')
            .doc(user.uid)
            .get();

          console.warn('userToken setted');
          setUserToken({
            user: userdata.data(),
            loading: false,
          });
        }
      } else {
        setLoading(false);
      }
    });
  }, []);

  const authContext = React.useMemo(() => {
    return {
      login: user => {
        console.warn('login called');
        setUserToken({user: user, loading: false});
        return true;
      },
      getUser: () => {
        return userToken.user;
      },
      logout: () => {
        Auth()
          .signOut()
          .then(() => {
            setUserToken({user: null, loading: false});
          });
      },
    };
  }, [userToken.user]);

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
      <HomeStack.Screen name="UpdateNotice" component={UpdateNotice} />
    </HomeStack.Navigator>
  );

  const DrawerStackScreens = () => (
    <DrawerStack.Navigator
      drawerContent={props => <DrawerContent {...props} />}>
      <DrawerStack.Screen name="Home" component={HomeStackScreens} />
      <DrawerStack.Screen name="AddNotice" component={AddNotice} />
      <DrawerStack.Screen name="NewRequests" component={NewRequests} />
      <DrawerStack.Screen
        name="RejectedRequests"
        component={RejectedRequests}
      />
      <DrawerStack.Screen
        name="AcceptedRequests"
        component={AcceptedRequests}
      />
    </DrawerStack.Navigator>
  );

  const loadScreen = () => {
    let renderItem = <View />;

    if (userToken.user) {
      if (userToken.user.accountStatus === 'pending') {
        renderItem = (
          <ErrorScreen
            title="Wait"
            message="Your account is still under review, wait for untill the system Admin
            accept your account"
          />
        );
      } else if (userToken.user.accountStatus === 'rejected') {
        renderItem = (
          <ErrorScreen
            title="Error"
            message="Your account is Rejected by Admin, please contact System Admin for
            more details"
          />
        );
      } else {
        console.warn('load drawer');
        renderItem = <DrawerStackScreens />;
      }
    } else {
      console.warn('load Auth');
      renderItem = <AuthStackScreens />;
    }
    return renderItem;
  };

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar
        translucent
        backgroundColor="#1F92D1"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <Spinner
              visible={userToken.loading && loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <Spinner
              visible={userToken.loading && loading}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
            <>{loadScreen()}</>
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
