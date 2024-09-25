import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useGetProductsQuery } from '../../../api';
import { Heart, Star, ArrowLeft, MagnifyingGlass } from 'phosphor-react-native';  // Importing Phosphor icons
import { Link, Stack, router, useLocalSearchParams } from 'expo-router';


const ProductCard = ({ product }) => {
    return (
        <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/ads/${product._id}`)}>
            <View style={styles.productImageContainer}>
                <Image source={'../assets/images/placeholder.png'} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteIcon}>
                    <Heart size={20} color="#333" weight="bold" />
                </TouchableOpacity>
            </View>
            <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">{product.title}</Text>
            <View style={styles.ratingContainer}>
                <Star size={16} color="orange" weight="fill" />
                <Text style={styles.ratingText}>{product.rating || '4.7'}</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}> | </Text>
                <Text style={styles.soldText}>{product.sold} sold</Text>
            </View>
            <Text style={styles.productPrice}>UGX {product.price?.toLocaleString('en-UG')}</Text>
        </TouchableOpacity>
    );
};

const Ads = () => {
    const { id } = useLocalSearchParams();
    const { data, isLoading, isError } = useGetProductsQuery(id ? { category: id } : {});
    const products = data?.data?.docs || [];

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF5656" />
                <Text style={styles.loadingText}>Loading products...</Text>
            </SafeAreaView>
        );
    }

    if (isError || products.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <MagnifyingGlass size={64} color="#888" weight="bold" />
                <Text style={styles.emptyText}>No products found</Text>
                <Text style={styles.subText}>We couldn’t find any products for this category.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Layout style={styles.container}>
                <ScrollView contentContainerStyle={styles.productsContainer}>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </ScrollView>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: 'white',
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '50%',  // Adjusted for spacing between items
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        // marginBottom: 5,
    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        backgroundColor: 'gainsboro',
        height: 190,
        borderRadius: 10,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 5,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FF5656',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'orange',
        marginLeft: 5,
    },
    soldText: {
        fontSize: 10,
        backgroundColor: 'gainsboro',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subText: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default Ads;
