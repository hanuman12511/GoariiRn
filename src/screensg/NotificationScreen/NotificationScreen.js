import React from 'react';
import {View, Text, SafeAreaView,FlatList} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';
import {appOperations, appSelectors} from 'data/redux/app';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isListRefreshing: false,
      notifications: '',
      message: '',
    };
  }

  componentDidMount() {
    this.handleNotifications();
  }
  handleNotifications = async () => {
    const params = null;
    await this.props.getNotification(params).then(async () => {
      const {success, message} = this.props.isNotificationGet;

      if (success) {
        const {notifications} = this.props.isNotificationGet;
console.log("not===",notifications)
        this.setState({
          notifications,
          isListRefreshing: false,
          isLoading: false,
        });
        await this.props.resetCount(params);
      } else {
        this.setState({notifications: '', message});
      }
    });
  };
  UNSALF_componentWillMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <SafeAreaView>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="नोटिफिकेशन "
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <Text>नोटिफिकेशन </Text>
        {this.state.notifications !== '' ? (
          <FlatList
            data={this.state.notifications}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
           
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        ) : (
          <View>
            <Text>{this.state.message}</Text>
          </View>
        )}
          {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isNotificationGet: appSelectors.isNotificationGet(state),
  isNotificationReset: appSelectors.isNotificationReset(state),
});
const mapDispatchToProps = {
  getNotification: appOperations.getNotification,
  resetCount: appOperations.resetCount,
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
