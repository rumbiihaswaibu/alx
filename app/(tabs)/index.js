import React from 'react';
import { Layout, Text, Input, Button, Card } from '@ui-kitten/components';
import { ScrollView, Image, View, ImageBackground } from 'react-native';
import { MagnifyingGlass, ShoppingCart, Bell, Sliders, Heart, Cupcake, Cookie, Donut, Bread, Globe } from 'phosphor-react-native';
import CategoryGridView from '../../components/categories/GridView';
import FlashSale from '../../components/products/FlashSale';
import TopDeals from '../../components/products/TopDeals';
import Ads from '../ads/category/[id]';

const HomeScreen = () => {

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ backgroundColor: '#FF3333', height: 150, paddingVertical: 40, paddingHorizontal: 10 }}>
        <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', padding: 10 }}>
          <Layout style={{ flexDirection: 'row', gap: 3, backgroundColor: 'transparent' }}>
            <Globe size={24} weight='fill' color='gainsboro' />
            <Text appearance='alternative' category="s1">Uganda</Text>
          </Layout>
          <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', alignItems: 'center' }}>
            <Bell size={24} color='gainsboro' />
          </Layout>
        </Layout>
        {/* Search Bar */}
        <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 10 }}>
          <Input
            placeholder="Search"
            style={{ flex: 1 }}
            accessoryLeft={() => <MagnifyingGlass size={24} />}
            accessoryRight={() => <Sliders size={24} />}
          />
        </Layout>
      </Layout>

      <ScrollView style={{ padding: 20 }}>
        {/* Special Offers Section */}
        <Layout>
          <Text category="h6">Special Offers</Text>
          <View style={{ marginVertical: 8 }}>
            {/* Add Image Background here */}
            <ImageBackground
              source={require('../../assets/images/prom.png')}
              style={{ height: 140, justifyContent: 'center' }}
              imageStyle={{ borderRadius: 8 }}
            >
              <Layout style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 8 }}>
                <Layout style={{ backgroundColor: 'transparent' }}>
                  <Text category="label" appearance="alternative">Limited Time!</Text>
                  <Text category="h6" appearance="alternative">Get Special Offer</Text>
                  <Text category="h4" appearance="alternative">Up to 40%</Text>
                </Layout>
                <Button size='small' appearance="filled">Shop Now</Button>
              </Layout>
            </ImageBackground>
          </View>
        </Layout>

        {/* Categories Section */}
        <Layout >
          <CategoryGridView />
        </Layout>

        <Layout >
          <FlashSale />
        </Layout>

        <Layout >
          <TopDeals />
        </Layout>

        {/* Featured Products Section */}
        <Layout>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>Popular Products</Text>
          <Layout style={{ margin: -10 }}>
            <Ads />
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
