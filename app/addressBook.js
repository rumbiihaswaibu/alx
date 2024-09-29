import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Input, Button, Layout, Text, Card, Modal } from '@ui-kitten/components';
import { useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation, useUpdateAddressMutation } from '../api'; // Adjust the path as necessary

const AddressComponent = () => {
  const { data: addresses, error: fetchError, isLoading: isFetching, refetch } = useGetAddressQuery();
  const [createAddress, { error: createError, isLoading: isCreating }] = useCreateAddressMutation();
  const [deleteAddress, { error: deleteError, isLoading: isDeleting }] = useDeleteAddressMutation();
  const [updateAddress, { error: updateError }] = useUpdateAddressMutation();

  const [form, setForm] = useState({
    phoneNo: '',
    email: '',
    addressName: '',
    country: '',
    city: '',
    state: '',
    mainAddress: false,
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching addresses:", fetchError);
    }
  }, [fetchError]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await createAddress(form).unwrap();
      resetForm();
      setModalVisible(false);
      refetch(); // Refetch addresses after creating
    } catch (error) {
      console.error("Error creating address:", createError);
    }
  };

  const resetForm = () => {
    setForm({
      phoneNo: '',
      email: '',
      addressName: '',
      country: '',
      city: '',
      state: '',
      mainAddress: false,
    });
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setForm(address);
    setModalVisible(true);
  };

  const handleUpdateAddress = async () => {
    try {
      await updateAddress({ id: selectedAddress._id, data: form }).unwrap();
      resetForm();
      setSelectedAddress(null);
      setModalVisible(false);
      refetch(); // Refetch addresses after updating
    } catch (error) {
      console.error("Error updating address:", updateError);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(selectedAddress._id).unwrap();
      setDeleteModalVisible(false);
      setSelectedAddress(null);
      refetch(); // Refetch addresses after deleting
    } catch (error) {
      console.error("Error deleting address:", deleteError);
    }
  };

  const renderAddressItem = (address) => (
    <Card style={styles.addressItem} key={address._id}>
      <Text category='s1'>{address.addressName}</Text>
      <Text category='c1'>{address.phoneNo}</Text>
      <Text category='c1'>{address.city}, {address.country}</Text>
      <Text category='c1'>{address.state ? address.state : 'N/A'}</Text>
      <View style={styles.buttonContainer}>
        <Button size='tiny' onPress={() => handleEditAddress(address)}>Edit</Button>
        <Button
          size='tiny'
          appearance='outline'
          status='danger'
          onPress={() => {
            setSelectedAddress(address);
            setDeleteModalVisible(true);
          }}
          disabled={isDeleting} // Disable button while deleting
        >
          {isDeleting && selectedAddress?._id === address._id ? (
            <ActivityIndicator size="small" color="red" />
          ) : (
            'Delete'
          )}
        </Button>
      </View>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <Button onPress={() => setModalVisible(true)}>Create New Address</Button>
      {isFetching ? (
        <ActivityIndicator />
      ) : fetchError ? (
        <Text status='danger'>Error fetching addresses: {fetchError.message}</Text>
      ) : (
        <FlatList
          data={addresses?.data?.docs}
          renderItem={({ item }) => renderAddressItem(item)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Create/Edit Address Modal */}
      <Modal visible={isModalVisible} backdropStyle={styles.backdrop} style={styles.modal}>
        <Layout style={styles.modalContent}>
          <Text style={{ marginVertical: 10 }} category='h6'>Create/Edit Address</Text>
          <Input
            label='Phone Number'
            value={form.phoneNo}
            onChangeText={(value) => handleInputChange('phoneNo', value)}
          />
          <Input
            label='Email'
            value={form.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <Input
            label='Address Name'
            value={form.addressName}
            onChangeText={(value) => handleInputChange('addressName', value)}
          />
          <Input
            label='Country'
            value={form.country}
            onChangeText={(value) => handleInputChange('country', value)}
          />
          <Input
            label='City'
            value={form.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
          <Input
            label='State'
            value={form.state}
            onChangeText={(value) => handleInputChange('state', value)}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={selectedAddress ? handleUpdateAddress : handleSubmit} disabled={isCreating}>
              {isCreating ? 'Creating...' : selectedAddress ? 'Update Address' : 'Create Address'}
            </Button>
            <Button onPress={() => {
              resetForm();
              setModalVisible(false);
            }}>Cancel</Button>
          </View>
        </Layout>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} backdropStyle={styles.backdrop} style={styles.modal}>
        <Layout style={styles.modalContent}>
          <Text category='h5'>Confirm Delete</Text>
          <Text>Are you sure you want to delete this address?</Text>
          <View style={styles.buttonContainer}>
            <Button status='danger' onPress={handleDeleteAddress} disabled={isDeleting}>
              {isDeleting ? <ActivityIndicator size="small" color="white" /> : 'Delete'}
            </Button>
            <Button onPress={() => setDeleteModalVisible(false)}>Cancel</Button>
          </View>
        </Layout>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  addressItem: {
    marginVertical: 10,
  },
  modal: {
    justifyContent: 'flex-end', // Align to the bottom
    margin: 0, // Remove margin to fit the bottom
    bottom: 0,
    width: '100%'
  },
  modalContent: {
    padding: 20,
    width: '100%',
    gap: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white', // Ensure the modal background is white
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default AddressComponent;
