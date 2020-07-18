import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NoticeCard from '../components/noticeCard';

const windowHeight = Dimensions.get('window').height;

const Notices = params => {
  //   Alert.alert('Alert Title', 'My Alert Msg', [], {cancelable: false});

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Notices</Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => params.navigation.push('ViewNotice')}>
            <NoticeCard />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => params.navigation.push('ViewNotice')}>
            <NoticeCard />
          </TouchableOpacity>
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
    minHeight: windowHeight - (windowHeight * 18) / 100,
  },
});

export default Notices;
