import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Alert,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import {clearData} from 'api/UserPreference';
import {AppContext} from 'context_api/context';

//compponent
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

function EditProfile(props) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
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
        const {name, mobile} = userProfile;
        setName(name);
        setMobile(mobile);
        setIsProcessing(false);
      } else {
        setName('');
        setMobile('');
        setIsProcessing(false);
      }
    });
  };
  const handleLogout = async () => {
    await clearData();
    signOut();
  };

  const onChangeName = name => {
    setName(name);
  };
  const onChangeMobile = mobile => {
    setMobile(mobile);
  };

  const handleEditProfile = async () => {
    if (!isNameValid(name)) {
      Alert.alert('', 'कृपया अपना नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }
    if (!isMobileNumber(mobile)) {
      Alert.alert(
        '',
        'कृपया अपना वैध मोबाइल नंबर दर्ज करें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    setIsProcessing(true);

    const params = {
      name,
      mobile,
    };
    // console.log('profile data', params);
    await props.editProfile(params).then(() => {
      const {success, message} = props.isProfileEditSuccess;
      if (success) {
        Alert.alert(message);
        setIsProcessing(false);
        props.navigation.pop();
      } else {
        setIsProcessing(false);
        Alert.alert(message);
      }
    });
  };

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
          </View>

          <View>
            <View>
              <TextInput
                placeholderTextColor="#777"
                placeholder="अपना नाम दर्ज करें"
                value={name}
                onChangeText={onChangeName}
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderBottomColor: 'black',
                  marginBottom: 10,
                }}
              />
            </View>
            <View>
              <TextInput
                placeholderTextColor="#777"
                placeholder="अपना मोबाइल संख्या दर्ज करे"
                value={mobile}
                onChangeText={onChangeMobile}
                keyboardType="phone-pad"
                maxLength={10}
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderBottomColor: 'black',
                  marginBottom: 10,
                }}
              />
            </View>

            <TouchableOpacity
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
              <Text style={{color: 'white'}}>अपडेट करे</Text>
            </TouchableOpacity>
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
  isProfileEditSuccess: profileSelectors.isProfileEditSuccess(state),
  isProfile: profileSelectors.isProfile(state),
});
const mapDispatchToProps = {
  editProfile: profileOperations.editProfile,
  viewProfile: profileOperations.viewProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
const styles = StyleSheet.create({
  linearGradient: {
    height: hp(20),
    justifyContent: 'center',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    position: 'relative',
    zIndex: 9,
    backgroundColor: '#0b8457',
    // elevation: 5,
  },
  astroInfoContainer: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameWord: {
    backgroundColor: '#0b8457',
    height: wp(16),
    width: wp(16),
    borderRadius: wp(8),
    textAlign: 'center',
    lineHeight: wp(16),
    marginRight: wp(3),
    color: '#fff',
    fontSize: wp(5),
  },
  userName: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#333',
  },
  userNameSmall: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#333',
  },
  editProfileButton: {
    backgroundColor: '#0b8457',
    height: hp(5),
    borderRadius: hp(2.5),
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(-2.5),
    zIndex: 999,
  },
  infoContainer: {
    flex: 1,
    padding: wp(3),
    marginTop: hp(1.5),
  },
  inputContainer: {
    alignItems: 'center',
    // paddingHorizontal: wp(2),
    marginBottom: wp(2),
    backgroundColor: '#f2f1f1',
    paddingHorizontal: wp(3),
    borderRadius: 5,
  },
  label: {
    width: wp(22),
    fontSize: wp(3),
  },
  detailSeparator: {
    width: wp(6),
    fontSize: wp(3),
  },
  info: {
    flex: 1,
    fontSize: wp(3.5),
    // backgroundColor: '#cccccc80',
    height: hp(5.5),

    paddingHorizontal: wp(3),
  },

  iconRow: {
    height: hp(4),
    width: hp(4),
    backgroundColor: '#ff9933',
    borderRadius: hp(2),
    textAlign: 'center',
    lineHeight: hp(4),
  },
  icons: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  updateButton: {
    backgroundColor: '#0b8457',
    alignContent: 'center',
    justifyContent: 'center',
    height: hp(5),
    alignSelf: 'center',
    paddingHorizontal: wp(8),
    borderRadius: hp(2.75),
    marginTop: wp(3),
  },
  updateButtonText: {
    fontSize: wp(4),
    color: '#fff',
  },
});
