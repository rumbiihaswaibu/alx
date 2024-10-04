import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';

const OrderItems = ({ cartItems, theme }) => {
  return <Layout style={[styles.container,{ borderColor: theme['color-basic-400'] }]}>
    <Text category='s1'>Order Items</Text>
    {cartItems.map((item) => (
      <Layout style={styles.card} key={item.id}>
        <View style={styles.productContainer}>
          <Image
            source={item.imageUrl?{ uri: item.imageUrl}:require('../../assets/placeholder.png')}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text category='s1' numberOfLines={1}>{item.title}</Text>
            {item.selectedColor && (
              <Text appearance='hint'>{`Color: ${item.selectedColor.colorName}`}</Text>
            )}
            {item.selectedSize && (
              <Text appearance='hint'>{`Size: ${item.selectedSize}`}</Text>
            )}
            <Text category='s1' style={{ ...styles.productPrice, color: theme['color-primary-default'] }}>
              UGX {item.price.toLocaleString()} <Text style={{fontWeight:'bold'}} category='s1'>X {item.quantity}</Text>
            </Text>
          </View>
        </View>
      </Layout>
    ))}
  </Layout>
};

const styles = StyleSheet.create({
  container: { gap: 10, borderBottomWidth:15, padding:15 },
  card: { padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'rgb(228, 233, 242)' },
  productContainer: { flexDirection: 'row', alignItems: 'center' },
  productImage: { width: 75, height: 75, marginRight: 16, borderRadius: 5 },
  productInfo: { flex: 1 },
  productPrice: { marginTop: 8, fontWeight: 'bold' },
});

export default OrderItems;
