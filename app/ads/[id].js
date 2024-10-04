import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, ViewPager, Button, Spinner, useTheme, TopNavigationAction } from '@ui-kitten/components';
import { useGetProductQuery } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { ShoppingCart, Star, Check } from 'phosphor-react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const { data, isLoading } = useGetProductQuery(id, {
    skip: !id,
  });

  const product = data?.data;
  const images = product?.files.length ? product?.files.map((file) => ({ uri: file.url })) : [{ uri: 'https://via.placeholder.com/500' }, { uri: 'https://via.placeholder.com/500' }];
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
          {/* Image ViewPager */}
          <ViewPager
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
            style={styles.viewPager}
          >
            {images.map((image, index) => (
              <Layout key={index} style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={styles.image} />
              </Layout>
            ))}
          </ViewPager>


          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  selectedIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <Layout style={{ padding: 17 }}>

            {/* Product Info */}
            <View style={styles.infoCard}>
              <View style={{ flexGrow: 1 }}>
                <Text category="h6" style={styles.productTitle}>
                  {product?.title}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.soldText}>{product?.sold} sold</Text>
                  <Star size={16} color="#FFD700" weight="fill" />
                  <Text>4.9</Text>
                </View>
              </View>
              {/* <TouchableOpacity style={{ width: 25 }}>
              <Heart />
            </TouchableOpacity> */}
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text category="s2" style={{ fontWeight: 'bold' }}>
                Description
              </Text>
              <Text style={{ marginVertical: 3 }}>{product?.description}</Text>
            </View>

            {/* Colors and Sizes */}
            {product?.variants?.colors?.length > 0 && (
              <View style={{ marginBottom: 5 }}>
                <Text category="s2" style={{ fontWeight: 'bold' }}>Colors</Text>
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
                <Text category="s2" style={{ fontWeight: 'bold' }}>Sizes</Text>
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
        </Layout>

      </ScrollView>

      <Layout style={styles.bottomTabsContainer} level="1">
        <View style={{ flex: 1 }}>
          <Text category="s2" style={{ fontWeight: 'bold' }}>Total Price</Text>
          <Text category="h6" style={styles.price}>
            {`UGX ${(product?.price / 100).toLocaleString()}`}
          </Text>
        </View>
        <Button
          style={styles.tabButton}
          disabled={!selectedColor.colorCode || !selectedSize}
          accessoryLeft={() => <ShoppingCart size={20} color="white" />}
          onPress={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: 300,
    width: '100%'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
  content: {
    // padding: 16,
  },
  infoCard: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTitle: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  soldText: {
    fontSize: 11,
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginRight: 15,
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'gainsboro',
  },
  price: {
    marginTop: 8,
    color: '#d32f2f',
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
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
});

export default ProductDetailsScreen;
