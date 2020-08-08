import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/Feather';
import Firestore from '@react-native-firebase/firestore';

const AddNotice = params => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [directorChecked, setDirectorChecked] = React.useState(false);
  const [seniorWorkerChecked, setSeniorWorkerChecked] = React.useState(false);
  const [juniorWorkerChecked, setJuniorWorkerChecked] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState('');
  const [addingNotice, setAddingNotice] = React.useState(false);

  const tryAddNotice = () => {
    const newNotice = {
      title: title,
      description: description,
      for: {
        director: directorChecked,
        seniorWorker: seniorWorkerChecked,
        juniorWorker: juniorWorkerChecked,
      },
      readBy: {
        directors: [],
        seniorWorkers: [],
        juniorWorkers: [],
      },
      isNew: true,
      time: Date.now(),
    };
    if (newNotice.title.length <= 0) {
      setErrorMessage('Enter notice Title!');
    } else if (newNotice.description.length <= 0) {
      setErrorMessage('Enter notice Description!');
    } else if (
      !(directorChecked || seniorWorkerChecked || juniorWorkerChecked)
    ) {
      setErrorMessage('Add Someone for view the notice!');
    } else {
      setAddingNotice(true);
      Firestore()
        .collection('notices')
        .add(newNotice)
        .then(res => {
          Firestore()
            .collection('notices')
            .doc(res.id)
            .update({id: res.id})
            .then(() => {
              setAddingNotice(false);
              params.navigation.navigate('Home', {screen: 'Notices'});
            });
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon
          onPress={() => params.navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
          size={32}
          color="white"
        />
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Add Notice</Text>
        </View>
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
              visible={addingNotice}
              textContent={'Posting...'}
              textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  selectTextOnFocus={true}
                  onChangeText={text => setTitle(text)}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Decription</Text>
                <TextInput
                  onChangeText={text => setDescription(text)}
                  multiline={true}
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
                  <CheckBox
                    value={directorChecked}
                    onValueChange={setDirectorChecked}
                  />
                  <Text style={styles.checkBoxLabel}>Directors</Text>
                </View>
                <View style={styles.checkBoxAndLabel}>
                  <CheckBox
                    value={seniorWorkerChecked}
                    onValueChange={setSeniorWorkerChecked}
                  />
                  <Text style={styles.checkBoxLabel}>Senior Workers</Text>
                </View>
                <View style={styles.checkBoxAndLabel}>
                  <CheckBox
                    value={juniorWorkerChecked}
                    onValueChange={setJuniorWorkerChecked}
                  />
                  <Text style={styles.checkBoxLabel}>Junior Workers</Text>
                </View>
              </View>

              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
            <View style={styles.bottomButtons}>
              <TouchableOpacity
                onPress={() => tryAddNotice()}
                activeOpacity={0.8}
                style={styles.submitButton}>
                <Text style={styles.buttonText}>Post</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  myDetailsBar: {
    height: 20,
    backgroundColor: '#1F92D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  icon: {
    zIndex: 1,
    marginLeft: 10,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -42,
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
  checkBoxAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxLabel: {
    fontFamily: 'Poppins-Regular',
    color: '#333333',
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

export default AddNotice;
