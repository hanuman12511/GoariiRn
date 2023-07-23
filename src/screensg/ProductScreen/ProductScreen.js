import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import Icon from 'react-native-vector-icons/FontAwesome';
// redux
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {KEYS, getData} from '../../api/UserPreference';

//component
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

class ProductScreen extends React.Component {
  name = this.props.route.params;

  constructor(props) {
    super(props);
    this.state = {
      itemproduct: props.route.params,

      name: '',
      brandname: '',
      rate: '',
      unit: '',
      desc: '',
      productImage: [],
      productId: '',
      quantity: 1,
      addonId: '',
    };
  }

  UNSAFE_componentWillMount() {
    const {itemproduct} = this.state;
    

    this.setState({
      name: itemproduct.item.name,
      brandname: itemproduct.item.brandName,
      rate: itemproduct.item.productAddons[0].price,
      unit: itemproduct.item.productAddons[0].name,
      desc: itemproduct.item.description,
      productImage: itemproduct.item.productImage,
      productId: itemproduct.item.id,
      addonId: itemproduct.item.productAddons[0].id,
    });
  }

  Sub = () => {
    const {quantity} = this.state;

    var count = quantity;
    console.log(count);

    if (count > 1) {
      count = count - 1;
    }
    this.setState({
      quantity: count,
    });
  };

  Add = () => {
    const {quantity} = this.state;
    var count = quantity;
    count = count + 1;
    this.setState({
      quantity: count,
    });
  };

  handleCart = async () => {
    const userInfo = await getData(KEYS.USER_INFO);

      if (userInfo !== null) {
      try {
        const params = {
          productId: this.state.productId,
          quantity: this.state.quantity,
          addonId: this.state.addonId,
        };

          await this.props.addToCart(params).then(async () => {
          const {success, message} = this.props.isItemAddSuccess;

          if (success) {
            const {cartItemCount} = this.props.isItemAddSuccess;
            await this.props.cartUpdate(cartItemCount);
            this.props.navigation.navigate('cart');

            const count = cartItemCount;

            // this.props.navigation.navigate('home', count);

            // Alert.alert('', message);
          } else {
            //Alert.alert('', message);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert(
        '',
        'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें',
        [
          {text: 'NO', style: 'cancel'},
          {text: 'LOGIN', onPress: this.handleLogin},
        ],
        {
          cancelable: false,
        },
      );
    }
  };
  handleLogin = async () => {
    this.props.navigation.navigate('login');
  };

  render() {
    const {
      name,
      brandname,
      rate,
      unit,
      desc,
      productImage,
      productId,
      quantity,
      addonId,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" उत्पाद"
          nav={this.props.navigation}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            marginTop: 150,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: '105%',
              borderRadius: 20,
              top: -130,
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.8,
              shadowRadius: 3,
              elevation: 20,
              shadowColor: '#52006A',
              borderColor: 'white',
            }}>
            <View style={{flex: 1}}>
              <SliderBox
                images={productImage}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: '90%',
                  marginTop: 0,
                  marginLeft: -36,
                }}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                dotColor="green"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                paginationBoxStyle={{
                  position: 'absolute',
                  bottom: 0,
                  padding: 0,

                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'rgba(128, 128, 128, 0.92)',
                }}
                imageLoadingColor="#2196F3"
              />
            </View>
            <View
              style={{
                flex: 1,
                margin: 0,
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                alignItems: 'center',
                marginTop: -160,

                backgroundColor: 'green',
              }}>
              <View
                style={{
                  margin: 0,
                  flexDirection: 'row',
                  width: '100%',
                  padding: 20,
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    color: 'white',
                    fontSize: 14,
                  }}>
                  {brandname}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    color: 'white',
                    fontSize: 14,
                  }}>
                  मात्रा
                  <Text style={{marginRight: 20}}>
                    {'    '}
                    {unit}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  margin: 0,
                  flexDirection: 'row',
                  width: '100%',
                  backgroundColor: 'white',
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,

                  elevation: 20,
                  shadowColor: '#52006A',
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    padding: 20,
                    color: 'green',
                    fontSize: 18,
                  }}>
                  {name}
                </Text>

                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    padding: 20,
                    color: 'green',
                    fontSize: 18,
                  }}>
                  ₹ {rate * this.state.quantity} /-
                </Text>
              </View>
              <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
                उत्पाद के बारे में
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 15,
                }}>
                {desc}
              </Text>
              <View
                style={{
                  width: '90%',
                  height: 30,
                  backgroundColor: 'white',
                  margin: 0,
                  borderRadius: 10,
                  opacity: 1,
                  position: 'absolute',
                  bottom: 40,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  flexDirection: 'row',
                  elevation: 20,
                  shadowColor: '#52006A',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 20,
                }}>
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 30,
                    fontSize: 18,
                    color: 'black',
                  }}>
                  इकाई
                </Text>
                <TouchableOpacity
                  onPress={this.Sub}
                  style={{
                    backgroundColor: 'green',
                    width: 30,
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <Text style={{fontSize: 23, color: 'white'}}>-</Text>
                </TouchableOpacity>

                <Text style={{width: 30, textAlign: 'center', fontSize: 20}}>
                  {this.state.quantity}
                </Text>
                <TouchableOpacity
                  onPress={this.Add}
                  style={{
                    backgroundColor: 'green',
                    width: 30,
                    alignItems: 'center',
                    borderRadius: 5,
                    marginRight: 20,
                  }}>
                  <Text style={{fontSize: 20, color: 'white'}}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                  onPress={this.handleCart}
                  style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  height: 60,
                  backgroundColor: 'green',
                  margin: 0,
                  borderRadius: 25,
                  position: 'absolute',
                  bottom: -30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.8,
                  shadowRadius: 3,
                  elevation: 20,
                  shadowColor: '#52006A',
                }}>
               
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                    Add To Cart
                  </Text>
                  <Icon
                    name="shopping-cart"
                    size={20}
                    color="white"
                    style={{marginLeft: 25}}
                  />
              
              </View>  </TouchableOpacity>
            </View>
          </View>
        </View>
      
        <FooterComponent nav={this.props.navigation} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isItemAddSuccess: cartSelectors.isItemAddSuccess(state),
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {
  addToCart: cartOperations.addToCart,
  cartUpdate: cartOperations.cartUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
