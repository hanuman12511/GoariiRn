import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import ignoreWarnings from 'ignore-warnings';

import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
//Redux
import {connect} from 'react-redux';
import {policiesOperations, policiesSelectors} from 'data/redux/policies';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

//web view
import {WebView} from 'react-native-webview';
class ConfidentialPolicy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {terms: ''};
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
            this.setState({terms: description});
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

    console.log('condi polu', terms);
    return (
      <>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="गोपनीयता पालिसी"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />

        <Text style={{backgroundColor: 'green', padding: 20, color: 'white'}}>
          {' '}
          गोपनीयता पालिसी{' '}
        </Text>
        {terms ? (
          <WebView source={{html: terms}} scalesPageToFit={true} />
        ) : (
          <Text>{message}</Text>
        )}
        {/* <TouchableOpacity
          style={styles.agreeButton}
          onPress={this.redirectLogin}>
          <Text style={styles.agreeText}>I Agree</Text>
        </TouchableOpacity> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isPrivacySuccess: policiesSelectors.isPrivacySuccess(state),
});
const mapDispatchToProps = {
  privacyPolicy: policiesOperations.privacyPolicy,
};
export default connect(mapStateToProps, mapDispatchToProps)(ConfidentialPolicy);
