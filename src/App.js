import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';

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

  const [userToken, setUserToken] = React.useState(false);

  const authContext = React.useMemo(() => {
    return {
      login: () => {
        setUserToken(true);
        return true;
      },
      signup: () => {
        setUserToken(true);
      },
      logout: () => {
        setUserToken(false);
        console.warn('Logged Out');
      },
    };
  }, []);

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
});

export default App;
