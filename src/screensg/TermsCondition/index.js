import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';
import {policiesOperations, policiesSelectors} from 'data/redux/policies';
import {WebView} from 'react-native-webview';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

class PrivacyPolicies extends React.Component {
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
        console.log('tremsc===', this.props);
        if (this.props.isPrivacySuccess) {
          console.log('tremsc===', this.props);
          const {success, message} = this.props.isPrivacySuccess;
          if (success) {
            const {description} = this.props.isPrivacySuccess;
            console.log('description======', description);
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

    console.log('terms=', terms);
    return (
      <>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="नियम एवं शर्तें"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <Text style={{backgroundColor: 'green', padding: 20, color: 'white'}}>
          {'     '}
          नियम एवं शर्तें
        </Text>
        {terms ? (
          <WebView source={{html: terms}} />
        ) : (
          <Text>नियम एवं शर्तें{message}</Text>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isPrivacySuccess: policiesSelectors.isTermsSuccess(state),
});
const mapDispatchToProps = {
  privacyPolicy: policiesOperations.termsCondition,
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicies);
