import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
//Redux
import {connect} from 'react-redux';
import {appOperations, appSelectors} from 'data/redux/app';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

class ContactScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactInformation: '',
      message: '',
    };
  }

  componentDidMount() {
    this.handleContactInfo();
  }

  async UNSAFE_componentWillMount() {
    this.handleContactInfo();
  }

  componentWillUnmount() {
    this._subscribe;
  }

  handleContactInfo = async () => {
    const params = null;
    await this.props.contactInfo(params).then(() => {
      const {success, message} = this.props.isContactInfo;
      alert(success);
      if (success) {
        const {contactInformation} = this.props.isContactInfo;
        this.setState({contactInformation});
        alert(contactInformation);
      } else {
      }
    });
  };

  renderItem = ({item}) => (
    <OrderListComponent
      item={item}
      nav={this.props.navigation}
      refreshCallback={this.fetchMyOrders}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View />;

  handleCheckout = () => {
    this.props.navigation.push('AddAddress');
  };

  handleOnCall = value => {
    console.log('value', value);
    Linking.openURL(`tel:${value}`);
  };
  handleWhatsAppChat = value => {
    console.log('value', value);

    let url = 'whatsapp://send?text=' + 'नमस्ते' + '&phone=91' + value;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };

  render() {
    const {
      accountName,
      accountNumber,
      address1,
      address2,
      address3,
      bankName,
      branch,
      contactEmail,
      factoryAddress,
      helplineNumber,
      ifsc,
      pincode1,
      pincode2,
      pincode3,
      registerAddress,
      smsMobile,
    } = this.state.contactInformation;
    return (
      <SafeAreaView>
        <HeaderComponent
          navlogo="arrow-left"
          brandname="सम्पर्क करे "
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        {this.state.contactInformation !== '' ? (
          <ScrollView>
            <View>
              <Text>संपर्क जानकारी</Text>
              <View>
                <View>
                  <Text>हेल्पलाइन नंबर</Text>
                  <View>
                    <Text onPress={() => this.handleOnCall(helplineNumber)}>
                      {helplineNumber}
                    </Text>
                  </View>
                </View>

                <View />

                <View>
                  <Text>ईमेल आईडी</Text>
                  <View>
                    <Text>{contactEmail}</Text>
                  </View>
                </View>

                <View />

                <View>
                  <Text>फैक्ट्री का पता</Text>
                  <View>
                    <Text>{factoryAddress}</Text>
                  </View>
                </View>

                <View />

                <View>
                  <Text>Registered Address</Text>
                  <View>
                    <Text>{registerAddress}</Text>
                  </View>
                </View>

                <View />

                <View>
                  <Text>व्हाट्स एप</Text>
                  <View>
                    <Text onPress={() => this.handleWhatsAppChat(smsMobile)}>
                      {smsMobile}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <Text>पिन कोड द्वारा क्षेत्र का स्थान</Text>
              <View>
                <View>
                  <View>
                    {/* <Image
                    source={ic_location_drawer}
                    resizeMode="cover"
                    style={styles.contactIcons2}
                  /> */}
                    <Text>
                      <Text>पता: </Text>
                      {address1}
                    </Text>
                  </View>
                  <Text>पिन कोड: {pincode1}</Text>
                </View>

                <View />

                <View>
                  <View>
                    <Text>
                      <Text>Address: </Text>
                      {address2}
                    </Text>
                  </View>
                  <Text>पिन कोड: {pincode2}</Text>
                </View>

                <View />

                <View>
                  <View>
                    <Text>
                      <Text>पता: </Text>
                      {address3}
                    </Text>
                  </View>
                  <Text>पिन कोड: {pincode3}</Text>
                </View>
              </View>
            </View>

            <View>
              <Text>बैंक विवरण</Text>
              <View>
                <Text>
                  <Text>खाता नाम: </Text>
                  {accountName}
                </Text>
                <Text sty>
                  <Text>बैंक का नाम: </Text>
                  {bankName}
                </Text>
                <Text>
                  <Text>खाता संख्या: </Text>
                  {accountNumber}
                </Text>
                <Text>
                  <Text>आईएफएससी (IFSC) कोड: </Text>
                  {ifsc}
                </Text>
                <Text>
                  <Text>ब्रांच: </Text>
                  {branch}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View>
            <Text>{this.state.message}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isContactInfo: appSelectors.isContactInfo(state),
});
const mapDispatchToProps = {
  contactInfo: appOperations.contactInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
