import React from 'react';
import {Provider} from 'react-redux';

import {SafeAreaView, StyleSheet, Text} from 'react-native';

import Login from './screens/login';
import Signup from './screens/signup';

// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// import Unknown from './components/unknown';

import store from './redux/store';
import actions from './redux/actions';

const App = () => {
  store.subscribe(() => {
    console.log(store.getState());
  });

  // dispatch
  store.dispatch(actions.increment());
  store.dispatch(actions.increment());

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Signup />
      </SafeAreaView>
    </Provider>
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
