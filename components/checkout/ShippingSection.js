import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const ShippingOptions = ({ theme }) => (
  <Layout style={styles.container}>
    <Text category='s1'>Select Shipping</Text>
    <Layout style={styles.option}>
      <View style={styles.optionDetails}>
        <Text category='s1'>Standard Shipping</Text>
        <Text category='s1' style={{ color: theme['color-primary-default'] }}>UGX 10,000</Text>
      </View>
      <Text appearance='hint' category='c2'>Estimated arrival: 5 hours</Text>
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: { marginBottom: 24, gap: 5 },
  option: { padding: 10, borderWidth: 1, borderColor: 'rgb(228, 233, 242)', borderRadius: 5 },
  optionDetails: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default ShippingOptions;
