import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Image, StyleSheet, Modal } from 'react-native';
import { Layout, Text, Button, Card, Input } from '@ui-kitten/components';
import LinkLogo from '../assets/LinkLogo';
import { useSelector } from 'react-redux'; // Import useSelector to access the cart state

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
                        <Card style={styles.card} key={item.id}>
                            <View style={styles.productContainer}>
                                <Image
                                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/80' }}
                                    style={styles.productImage}
                                />
                                <View style={styles.productInfo}>
                                    <Text category='s1'>{item.title}</Text>
                                    <Text appearance='hint' category='c1'>{item.description}</Text>
                                    <Text category='s1' style={styles.productPrice}>UGX {item.price.toLocaleString()}</Text>
                                    <Text appearance='hint' category='c2'>Quantity: {item.quantity}</Text>
                                </View>
                            </View>
                        </Card>
                    ))}
                </Layout>

                {/* Shipping Options */}
                <Layout style={styles.shippingContainer}>
                    <View style={styles.shippingHeader}>
                        <Text category='s1'>Select Shipping</Text>
                        <Text style={styles.seeOptions}>See all options</Text>
                    </View>
                    <Card style={styles.shippingOption}>
                        <LinkLogo />
                        <View>
                            <View style={styles.shippingInfo}>
                                <Text category='s1'>Link Bus Couriers</Text>
                                <Text appearance='hint' style={{ marginVertical: 3 }} category='c1'>Estimated arrived 9 - 10 June</Text>
                            </View>
                            <Text category='s1' style={styles.shippingPrice}>UGX 50,000</Text>
                        </View>
                    </Card>
                </Layout>

                {/* Note Input */}
                <Layout style={styles.noteContainer}>
                    <Text category='s1'>Note:</Text>
                    <Input placeholder='Type any message...' style={styles.noteInput} />
                </Layout>

                {/* Subtotal Display */}
                <Layout style={styles.subtotalContainer}>
                    <Text category='s1'>Subtotal, {cartItems.length} {cartItems.length > 1 ? 'items' : 'item'}</Text>
                    <Text category='s1' style={styles.subtotalPrice}>UGX {getTotalPrice().toLocaleString()}</Text>
                </Layout>

                {/* Payment Methods */}
                <Layout style={styles.paymentMethodContainer}>
                    <Text category='s1'>Payment Method</Text>
                    <View style={styles.paymentMethods}>
                        <Button style={styles.paymentButton} appearance='outline'>Cash</Button>
                        <Button style={styles.paymentButton} appearance='outline'>Bank Transfer</Button>
                    </View>
                </Layout>
            </ScrollView>

            {/* Footer: Total Amount and Checkout Button */}
            <Layout style={styles.footer}>
                <View>
                    <Text category='s1'>Total</Text>
                    <Text category='h6' style={styles.totalPrice}>UGX {getTotalPrice().toLocaleString()}</Text>
                </View>
                <Button style={styles.checkoutButton}>Checkout</Button>
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
        </SafeAreaView>
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
        marginVertical: 8,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addressLabel: {
        backgroundColor: 'rgba(255, 51, 51, 0.16)',
        borderWidth: 1,
        color: '#FF3333',
        borderColor: '#FF3333',
        fontSize: 9,
        borderRadius: 4,
        height: 20,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 12,
    },
    addressInfo: {
        flex: 1,
    },
    contact: {
        marginTop: 4,
    },
    addAddressButton: {
        marginVertical: 16,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productInfo: {
        flex: 1,
    },
    productPrice: {
        color: '#FF7043',
        fontWeight: 'bold',
        marginTop: 8,
    },
    shippingContainer: {
        marginVertical: 16,
    },
    shippingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    seeOptions: {
        color: '#FF7043',
    },
    shippingOption: {
        flexDirection: 'row',
    },
    shippingPrice: {
        color: '#FF7043',
        fontWeight: 'bold',
    },
    noteContainer: {
        marginVertical: 16,
    },
    noteInput: {
        marginTop: 8,
    },
    subtotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    subtotalPrice: {
        color: '#FF7043',
        fontWeight: 'bold',
    },
    paymentMethodContainer: {
        marginTop: 16,
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    paymentButton: {
        flex: 1,
        marginHorizontal: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
    totalPrice: {
        color: '#FF7043',
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#FF7043',
        borderColor: '#FF7043',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    input: {
        marginVertical: 8,
        width: '100%',
    },
    saveButton: {
        marginTop: 16,
        width: '100%',
    },
});

export default CheckoutScreen;
