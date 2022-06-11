import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
//compponent
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ProcessingLoader from '../AppComponent/ProcessingLoader';
import FooterComponent from '../AppComponent/FooterComponent'
//* AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import {clearData} from 'api/UserPreference';
import {AppContext} from 'context_api/context';

function MyProfilsScreen(props) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [userProfile, setUserProfile] = useState('');
  const [message, setMessage] = useState('');
  const {signOut} = useContext(AppContext);

  useEffect(() => {
    handleProfileData();
  });

  const handleProfileData = async () => {
    const params = null;
    await props.viewProfile(params).then(() => {
      const {success, message} = props.isProfile;
      if (success) {
        const {userProfile} = props.isProfile;
        setUserProfile(userProfile);
        setIsProcessing(false);
      } else {
        setUserProfile('');
        setIsProcessing(false);
        setMessage(message);
      }
    });
  };

  const handleEditProfile = () => {
    props.navigation.navigate('editprofile');
  };

  const handleLogout = async () => {
    await clearData();
    console.log(props);
    await signOut();
    await AsyncStorage.clear();
  };

  const {name, mobile} = userProfile;
  if (!(name == null)) {
    const pImg = name.match(/\b(\w)/g);
    if (!(pImg === null)) {
      var ProImg = pImg.join(' ');
      var Latter = ProImg.toUpperCase();
    }
  } else {
    var Latter = null;
  }
  return (
    <SafeAreaView>
      <View>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="माई प्रोफाइल "
          alert=""
          location=""
          bookmark=""
          nav={props.navigation}
        />
        <View>
          <View>
            <Text>{Latter}</Text>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                marginLeft: 15,
                marginRight: 15,
              }}>
              <Text style={{padding: 10, color: 'black'}}>
                Name:{'        '}
                {name}
              </Text>
              {/* <Text style={styles.userNameSmall}>ramlal@gmail.com</Text> */}
              <Text style={{padding: 10, color: 'black'}}>
                {' '}
                Phone:{'         '}
                {mobile}
              </Text>
            </View>
            <TouchableHighlight
              underlayColor="#f2f1f1"
              onPress={handleEditProfile}
              style={{
                alignItems: 'center',
                backgroundColor: 'green',
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text style={{color: 'white'}}>प्रोफाइल बदले</Text>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                alignItems: 'center',
                backgroundColor: 'green',
                padding: 10,
                marginTop: 10,
                borderRadius: 10,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text style={{color: 'white'}}>लॉगआउट करे</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isProcessing && <ProcessingLoader />}
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  isProfile: profileSelectors.isProfile(state),
});
const mapDispatchToProps = {
  viewProfile: profileOperations.viewProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyProfilsScreen);
