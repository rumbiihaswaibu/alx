import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout, Text, Button, TopNavigation, TopNavigationAction, Spinner, useTheme } from '@ui-kitten/components';
import { Heart, ShoppingCart, Star, Check } from 'phosphor-react-native';
import { useGetProductQuery } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter()
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const { data, isLoading } = useGetProductQuery(id, {
    skip: !id,
  });

  const product = data?.data;
  const images = product?.files.map(file => ({ uri: file.url })) || [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, selectedColor, selectedSize }));
  };

  const CartIconWithBadge = () => (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View style={styles.cartIconContainer}>
        <ShoppingCart size={24} color={theme['color-primary-500']} />
        {cartCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <Layout style={styles.loadingContainer}>
        <Spinner size="large" />
      </Layout>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Product Details',
          headerRight: () => <TopNavigationAction icon={CartIconWithBadge} />,
        }}
      />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Layout style={styles.content}>
          <View style={styles.infoCard}>
            <View style={{ flexGrow: 1 }}>
              <Text category='h6' style={styles.productTitle}>{product?.title} </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.soldText}>{product?.sold} sold</Text>
                <Star size={16} color="#FFD700" weight="fill" />
                <Text> 4.9</Text>
              </View>
            </View>
            <TouchableOpacity style={{ width: 25 }}>
              <Heart />
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text category='s2' style={{ fontWeight: 'bold' }}>Description</Text>
            <Text style={{ marginVertical: 3 }}>{product?.description}</Text>
          </View>

          {/* Colors and Sizes */}
          {product?.variants?.colors?.length > 0 && (
            <View style={{ marginBottom: 5 }}>
              <Text category='s2' style={{ fontWeight: 'bold' }}>Colors</Text>
              <View style={styles.colorContainer}>
                {product.variants.colors.map((colorItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorBox,
                      { backgroundColor: colorItem.colorCode },
                      selectedColor?.colorCode === colorItem.colorCode && styles.selectedColorBox,
                    ]}
                    onPress={() => setSelectedColor(colorItem)}
                  >
                    {selectedColor.colorCode === colorItem.colorCode && <Check size={16} color="#FFF" weight="bold" />}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {product?.variants?.sizes?.length > 0 && (
            <>
              <Text category='s2' style={{ fontWeight: 'bold' }}>Sizes</Text>
              <View style={styles.sizeContainer}>
                {product.variants.sizes.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sizeBox,
                      selectedSize === size && { borderColor: theme['color-primary-default'] },
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={selectedSize === size && { color: theme['color-primary-default'] }}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </Layout>
      </ScrollView>

      <Layout style={styles.bottomTabsContainer} level="1">
        <View>
          <Text category='s2' style={{ fontWeight: 'bold' }}>Total Price</Text>
          <Text category='h6' style={styles.price}>{`UGX ${(product?.price / 100).toLocaleString()}`}</Text>
        </View>
        <Button style={styles.tabButton} onPress={handleAddToCart}>
          Add to Cart
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#d32f2f',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  viewPager: {
    height: 300,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  productTitle: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  price: {
    marginTop: 8,
    color: '#d32f2f',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: -20
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'gainsboro',
  },
  tabButton: {
    flex: 1,
    maxWidth: 140,
    marginHorizontal: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'relative',
    // padding: 10,
  },
  cartCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#d32f2f',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
  soldText: {
    fontSize: 11,
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginRight: 15,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorBox: {
    borderColor: '#000',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  sizeBox: {
    width: 70,
    padding: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeBox: {
    borderColor: '#000',
  },
  // Other styles remain the same...
});

export default ProductDetailsScreen;
