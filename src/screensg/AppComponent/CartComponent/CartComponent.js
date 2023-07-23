import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const spacing = 10;
const width = (Dimensions.get('window').width - 4 * 10) / 3;


export default CartScreen = props => {

  const {product, nav} = props;
  return (
  
      <FlatList
        style={{margin: 0}}
        data={product}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              nav.navigate('productscreen', {
                item,
              })
            }
            underlayColor="white">
            <View
              style={{
                width: width,
                margin: 10,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: 'white',
                paddingTop: 20,
                paddingBottom: 20,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={{flex: 1, height: 100, width: width - 20}}>
                <Image
                  source={{
                    uri:
                      item.featuredImage
                      }}
                  style={{
                    height: 100,
                    width: width - 20,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View style={{flex: 1.5, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'black',
                    padding: 10,
                  }}>
                  {item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
   
  );
};
