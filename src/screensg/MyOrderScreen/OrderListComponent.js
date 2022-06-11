import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const categoryList = props => {
  const {item, nav, refreshCallback} = props;
  
  const {image} = item;

  const handleOrderDetail = data => {
    const orderDetail = data;
    props.nav.navigate('Order Detail', {orderDetail});
  };

  return (
    <View>
      <Text >{props.item.orderDate}</Text>
      <Text>{props.item.delivery_date}</Text>

      <View >
      
        <Text >{props.item.tagline}</Text>
      </View>
      <View >
        {props.item.product !== null ? (
          <Image
            source={{uri: props.item.product[0].featuredImage}}
            resizeMode="cover"
           
          />
        ) : null}

        <View >
          <View >
            {props.item.product !== null ? (
              <Text>
                {props.item.product[0].productName}
              </Text>
            ) : null}
            <Text >
              ₹ {props.item.subtotal}
            </Text>
          </View>
          <View >
            <Text >पहुंचाने का शुल्क</Text>
            <Text >
              {props.item.delivery_charges}
            </Text>
          </View>
          <View >
            <Text>आर्डर ID</Text>
            <Text > {props.item.orderId}</Text>
          </View>
          <View >
            <Image
              source={props.item.statusIcon}
              resizeMode="cover"
             
            />
            <Text>{props.item.status}</Text>
          </View>
        </View>
      </View>

      <View >
        <Text >अंतिम भुगतान राशि</Text>
        <Text >
          ₹ {props.item.totalAmount}
        </Text>
      </View>

      <TouchableHighlight
        underlayColor="#0b8457"
        onPress={() => handleOrderDetail(props.item)}
        style={{backgroundColor:'green',padding:20,marginTop:10}}
       >
        <Text>विवरण देखे</Text>
      </TouchableHighlight>
    </View>
  );
};

export default categoryList;
