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
import {flatlist} from '../../../utils/hotelinfo/Data';
const spacing = 10;
const width = (Dimensions.get('window').width - 4 * 10) / 3;
import FooterComponent from '../FooterComponent';

export default CartScreen = props => {
  const [menucolor, setMenuColor] = useState(1);

  const {product, nav} = props;

  const footer = props => {
    console.log('footer props', props);
    /* return <FooterComponent nav={props} />; */
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Home')}></TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        style={{margin: 0}}
        data={product}
        keyExtractor={item => item.id}
        numColumns={3}
        /*  ListFooterComponent={footer} */
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
                      item.image !== null
                        ? item.featuredImage
                        : 'https://www.vlchelp.com/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
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
                {/*    <Text style={{fontSize: 12, marginTop: 10, marginBottom: 10}}>
                  {item.brandName}
                </Text>
 */}
                {/*   <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="star" size={15} color="gold" />
                  <Text style={{marginLeft: 5, color: 'green'}}>
                    {item.rate}
                  </Text>
                  <Text style={{marginLeft: 5, fontSize: 10}}>
                    ({item.review} reviews)
                  </Text>
                </View> */}
              </View>
              {/*  <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'green',
                  }}>
                  Rs.
                  {item.productAddons[0].price}/-
                </Text>
                <Text style={{fontSize: 14, marginTop: 0, fontWeight: 'bold'}}>
                  {' '}
                  {item.productAddons[0].name}
                </Text>
                <Icon
                  name="bookmark"
                  size={15}
                  color="green"
                  style={{marginTop: 10}}
                />
              </View> */}
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
