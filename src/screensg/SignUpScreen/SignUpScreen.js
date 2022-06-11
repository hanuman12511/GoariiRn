import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

// validation

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      place: '',
      VName: '',
      mobile: '',
      catleCount: '',
      mQty: '',
      refCode: '',
    };
  }

  onChangeName = name => {
    this.setState({name: name});
  };
  onChangePlace = place => {
    this.setState({place: place});
  };
  onChangeVName = VName => {
    this.setState({VName: VName});
  };
  onChangeMobile = mobile => {
    this.setState({mobile: mobile});
  };
  onChangeCCount = catleCount => {
    this.setState({catleCount: catleCount});
  };
  onChangeMQty = mQty => {
    this.setState({mQty: mQty});
  };
  onReferralCode = refCode => {
    this.setState({refCode: refCode});
  };

  handleHome = async () => {
    const {name, place, VName, mobile, catleCount, mQty, refCode} = this.state;

    console.log('user info mation', this.state);

    const params = {
      name,
      address: place,
      villageName: VName,
      mobile,
      animalCount: catleCount,
      milkQuantity: mQty,
      referralCode: refCode,
    };
    await this.props.registerUser(params).then(() => {
      const {success, message} = this.props.isRegisterSuccess;
      console.log('this.props.isRegisterSuccess', this.props.isRegisterSuccess);

      alert(success);
      if (success) {
        this.props.navigation.navigate('login');
      } else {
        console.log('error while registration');
      }
    });
  };

  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{backgroundColor: 'green', padding: 20, color: 'white'}}>
            रजिस्ट्रेशन फॉर्म
          </Text>

          <TextInput
            placeholder="नाम"
            placeholderTextColor="#666"
            value={this.state.name}
            onChangeText={this.onChangeName}
            style={{borderWidth: 1, marginTop: 10}}
          />

          <TextInput
            placeholder="जगह"
            placeholderTextColor="#666"
            value={this.state.place}
            onChangeText={this.onChangePlace}
            style={{borderWidth: 1, marginTop: 10}}
          />
          <TextInput
            placeholder="गांव का नाम"
            placeholderTextColor="#666"
            value={this.state.VName}
            onChangeText={this.onChangeVName}
            style={{borderWidth: 1, marginTop: 10}}
          />
          <TextInput
            placeholder="मोबाइल नंबर"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            maxLength={10}
            value={this.state.mobile}
            onChangeText={this.onChangeMobile}
            style={{borderWidth: 1, marginTop: 10}}
          />
          <TextInput
            placeholder="पशुओ की संख्या"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            maxLength={4}
            value={this.state.catleCount}
            onChangeText={this.onChangeCCount}
            style={{borderWidth: 1, marginTop: 10}}
          />
          <TextInput
            placeholder="रोज का दूध का उत्पाद"
            keyboardType="phone-pad"
            value={this.state.mQty}
            maxLength={4}
            onChangeText={this.onChangeMQty}
            placeholderTextColor="#666"
            style={{borderWidth: 1, marginTop: 10}}
          />
          <TextInput
            placeholder="रेफरल कोड यदि आपके पास है"
            keyboardType="phone-pad"
            value={this.state.refCode}
            maxLength={6}
            onChangeText={this.onReferralCode}
            placeholderTextColor="#666"
            style={{borderWidth: 1, marginTop: 10}}
          />

          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              padding: 20,
              alignItems: 'center',
            }}
            onPress={this.handleHome}>
            <Text style={{color: 'white', fontSize: 20}}>रजिस्टर करे</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.isProcessing && <ProcessingLoader />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isRegisterSuccess: authSelectors.isRegisterSuccess(state),
});
const mapDispatchToProps = {
  registerUser: authOperations.registerUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
