import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';

const CustDrawerPage = props => {
  return (
    <View
      style={{
        height: 200,
        flexDirection: 'row',
        margin: 0,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'green',
      }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Icon name="home" color="white" size={20} />
        <Text style={{marginLeft: 20, fontSize: 18, color: 'white'}}>
          GrouriBrand
        </Text>
      </View>
      <TouchableOpacity
        style={{marginRight: 30}}
        onPress={() => props.navigation.closeDrawer()}>
        <Icon name="close" color="red" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default CustDrawer = props => {
  console.log('drawer item', props);
  return (
    <View style={{flexGrow: 1}}>
      <CustDrawerPage {...props} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="लॉगिन करे"
        onPress={() => props.navigation.navigate('login')}
        style={{backgroundColor: 'green', padding: 5}}
        icon={() => <Icon name="" color="white" size={20} />}
        labelStyle={{color: 'white'}}
      />
    </View>
  );
};
