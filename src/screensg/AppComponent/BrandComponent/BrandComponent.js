import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default BrandComponent = props => {
  console.log('brand', props);

  return (
    <View
      style={{
        backgroundColor: 'green',
        marginTop: 0,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={{}}>
          <Icon
            name={props.logo}
            color="white"
            size={20}
            style={{textAlign: 'left', marginLeft: 20}}
          />
        </TouchableOpacity>
        <Text>{'          '}</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            width: '65%',
          }}>
          {props.brandname} {'             '}
        </Text>
        {/* <TouchableOpacity onPress={() => {}} style={{}}>
          <Icon
            name="search"
            color="white"
            size={20}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
