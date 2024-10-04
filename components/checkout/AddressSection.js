import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, Input, Card, Divider, Spinner, useTheme } from '@ui-kitten/components';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { CheckCircle, User, MapPin, Phone } from 'phosphor-react-native'; // Import necessary Phosphor icons

const ShippingAddress = ({ addresses, refetch, createAddress, isLoading }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNumber] = useState('');
  const [addressName, setAddressName] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [country, setCountry] = useState('');

  const theme = useTheme();

  useEffect(() => {
    if (addresses?.data?.docs.length > 0) {
      setShippingAddress(addresses?.data?.docs[0]);
      setSelectedAddressId(addresses?.data?.docs[0]?.id);
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
        country,
      }).unwrap();
      refetch();
      toggleModal();
    }
  };

  const handleSelectAddress = (address) => {
    setShippingAddress(address);
    setSelectedAddressId(address.id);
    toggleAddressModal();
  };

  return (
    <Layout style={[styles.container, { borderColor: theme['color-basic-400'] }]}>
      <View style={styles.header}>
        <Text category="s1">Shipping Address</Text>
        <Button appearance="ghost" size="small" onPress={toggleAddressModal}>
          Change
        </Button>
      </View>

      {isLoading ? (
        <View style={styles.loadingPlaceholder}>
          <Spinner size="giant" />
        </View>
      ) : shippingAddress ? (
        <Layout style={styles.card}>
          <View style={styles.addressRow}>
            <MapPin size={20} color="#8F9BB3" weight="fill" />
            <Text category="s2" style={styles.addressText}>
              {shippingAddress.addressName}
            </Text>
            <Text style={styles.addressLabel} category="c2">
              Home
            </Text>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={styles.addressInfo}>
            <User size={20} color="#8F9BB3" weight="fill" />
            <Text category="p2" style={styles.infoText}>
              {shippingAddress.fullName || 'John Doe'}
            </Text>
          </View>
          <View style={styles.addressInfo}>
            <Phone size={20} color="#8F9BB3" weight="fill" />
            <Text appearance="hint" style={styles.infoText}>
              {shippingAddress.phoneNo}
            </Text>
          </View>
        </Layout>
      ) : (
        <Button style={styles.addAddressButton} onPress={toggleModal}>
          Add Shipping Address
        </Button>
      )}

      <Modal visible={isAddressModalVisible} animationType="slide" transparent={true} onRequestClose={toggleAddressModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 10, fontWeight: 'bold' }} category="S1">
              Select Shipping Address
            </Text>
            {addresses?.data?.docs.map((address) => (
              <TouchableOpacity
                key={address.id}
                style={styles.addressOption}
                onPress={() => handleSelectAddress(address)}
              >
                <Card style={styles.addressCard}>
                  <View style={styles.addressDetails}>
                    <Text>{address.fullName}</Text>
                    <Text appearance="hint">{address.addressName}</Text>
                    <Text appearance="hint">{address.phoneNo}</Text>
                  </View>
                  {selectedAddressId === address.id && <CheckCircle size={24} color="green" weight="fill" />}
                </Card>
              </TouchableOpacity>
            ))}
            <Button onPress={toggleAddressModal} appearance="ghost">
              Cancel
            </Button>
          </View>
        </View>
      </Modal>

      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text category="h5">Add Shipping Address</Text>
            <Input label="Full Name" placeholder="Enter full name" value={fullName} onChangeText={setFullName} style={styles.input} />
            <Input label="Phone Number" placeholder="Enter phone number" value={phoneNo} onChangeText={setPhoneNumber} style={styles.input} />
            <Input label="Address Name" placeholder="Enter full address" value={addressName} onChangeText={setAddressName} style={styles.input} />
            <Input label="City/Town" placeholder="Enter city/town" value={city} onChangeText={setCity} style={styles.input} />
            <Input label="District" placeholder="Enter district" value={district} onChangeText={setDistrict} style={styles.input} />
            <Input label="Postal Address" placeholder="Enter postal address" value={postalAddress} onChangeText={setPostalAddress} style={styles.input} />
            <Input label="Country" placeholder="Enter country" value={country} onChangeText={setCountry} style={styles.input} />
            <Button onPress={handleAddAddress} style={styles.saveButton} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Address'}
            </Button>
            <Button onPress={toggleModal} appearance="ghost">
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {  borderBottomWidth: 15, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  card: { padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'rgb(228, 233, 242)' },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressLabel: { marginLeft: 10, padding: 6, backgroundColor: '#EDF1F7', borderRadius: 6 },
  addressText: { marginLeft: 10 },
  addressInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { marginLeft: 10 },
  addAddressButton: { marginTop: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 16 },
  modalContent: { backgroundColor: 'white', borderRadius: 8, padding: 16, gap: 5 },
  input: { marginBottom: 16 },
  saveButton: { marginTop: 16 },
  loadingPlaceholder: { justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  addressOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addressCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  addressDetails: { flex: 1 },
});

export default ShippingAddress;
