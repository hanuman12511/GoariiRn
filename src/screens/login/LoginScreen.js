import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Platform,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SafeAreaView from 'react-native-safe-area-view';


// Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from '../../data/redux/auth';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      mobile: '',
      referralCode: '',
    };
  
  }

  onMobileChange = mobile => {
    this.setState({mobile});
  };

  handleNext = async () => {
    const {mobile} = this.state;
 
   
    const params = {
      mobile,
    };
    await this.props.loginUser(params).then(() => {
      const {success, message} = this.props.isLoginSuccess;
      if (success) {
       
      
        this.props.navigation.navigate('OTP', {mobile});
      } else {
        showToast(message);
        
      }
    });
  };

  handleSignUp = () => {
    this.props.navigation.navigate('Sign Up');
  };

  render() {
    return (
      <SafeAreaView>
        <View>
              <Text>
                हम इस नंबर पर एक पुष्टिकरण कोड के साथ एक एसएमएस भेजेंगे
              </Text>
              <View style={styles.infoPart}>
                <View style={styles.inputContainer}>
                  <TextInput
                    // placeholder="Ender your Phone Number"
                    value="+91"
                    style={styles.countryCode}
                    placeholderTextColor="#fff"
                  />
                  <View style={styles.separator} />

                  <TextInput
                    style={styles.input}
                    placeholder="फ़ोन नंबर डाले"
                    placeholderTextColor="#fff"
                    maxLength={10}
                    keyboardType="numeric"
                    value={this.state.mobile}
                    onChangeText={this.onMobileChange}
                  />
                </View>

              

                <TouchableHighlight
                  style={styles.appButton}
                  onPress={this.handleNext}
                  underlayColor="#ffffff80">
                  <Text style={styles.otpText}>लॉगिन करे</Text>
                </TouchableHighlight>

                <TouchableOpacity
                  // style={styles.appButton}
                  onPress={this.handleSignUp}>
                  <Text style={styles.registerText}>रजिस्टर करे</Text>
                </TouchableOpacity>
              </View>
            </View>
        
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isLoginSuccess: authSelectors.isLoginSuccess(state),
});
const mapDispatchToProps = {
  loginUser: authOperations.loginUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo: {
    height: hp(15),
    aspectRatio: 1 / 1,
    marginBottom: hp(3),
  },
  hi: {
    fontSize: wp(8),
    color: '#fff',
  },
  title: {
    fontSize: wp(5),
    color: '#333',
    marginBottom: wp(2),
  },
  subTitle: {
    paddingHorizontal: wp(20),
    fontSize: wp(4),
    color: '#333',
    marginBottom: wp(5),
    textAlign: 'center',
  },
  infoPart: {
    backgroundColor: '#0b8457',
    paddingHorizontal: wp(3),
    paddingVertical: hp(5),
  },
  inputContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingHorizontal: wp(3),
  },
  inputIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  countryCode: {
    fontSize: wp(3),
    height: 36,
    color: '#fff',
  },
  input: {
    fontSize: wp(3),
    flex: 1,
    height: 36,
    color: '#fff',
  },

  separator: {
    width: 1,
    height: 26,
    backgroundColor: '#fff',
    marginHorizontal: wp(2),
  },
  referralContainer: {
    alignItems: 'center',
    marginTop: hp(3),
  },
  titleText: {
    fontSize: wp(3),
    color: '#fff',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    height: hp(5.5),
    width: wp(30),
    textAlign: 'center',
    borderRadius: 4,
    fontSize: wp(3),
    lineHeight: 12,
    marginRight: wp(3),
    marginTop: hp(2),
  },
  appButton: {
    backgroundColor: '#fff',
    height: hp(5.5),
    borderRadius: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  otpText: {
    fontSize: wp(3.5),
    color: '#333',
  },
  registerText: {
    fontSize: wp(3.5),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: hp(3),
  },
  signUp: {
    flexDirection: 'row',
    marginTop: hp(3),
  },
  signUpText: {
    color: '#fff',
    fontSize: wp(3.5),
  },
  signUpButton: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
});
