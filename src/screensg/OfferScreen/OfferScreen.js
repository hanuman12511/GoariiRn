import React from 'react';
import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';
import {walletOperations, walletSelectors} from 'data/redux/wallet';
import OfferLst from '../AppComponent/OfferLst/OfferList';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

class OfferScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: true,
      isListRefreshing: false,
      coupons: '',
      offers: [
        {
          title: 'बिनोला खली',
        },
        {
          title: 'मोटा काकड़ा',
        },
      ],
    };
  }

  componentDidMount() {
    this.handleCouponsData();
  }
  handleCouponsData = async () => {
    const params = null;
    await this.props.viewCoupons(params).then(() => {
      const {success, message} = this.props.isCouponList;
      console.log('===============props offfsrenn +++', this.props);

      if (success) {
        const {coupons} = this.props.isCouponList;
        this.setState({coupons, isListRefreshing: false, isProcessing: false});
      } else {
        this.setState({
          coupons: '',
          message,
          isListRefreshing: false,
          isProcessing: false,
        });
      }
    });
  };

  renderItem = ({item}) => <OfferLst item={item} nav={this.props.navigation} />;

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <SafeAreaView>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="ऑफर्स "
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        {this.state.coupons !== '' ? (
          <FlatList
            data={this.state.coupons}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.itemSeparator}
          />
        ) : (
          <ScrollView>
            <Text>{this.state.message}</Text>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isCouponList: walletSelectors.isCouponList(state),
});

const mapDispatchToProps = {
  viewCoupons: walletOperations.viewCoupons,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferScreen);
