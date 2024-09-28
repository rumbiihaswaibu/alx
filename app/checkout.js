import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, StyleSheet, Modal } from 'react-native';
import { Layout, Text, Button, Card, Input, useTheme } from '@ui-kitten/components';
import LinkLogo from '../assets/LinkLogo';
import { useSelector } from 'react-redux';
import { Truck, Clock } from 'phosphor-react-native'; // Phosphor icons for location and time
import { router } from 'expo-router';

const CheckoutScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [postalAddress, setPostalAddress] = useState('');
    const [country, setCountry] = useState('');

    const cartItems = useSelector(state => state.cart.items); // Get cart items from Redux store
    const theme = useTheme();

    // Toggle address modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Handle adding a shipping address
    const handleAddAddress = () => {
        if (fullName && phoneNumber && streetAddress && city && district && postalAddress && country) {
            setShippingAddress({ fullName, phoneNumber, streetAddress, city, district, postalAddress, country });
            toggleModal(); // Close modal after adding address
        }
    };

    // Calculate total price based on cart items
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    // Helper function to display variants (color and size) conditionally
    const displayVariants = (item) => {
        const variants = [];
        if (item.selectedColor) variants.push(`Color: ${item.selectedColor.colorName}`);
        if (item.selectedSize) variants.push(`Size: ${item.selectedSize}`);
        return variants.length ? variants.join(' | ') : null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                {/* Shipping Address Section */}
                <Layout style={styles.shippingContainer}>
                    <Text category='s1'>Shipping Address</Text>
                    {shippingAddress ? (
                        <Card style={styles.card}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ display: 'flex' }} category='s1'>Shipping Address </Text>
                                <Text style={styles.addressLabel} category='c2'>Home</Text>
                            </View>
                            <View style={styles.addressContainer}>
                                <View style={styles.addressInfo}>
                                    <Text category='p2'>{shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.district}, {shippingAddress.postalAddress}, {shippingAddress.country}</Text>
                                    <Text style={styles.contact} appearance='hint'>{shippingAddress.fullName} - {shippingAddress.phoneNumber}</Text>
                                </View>
                            </View>
                        </Card>
                    ) : (
                        <Button style={styles.addAddressButton} onPress={toggleModal}>
                            Add Shipping Address
                        </Button>
                    )}
                </Layout>

                {/* Product Section */}
                <Layout style={styles.shippingContainer}>
                    <Text category='s1'>Order Items</Text>
                    {cartItems.map((item) => (
                        <Layout style={styles.card} key={item.id}>
                            <View style={styles.productContainer}>
                                <Image
                                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/80' }}
                                    style={styles.productImage}
                                />
                                <View style={styles.productInfo}>
                                    <Text category='s1' numberOfLines={1}>{item.title}</Text>
                                    {displayVariants(item) && (
                                        <Text appearance='hint' >{displayVariants(item)}</Text>
                                    )}
                                    <Text category='s1' style={{ ...styles.productPrice, color: theme['color-primary-default'] }}>UGX {item.price.toLocaleString()}</Text>
                                    <Text appearance='hint' category='c2'>Quantity: {item.quantity}</Text>
                                </View>
                            </View>
                        </Layout>
                    ))}
                </Layout>

                {/* Shipping Options Section */}
                <Layout style={styles.shippingContainer}>
                    <Text category='s1'>Select Shipping</Text>

                    {/* Shipping Option 1 */}
                    <Layout style={styles.shippingOption}>
                        <View style={styles.optionLogo}>
                            <LinkLogo />
                        </View>
                        <View style={styles.shippingDetails}>
                            <View style={styles.shippingInfo}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text category='s1'>Link Bus Couriers </Text>
                                    <Text category='s1' style={[styles.shippingPrice, { color: theme['color-primary-default'] }]}>UGX 50,000</Text>
                                </View>
                                <View style={styles.shippingMeta}>
                                    <Truck size={20} color={theme['color-primary-default']} />
                                    <Text appearance='hint' category='c2' style={styles.metaText}>Hoima District</Text>
                                </View>
                                <View style={styles.shippingMeta}>
                                    <Clock size={20} color={theme['color-primary-default']} />
                                    <Text appearance='hint' category='c2' style={styles.metaText}>Estimated arrival: 5 hours</Text>
                                </View>
                            </View>

                        </View>
                    </Layout>
                </Layout>

                {/* Subtotal and Total */}

            </ScrollView>

            {/* Footer: Total Amount and Checkout Button */}
            <Layout style={styles.footer}>
                <View>
                    <Text category='s1'>Total</Text>
                    <Text category='h6' style={{ ...styles.totalPrice, color: theme['color-primary-default'] }}>UGX {(getTotalPrice() + 50000).toLocaleString()}</Text>
                </View>
                <Button onPress={() => router.push({ pathname: 'payments', params: { amount: (getTotalPrice() + 50000) } })} style={styles.checkoutButton}>Pay Now</Button>
            </Layout>

            {/* Modal for Adding Shipping Address */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text category='h5'>Add Shipping Address</Text>
                        <Input
                            label='Full Name'
                            placeholder='Enter full name'
                            value={fullName}
                            onChangeText={setFullName}
                            style={styles.input}
                        />
                        <Input
                            label='Phone Number'
                            placeholder='Enter phone number'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            style={styles.input}
                        />
                        <Input
                            label='Street Address'
                            placeholder='Enter street address'
                            value={streetAddress}
                            onChangeText={setStreetAddress}
                            style={styles.input}
                        />
                        <Input
                            label='City/Town'
                            placeholder='Enter city/town'
                            value={city}
                            onChangeText={setCity}
                            style={styles.input}
                        />
                        <Input
                            label='District'
                            placeholder='Enter district'
                            value={district}
                            onChangeText={setDistrict}
                            style={styles.input}
                        />
                        <Input
                            label='Postal Address'
                            placeholder='Enter postal address'
                            value={postalAddress}
                            onChangeText={setPostalAddress}
                            style={styles.input}
                        />
                        <Input
                            label='Country'
                            placeholder='Enter country'
                            value={country}
                            onChangeText={setCountry}
                            style={styles.input}
                        />
                        <Button onPress={handleAddAddress} style={styles.saveButton}>
                            Save Address
                        </Button>
                        <Button onPress={toggleModal} appearance='ghost'>
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 16,
    },
    card: {
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'rgb(228, 233, 242)',
        padding: 10,
        borderRadius: 5,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 75,
        height: 75,
        marginRight: 16,
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
    },
    productPrice: {
        marginTop: 8,
        fontWeight: 'bold',
    },
    shippingContainer: {
        marginBottom: 24,
    },
    shippingOption: {
        // flexDirection: 'row',
        // alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(228, 233, 242)',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginVertical: 8,
    },
    optionLogo: {
        // marginRight: 16,
    },
    logo: {
        width: 50,
        height: 50,
    },
    shippingDetails: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shippingInfo: {
        flex: 1,
    },
    shippingMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    metaText: {
        marginLeft: 8,
    },
    shippingPrice: {
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F7F9FC',
        borderTopWidth: 1,
        borderColor: '#E4E9F2',
    },
    totalPrice: {
        fontWeight: 'bold',
    },
    checkoutButton: {
        // flex: 1,
        marginLeft: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    saveButton: {
        marginTop: 16,
    },
    addressLabel: {
        marginLeft: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: '#EDF1F7',
        borderRadius: 6,
    },
    contact: {
        marginTop: 8,
    },
    addAddressButton: {
        marginTop: 16,
    }
});

export default CheckoutScreen;
