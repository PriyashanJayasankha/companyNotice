import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  CheckBox,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Icon from 'react-native-vector-icons/Feather';
import Firestore from '@react-native-firebase/firestore';

const UpdateNotice = params => {
  const item = params.route.params.item;

  const [title, setTitle] = React.useState(item.title);
  const [description, setDescription] = React.useState(item.description);

  const [directorChecked, setDirectorChecked] = React.useState(
    item.for.director,
  );
  const [seniorWorkerChecked, setSeniorWorkerChecked] = React.useState(
    item.for.seniorWorker,
  );
  const [juniorWorkerChecked, setJuniorWorkerChecked] = React.useState(
    item.for.juniorWorker,
  );

  const [errorMessage, setErrorMessage] = React.useState('');
  const [addingNotice, setAddingNotice] = React.useState(false);

  const tryUpdateNotice = () => {
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
      isNew: false,
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
        .doc(item.id)
        .update(newNotice)
        .then(() => {
          setAddingNotice(false);
          params.navigation.navigate('Home', {screen: 'Notices'});
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Update Notice</Text>
        <Icon
          onPress={() => params.navigation.toggleDrawer()}
          style={styles.icon}
          name="menu"
          size={32}
          color="white"
        />
      </View>
      <View style={styles.bottomContainer}>
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
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Decription</Text>
              <TextInput
                value={description}
                onChangeText={text => setDescription(text)}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => params.navigation.pop()}
              activeOpacity={0.8}
              style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => tryUpdateNotice()}
              activeOpacity={0.8}
              style={styles.updateButton}>
              <Text style={styles.buttonText}>Update</Text>
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
    height: 60,
    backgroundColor: '#1F92D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    color: 'white',
    marginTop: 'auto',
    marginBottom: -20,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    marginRight: 'auto',
    marginLeft: 10,
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    alignContent: 'center',
  },
  scrollView: {
    width: '100%',
    padding: 30,
    flex: 1,
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  inputGroup: {
    marginTop: 10,
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 0,
  },
  cancelButton: {
    borderRadius: 8,
    height: 50,
    width: '40%',
    backgroundColor: '#EA4F45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
  },
  updateButton: {
    borderRadius: 8,
    height: 50,
    width: '40%',
    backgroundColor: '#EABC45',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
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

export default UpdateNotice;
