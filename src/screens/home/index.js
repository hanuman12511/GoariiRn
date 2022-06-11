import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  RefreshControl,
  BackHandler,
  ScrollView,
} from 'react-native';
//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from '../../data/redux/home';

import {KEYS, getData} from 'api/UserPreference';

class HomeScreen extends Component {

constructor(props){
  super(props);
  this.state = {
    isProcessing: true,
    isListRefreshing: false,
    images: [],
    formatted_address: '',
    details: '',
    foodProducts: [],
    foodProducts2: [],
    searchText: '',
  };

 

}

    componentDidMount() {
       
          this.homeData();
       console.log("-==============did==============mount-----------------")
       
       
      }

    homeData = async () => {


      console.log("===============home data==================")
        try {
          const userInfo = await getData(KEYS.USER_INFO);
          console.log("===============user info==================",userInfo)
         
          if (userInfo !== null) {
            const {id} = userInfo;
    
            var params = {userId: id};
          } else {
            var params = null;
            
          }
          await this.props.getHome(params);
          console.log("===============get home==================")
          const {success} = this.props.isGetHome;
          console.log("--------------",this.props.isGetHome)
          if (success) {
            const {sliders, product, details} = this.props.isGetHome;
            this.props.navigation.navigate('loginscreen')
            }


}catch(error){

   }
}


render(){
    return<Text>Home</Text>
}

}

const mapStateToProps = state => ({
    isGetHome: homeSelectors.isGetHome(state),
   
  });
  
  const mapDispatchToProps = {
    getHome: homeOperations.getHome,
   
  };
  export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);