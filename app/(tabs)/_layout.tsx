import { Tabs } from 'expo-router';
import React from 'react';
import { House, ListMagnifyingGlass, ShoppingCart, User, ArrowLeft } from 'phosphor-react-native'; // Phosphor icons
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router'; // useRouter from expo-router
import { useTheme } from '@ui-kitten/components';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter(); // Hook for expo-router navigation

  // Get cart item count from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

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
        name="cart"
        options={{
          title: 'Cart', // Title for cart
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
    right: -10, // Adjust the position as needed
    top: -3,
    backgroundColor: '#d32f2f', // Red background for badge
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
