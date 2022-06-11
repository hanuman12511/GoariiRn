import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default Web = () => {
  const data =
    "<style>.h1{color:blue}</style><h1 class='h1'>hello programming</h1>";
  return (
    <>
      <WebView source={{html: data}} />
    </>
  );
};
