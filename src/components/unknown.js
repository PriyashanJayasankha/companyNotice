import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import actions from '../redux/actions';

const Unknown = () => {
  // 'useSelector' for access the state from any component
  const counter = useSelector(state => {
    return state.counterReducer;
  });

  // 'useDispatch' for dispatch actions from any component
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {counter} </Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            color="green"
            title="+"
            onPress={() => dispatch(actions.increment())}
          />
        </View>
        <View style={styles.button}>
          <Button
            color="black"
            title="-"
            onPress={() => dispatch(actions.decrement())}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    margin: 30,
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    width: 80,
  },
});

export default Unknown;
