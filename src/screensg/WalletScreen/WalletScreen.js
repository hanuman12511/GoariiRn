import React from 'react';
import {View, Text,SafeAreaView,FlatList,TouchableHighlight,Image} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

//component

import {walletOperations, walletSelectors} from 'data/redux/wallet';
import get from 'loadsh/get';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';

class WalletScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: true,
      walletBalance: 0,
      minimum_recharge_amount: 0,
      income: '',
      message: '',
      walletTransaction: [
        {
          title: 'बिनोला खली',
        },
        {
          title: 'बिनोला खली',
        },
      ],
    };
    ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);
  }

  componentDidMount() {
   // this._subscribe = this.navi('focus', async () => {
      this.showWalletIncome();
   // });
  }

  // // 'didFocus'
  // UNSAFE_componentWillMount = async () => {};

  componentWillUnmount() {
   // this._subscribe();
  }

  showWalletIncome = async () => {
    const params = null;
    await this.props.walletIncome(params).then(() => {
      const {success, message} = this.props.isWalletIncome;
      if (success) {
        const {income, wallet} = this.props.isWalletIncome;
        this.setState({walletBalance: wallet, income, isProcessing: false});
      } else {
        this.setState({
          walletBalance: 0,
          income: '',
          message,
          isProcessing: false,
        });
      }
    });
  };
  renderItem = ({item}) => (
    <WalletListItemComponents item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View  />;

  // handleAddWalletAmount = () => {
  //   const {minimum_recharge_amount} = this.state;
  //   const miniAmount = minimum_recharge_amount;
  //   this.props.navigation.navigate('Recharge Wallet', {miniAmount});
  // };

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
      
 <HeaderComponent
          navlogo="arrow-left"
          brandname="वॉलेट "
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <View>
          <View >
            
            <Text >वॉलेट राशि</Text>
            <Text >
              ₹ {this.state.walletBalance}
            </Text>
          </View>
          {this.state.income !== '' ? (
            <View >
              <FlatList
                data={this.state.income}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.itemSeparator}
               
              />
            </View>
          ) : (
            <View >
              <Text>{this.state.message}</Text>
            </View>
          )}
        </View>

        <TouchableHighlight
          onPress={this.handleAddWalletAmount}
          underlayColor="transparent"
          style={{backgroundColor:'white',padding:20}}
         >
          <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6SnClEhR5ndutU5om79vpHXCp8Jko65fWQ&usqp=CAU'}} resizeMode="cover" />
        </TouchableHighlight> 
        {this.state.isProcessing && <ProcessingLoader />}
        <FooterComponent nav={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isWalletIncome: walletSelectors.isWalletIncome(state),
});
const mapDispatchToProps = {
  walletIncome: walletOperations.walletIncome,
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
