import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { House, ListMagnifyingGlass, ShoppingCart, User, ArrowLeft } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { useTheme } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLogin from '@/hooks/useLogin';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();
  const [isUserExist, setIsUserExist] = React.useState(false);
  const isLoggedIn = useLogin()

  // Get cart item count from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  // Sample user data to store in AsyncStorage
  const userData = {
    id: '12345',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    addresses: [
      {
        id: '1',
        label: 'Home',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        isDefault: true
      },
      {
        id: '2',
        label: 'Work',
        addressLine1: '456 Office Park',
        addressLine2: 'Suite 12',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'USA',
        isDefault: false
      }
    ]
  };

  // useEffect to save the user data to AsyncStorage

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('@user');
      if (user) {
        setIsUserExist(true);
      }
    };

    checkUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme['color-primary-default'],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categories',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={activeTintColor} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <ListMagnifyingGlass size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      />
      <Tabs.Screen
        name={'cart'}
        options={{
          title: 'Cart',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconWithBadge}>
              <ShoppingCart size={24} color={color} weight={focused ? 'fill' : 'regular'} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color={activeTintColor} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} weight={focused ? 'fill' : 'regular'} />
          ),
        }}
      /> 
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWithBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
