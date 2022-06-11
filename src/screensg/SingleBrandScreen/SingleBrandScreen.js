import React from 'react';
import {View, Text} from 'react-native';
import ignoreWarnings from 'ignore-warnings';

//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from 'data/redux/home';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {KEYS, getData} from 'api/UserPreference';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

class SingleBrandScreen extends React.Component {
  constructor(props) {
    super(props);

    ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);

    const bname = this.props.route.params;
    console.log(bname);

    this.state = {
      brandname: [],
      bn: bname,
    };
  }

  componentDidMount() {
    this.homeData();
  }
  UNSALF_componentWillMount() {}
  componentWillUnmount() {}

  homeData = async () => {
    try {
      const userInfo = await getData(KEYS.USER_INFO);

      if (userInfo !== null) {
        const {id} = userInfo;
        var params = {userId: id};
      } else {
        var params = null;
      }

      await this.props.getHome(params);
      const {success} = this.props.isGetHome;

      if (success) {
        const {sliders, product, details} = this.props.isGetHome;

        this.setState({
          images: sliders,
          foodProducts: product,
        });

        this.BrandData(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  BrandData = product => {
    const {brandname, bn} = this.state;
    console.log('brand product==', product.length);
    var i = 0;
    var n = product.length;

    console.log('======', bn);
    while (i < n) {
      /*  console.log('brandname[', i, ']=', product[i].brandName); */
      if (bn == product[i].brandName) {
        console.log('brandname[', i, ']=', product[i].brandName);
        brandname.push(product[i]);
      }
      i++;
    }

    console.log(brandname);
  };

  render() {
    return (
      <>
        <View>
          <Text> WalletScreen</Text>
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleBrandScreen);
