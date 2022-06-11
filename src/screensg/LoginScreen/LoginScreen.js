import React, {useState} from 'react';
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
  SafeAreaView,
} from 'react-native';
//Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      mobile: '',
      referralCode: '',
    };
  }

  componentDidMount() {}
  UNSALF_componentWillMount() {}
  componentWillUnmount() {}

  onMobileChange = mobile => {
    this.setState({mobile});
  };

  handleNext = async () => {
    const {mobile} = this.state;
    this.setState({isProcessing: true});
    const params = {
      mobile,
    };
    await this.props.loginUser(params).then(() => {
      const {success, message} = this.props.isLoginSuccess;
      if (success) {
        this.setState({isProcessing: false});
        this.props.navigation.navigate('OTP', {mobile});
      } else {
        this.setState({isProcessing: false});
      }
    });
  };

  handleSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <View>
            <Text>हम इस नंबर पर एक पुष्टिकरण कोड के साथ एक एसएमएस भेजेंगे</Text>
            <View>
              <View>
                <TextInput
                  // placeholder="Ender your Phone Number"
                  value="+91"
                  placeholderTextColor="#fff"
                />

                <TextInput
                  placeholder="फ़ोन नंबर डाले"
                  placeholderTextColor="black"
                  maxLength={10}
                  keyboardType="numeric"
                  value={this.state.mobile}
                  onChangeText={this.onMobileChange}
                  style={{
                    padding: 20,
                    marginTop: 20,
                    alignItems: 'center',
                    borderWidth: 2,
                  }}
                />
              </View>

              <TouchableHighlight
                onPress={this.handleNext}
                style={{
                  backgroundColor: 'green',
                  padding: 20,
                  marginTop: 20,
                  alignItems: 'center',
                }}
                underlayColor="#ffffff80">
                <Text style={{color: 'white', fontSize: 20}}>लॉगिन करे</Text>
              </TouchableHighlight>

              <TouchableOpacity
                onPress={this.handleSignUp}
                style={{
                  backgroundColor: 'green',
                  padding: 20,
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 20}}>रजिस्टर करे</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
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
