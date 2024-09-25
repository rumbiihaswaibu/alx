import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View } from 'react-native';
import { Layout, Text, Card, useTheme, Button } from '@ui-kitten/components';
import { Flashlight, Heart, Lightning } from 'phosphor-react-native';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';

const FlashSale = () => {
  // Dummy flash sale products
  const theme = useTheme()
  const flashSaleProducts = [
    { id: 1, title: 'Chocolate Cake', discount: 40, image: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Donut Box', discount: 25, image: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Cookies Pack', discount: 30, image: 'https://via.placeholder.com/100' },
    { id: 4, title: 'Cupcake', discount: 35, image: 'https://via.placeholder.com/100' },
    { id: 5, title: 'Pastry', discount: 50, image: 'https://via.placeholder.com/100' },
  ];

  const expiryDate = '2024-10-01T23:59:59'; // Replace with actual expiry date

  // Countdown Timer Logic
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Render a product card for each product in the flash sale
  const renderProduct = (product) => (
    <View key={product.id} style={{ width: 115, paddingVertical: 0, paddingHorizontal: 4, borderRadius: 3 }}>
      <Image source={{ uri: product.image }} style={{ height: 100,borderRadius: 5, width: '100%' }} />
      <View style={{ flexDirection: 'row', gap: 1 }}>
        {/* <Lightning weight='fill' color={theme['color-primary-default']} size={13} /> */}
        <Text style={{ fontSize: 12, color: theme['color-primary-default'], fontWeight: 'bold' }}> UGX {product.discount}.00000</Text>
      </View>
    </View>
  );

  return (
    <Layout style={{ marginVertical: 10 }}>
      {/* Flash Sale Header with Countdown */}
      <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', marginBottom: 10, gap: 5 }}>
          <View
            style={{ padding: 4, borderRadius: 10, marginLeft: 3, backgroundColor: theme['color-primary-default'] }}
          >
            <Lightning color="white" weight='fill' size={16} />
          </View>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}> Flash Sale</Text>
        </View>
        <Text category="label">
          {`${timeLeft.hours || '00'}:${timeLeft.minutes || '00'}:${timeLeft.seconds || '00'}`}
        </Text>
      </Layout>

      {/* Horizontal Scrollable Products */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {flashSaleProducts.map((product) => renderProduct(product))}
      </ScrollView>
    </Layout >
  );
};

export default FlashSale;
