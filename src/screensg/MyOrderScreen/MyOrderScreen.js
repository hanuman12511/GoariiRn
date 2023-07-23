import React from 'react';
import {View, Text} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from 'data/redux/home';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

class MyOrderScreen extends React.Component {
  constructor(props) {
    super(props);

    ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);
  }

  componentDidMount() {}
  UNSALF_componentWillMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <>
        <View>
          <HeaderComponent
            navlogo="arrow-left"
            brandname="माई आर्डर"
            alert=""
            location=""
            bookmark=""
            nav={this.props.navigation}
          />
          <Text> WalletScreen</Text>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isGetHome: homeSelectors.isGetHome(state),
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {
  getHome: homeOperations.getHome,
  cartUpdate: cartOperations.cartUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrderScreen);
