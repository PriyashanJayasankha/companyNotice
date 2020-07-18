import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from 'react-native';

const AddNotice = ({params}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Add New Notice</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Decription</Text>
              <TextInput
                multiline={true}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.input,
                  height: 200,
                  textAlignVertical: 'top',
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notice For</Text>
              <View style={styles.checkBoxAndLabel}>
                <CheckBox />
                <Text style={styles.checkBoxLabel}>Directors</Text>
              </View>
              <View style={styles.checkBoxAndLabel}>
                <CheckBox />
                <Text style={styles.checkBoxLabel}>Senior Workers</Text>
              </View>
              <View style={styles.checkBoxAndLabel}>
                <CheckBox />
                <Text style={styles.checkBoxLabel}>Junior Workers</Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.postButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
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
    marginTop: 10,
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
  checkBoxAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxLabel: {
    fontFamily: 'Poppins-Regular',
    color: '#333333',
  },
  postButton: {
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
});

export default AddNotice;
