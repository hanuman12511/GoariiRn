import React, {Component} from 'react';
import {View, Animated, StyleSheet, ImageBackground} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Images


export default class SplashScreen extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  handleAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const animatedImageStyle = [
      {
        opacity: this.state.opacity,
        transform: [
          {
            scale: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      },
      {
        width: 200,
        height: 200,
      },
    ];

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.Image
          source={{uri:'https://www.marathi.tv/wp-content/uploads/2020/03/Gauri-Name.png?ezimgfmt=ng%3Awebp%2Fngcb30%2Frs%3Adevice%2Frscb30-1'}}
          resizeMode="cover"
          onLoad={this.handleAnimation}
          style={animatedImageStyle}
        />
      </View>
    );
  }
}
