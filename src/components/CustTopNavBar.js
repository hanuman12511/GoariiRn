import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustTopNavBar = props => {
  return (
    <View>
      <Text onPress={() => props.navigation.navigate('complate')}>
        Top Nav Bar
      </Text>
      <Text onPress={() => props.navigation.navigate('cancled')}>
        Top Nav Bar cancled
      </Text>
    </View>
  );
};
