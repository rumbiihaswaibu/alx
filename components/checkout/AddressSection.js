import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, Input, Card, Divider } from '@ui-kitten/components';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const ShippingAddress = ({ addresses, refetch, createAddress, isLoading }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNumber] = useState('');
  const [addressName, setAddressName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (addresses?.data?.docs.length > 0) {
      setShippingAddress(addresses?.data?.docs[0]);
    }
  }, [addresses]);

  const toggleModal = () => setModalVisible(!isModalVisible);
  const toggleAddressModal = () => setAddressModalVisible(!isAddressModalVisible);

  const handleAddAddress = async () => {
    if (fullName && phoneNo && addressName && city && district && postalAddress && country) {
      await createAddress({
        fullName,
        phoneNo,
        addressName,
        city,
        district,
        postalAddress,
        country
      }).unwrap();
      refetch();
      toggleModal();
    }
  };

  const handleSelectAddress = (address) => {
    setShippingAddress(address);
    toggleAddressModal();
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Text category='s1'>Shipping Address</Text>
        <Button appearance='ghost' size='small' onPress={toggleAddressModal}>
          Change
        </Button>
      </View>
      {shippingAddress ? (
        <Layout style={styles.card}>
          <View style={styles.addressRow}>
            <Text category='s2'>{shippingAddress.addressName}</Text>
            <Text style={styles.addressLabel} category='c2'>Home</Text>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <Text category='p2'>{shippingAddress.fullName || 'John Doe'}</Text>
          <Text appearance='hint'>{shippingAddress.phoneNo}</Text>
        </Layout>
      ) : (
        <Button style={styles.addAddressButton} onPress={toggleModal}>
          Add Shipping Address
        </Button>
      )}

      {/* Modal for Selecting Shipping Address */}
      <Modal
        visible={isAddressModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleAddressModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 5, fontWeight: 'bold' }} category='S1'>Select Shipping Address</Text>
            {addresses?.data?.docs.map((address) => (
              <TouchableOpacity key={address.id} onPress={() => handleSelectAddress(address)}>
                <Card style={{ marginBottom: 10 }}>
                  <Text>{address.fullName}</Text>
                  <Text appearance='hint'>{address.addressName}</Text>
                  <Text appearance='hint'>{address.phoneNo}</Text>
                </Card>
              </TouchableOpacity>
            ))}
            <Button onPress={toggleAddressModal} appearance='ghost'>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

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
              value={phoneNo}
              onChangeText={setPhoneNumber}
              style={styles.input}
            />
            <Input
              label='Address Name'
              placeholder='Enter full address'
              value={addressName}
              onChangeText={setAddressName}
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
            <Button onPress={handleAddAddress} style={styles.saveButton} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Address'}
            </Button>
            <Button onPress={toggleModal} appearance='ghost'>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'rgb(228, 233, 242)' },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressLabel: { marginLeft: 10, padding: 6, backgroundColor: '#EDF1F7', borderRadius: 6 },
  addAddressButton: { marginTop: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 16 },
  modalContent: { backgroundColor: 'white', borderRadius: 8, padding: 16, gap: 5 },
  input: { marginBottom: 16 },
  saveButton: { marginTop: 16 },
});

export default ShippingAddress;
