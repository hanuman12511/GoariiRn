import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
import get from 'lodash/get';
/// redux
import {connect} from 'react-redux';
import {policiesOperations, policiesSelectors} from 'data/redux/policies';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

//web view

import {WebView} from 'react-native-webview';

class RefundRules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {terms: '', msg: ''};
  }

  componentDidMount() {
    this.termsCondition();
  }

  termsCondition = async () => {
    try {
      const params = null;
      await this.props.privacyPolicy(params).then(() => {
        if (this.props.isPrivacySuccess) {
          const {success, message} = this.props.isPrivacySuccess;
          if (success) {
            const {description} = this.props.isPrivacySuccess;

            this.setState({terms: description, msg: ''});
          } else {
            this.setState({terms: null, message});
          }
        }
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  redirectLogin = () => {
    this.props.navigation.pop();
  };
  render() {
    const {terms, message} = this.state;
    console.log('*******termsss*****', terms);
    return (
      <>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="कार्ट "
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <WebView source={{html: terms}} />
        <FooterComponent nav={this.props.navigation} />
        {this.state.isProcessing && <ProcessingLoader />}
      </>
    );
  }
}
const mapStateToProps = state => ({
  isPrivacySuccess: policiesSelectors.isCancelSuccess(state),
});
const mapDispatchToProps = {
  privacyPolicy: policiesOperations.cancelRefund,
};
export default connect(mapStateToProps, mapDispatchToProps)(RefundRules);
