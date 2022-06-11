import React, {useEffect, useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';
import {AppContext} from 'context_api/context';
//* AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS, getData, clearData} from 'api/UserPreference';

const CustDrawerPage = props => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 0,
        padding: 20,
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
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Icon name="close" color="red" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default CustDrawer = props => {
  const [userInfo, setInfo] = useState('');

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const userInfo = await getData(KEYS.USER_INFO);
      console.log(userInfo);
      // ...
    }
    fetchData();
  }, [userInfo]);

  const {signOut} = useContext(AppContext);

  const handleLogout = async () => {
    await clearData();
    console.log(props);
    await signOut();
    await AsyncStorage.clear();
  };
  console.log('drawer item', props);
  return (
    <View style={{flexGrow: 1}}>
      <CustDrawerPage {...props} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('profilescreen')}
        />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="लॉगआउट करे"
        onPress={() => {
          handleLogout();
        }}
        style={{backgroundColor: 'green', padding: 5, color: 'white'}}
        icon={() => <Icon name="home" color="white" size={20} />}
        labelStyle={{color: 'white'}}
      />
    </View>
  );
};
