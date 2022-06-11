import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const OfferList = props => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.heading}>{props.item.code}</Text>
      <Text style={styles.Description}>{props.item.description}</Text>
      <Text style={styles.Description}>{props.item.validTill}</Text>
    </View>
  );
};

export default OfferList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
  },
  heading: {
    fontWeight: '700',
  },
  Description: {},
});
