import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import hlogo from '../asset/logo/hlogo.webp';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ongoingbook from '../screens/HomeScreen/hotelmenu/HotelBook/Ongoingbook';
import Completedbook from '../screens/HomeScreen/hotelmenu/HotelBook/Completedbook';
import Cancledbook from '../screens/HomeScreen/hotelmenu/HotelBook/Cancledbook';

//import CustTopNavBar from './CustTopNavBar';
const Top = createMaterialTopTabNavigator();

const CustTopNavBar = props => {
  return (
    <>
      <View
        style={{
          backgroundColor: 'green',
          marginTop: 0,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity /* onPress={() => navigation.openDrawer()} */>
            <Image source={hlogo} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: 'white', fontSize: 20, marginLeft: 20}}>
            My Booking
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
          <Icon
            name="search"
            color="white"
            size={20}
            style={{textAlign: 'right', marginLeft: 20}}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          onPress={() => props.navigation.navigate('ongoing')}
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            padding: 15,
            textAlign: 'center',
            borderColor: 'green',
            color: 'green',
            margin: 8,
          }}>
          Ongoing
        </Text>

        <Text
          onPress={() => props.navigation.navigate('complate')}
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            padding: 15,
            textAlign: 'center',
            borderColor: 'green',
            color: 'green',
            margin: 8,
          }}>
          Complated
        </Text>
        <Text
          onPress={() => props.navigation.navigate('cancled')}
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: 1,
            padding: 15,
            textAlign: 'center',
            borderColor: 'green',
            color: 'green',
            margin: 8,
          }}>
          Cancled
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: 5,
          backgroundColor: 'green',
          marginLeft: '10%',
          borderRadius: 100,
        }}></View>
    </>
  );
};

export default TopNav = () => {
  return (
    <Top.Navigator tabBar={props => <CustTopNavBar {...props} />}>
      <Top.Screen name="ongoing" component={Ongoingbook} />
      <Top.Screen name="complate" component={Completedbook} />
      <Top.Screen name="cancled" component={Cancledbook} />
    </Top.Navigator>
  );
};
