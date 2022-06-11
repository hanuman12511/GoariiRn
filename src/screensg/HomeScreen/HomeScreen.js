import React from 'react';
import {View, Text, SafeAreaView, BackHandler} from 'react-native';
import ignoreWarnings from 'ignore-warnings';

//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from 'data/redux/home';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {KEYS, getData} from 'api/UserPreference';
import HeaderTop from '../AppComponent/HeaderComponent';
import BrandComponent from '../AppComponent/BrandComponent';
import SearchComponent from '../AppComponent/SearchComponent';
import CategaryComponent from '../AppComponent/CategaryComponent';
import SliderComponent from '../AppComponent/SliderComponent';
import {ScrollView} from 'react-native-gesture-handler';

import CartComponent from '../AppComponent/CartComponent';
import FooterComponent from '../AppComponent/FooterComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import {tapGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);
    const count = this.props.route.params;

    this.state = {
      isProcessing: true,
      isListRefreshing: false,
      images: [],
      formatted_address: '',
      details: '',
      foodProducts: [],
      foodProducts2: [],
      searchText: '',
    };
  }
  componentDidMount() {
    this.homeData();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }
  UNSALF_componentWillMount() {}
  componentWillUnmount() {}
  componentWillUnmount() {
    this._subscribe;
    this.backHandler.remove();
  }

  backAction = () => {
    Alert.alert('रुको!', 'क्या आप वाकई वापस जाना चाहते हैं?', [
      {
        text: 'वापस लेना',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'हां', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.checkLocationPermission();
      this.homeData();
    } catch (error) {
      console.log(error.message);
    }
  };

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
        const {cartItemCount} = details;
        // alert(cartItemCount);
        await this.props.cartUpdate(cartItemCount);
        this.setState({
          details,
          images: sliders,
          foodProducts: product,
          foodProducts2: product,
          isProcessing: false,
          isListRefreshing: false,
        });
      } else {
        this.setState({
          images: [],
          foodProducts: [],
          isProcessing: false,
          isListRefreshing: false,
        });

        this.SliderImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  SliderImage = () => {
    const {slider, images} = this.state;
  };

  /*   fooder = props => {
    console.log('footer props  home', props);
    return <FooterComponent nav={props} />;
  };
 */
  render() {
    // const {foodProducts, images, nImage} = this.state;
    let image = [];
    let nImage = [];
    const {images} = this.state;
    const {foodProducts} = this.state;

    /*    console.log(
      '*************home page images slide*******\n',
      this.state,
      '\n*****************************************', 
    );*/
    if (images !== undefined) {
      images.forEach(img => {
        image.push(Object.values(img));
      });
      image.forEach(ig => {
        ig.map(val => {
          nImage.push(val);
        });
      });
    }

    return (
      <View style={{flex: 1}}>
        <View style={{}}>
          <HeaderTop
            navlogo="navicon"
            brandname="Vidyadhar NagarJaipur, Rajasthan 302032
            "
            alert=""
            location="map-marker"
            bookmark="bell"
            nav={this.props.navigation}
          />
        </View>
        <View style={{height: 70}}>
          <BrandComponent logo="" brandname="GaouriBrand" />
        </View>
        {/*  <View style={{flex: 1}}>
            <SearchComponent />
          </View> */}
        {/*  <View style={{flex: 1}}>
            <CategaryComponent
              product={foodProducts}
              nav={this.props.navigation}
            />
    </View> */}

        <View style={{}}>
          <SliderComponent sliders={nImage} />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <Text
            style={{
              flex: 1,
              padding: 20,
              color: 'black',
              backgroundColor: 'white',
              fontSize: 20,
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'black',
                borderRadius: 40,
              }}></View>
            {'   '}
            केटेगरी
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CartComponent product={foodProducts} nav={this.props.navigation} />
        </View>
        <FooterComponent nav={this.props.navigation} />
        {this.state.isProcessing && <ProcessingLoader />}
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
