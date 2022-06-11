import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default SearchComponent = props => {
  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: 'row',
          backgroundColor: '#DDDDDD',
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <Icon name="search" color="white" size={20} style={{marginLeft: 10}} />
        <TextInput placeholder="search" style={{width: 240, marginLeft: 10}} />
        <Icon name="sliders" color="green" size={20} style={{marginLeft: 20}} />
      </View>
    </>
  );
};
