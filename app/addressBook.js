import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Input, Button, Layout, Text, Card, Modal, CheckBox, useTheme } from '@ui-kitten/components';
import { useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation, useUpdateAddressMutation } from '../api'; // Adjust the path as necessary
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SkeletonLoader = () => {
  const theme = useTheme();
  return (<Card style={styles.skeletonItem}>
    <View style={[styles.skeletonText, { width:'100%', backgroundColor: theme['color-basic-400'] }]} />
    <View style={[styles.skeletonText, {width:'40%', backgroundColor: theme['color-basic-400'] }]} />
    <View style={[styles.skeletonText, {width:'60%', backgroundColor: theme['color-basic-400'] }]} />
    <View style={[styles.skeletonButtonContainer,{justifyContent:'space-between'}]}>
      <View style={[styles.skeletonButton, {width:'20%', backgroundColor: theme['color-basic-400'] }]} />
      <View style={{flexDirection:'row',width:'40%',gap:5}}>
      <View style={[styles.skeletonButton, {width:'50%', backgroundColor: theme['color-basic-400'] }]} />
      <View style={[styles.skeletonButton, {width:'50%', backgroundColor: theme['color-basic-400'] }]} />
      </View>
    </View>
  </Card>)
};

const AddressComponent = () => {
  const { data: fetchedAddresses, error: fetchError, isLoading: isFetching, refetch } = useGetAddressQuery();
  const [createAddress, { error: createError, isLoading: isCreating }] = useCreateAddressMutation();
  const [deleteAddress, { error: deleteError, isLoading: isDeleting }] = useDeleteAddressMutation();
  const [updateAddress, { error: updateError }] = useUpdateAddressMutation();
  const { edit } = useLocalSearchParams();

  const [form, setForm] = useState({
    phoneNo: '',
    email: '',
    addressName: '',
    country: '',
    city: '',
    state: '',
    addressLabel: 'Home', // Default label
    mainAddress: false,
  });

  const [addresses, setAddresses] = useState([]); // State for addresses
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching addresses:", fetchError);
    }
  }, [fetchError]);

  // Update the addresses state when fetchedAddresses change
  useEffect(() => {
    if (fetchedAddresses) {
      setAddresses(fetchedAddresses.data.docs); // Update the local state with fetched addresses
    }
  }, [fetchedAddresses]);

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
      addressLabel: 'Home', // Reset to default label
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

  const toggleMainAddress = async (address) => {
    const isCurrentlyMain = address.mainAddress;
  
    if (!isCurrentlyMain) {
      // Update the addresses state locally
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        mainAddress: addr._id === address._id // Set the clicked address to main, others to false
      }));
  
      setAddresses(updatedAddresses);
  
      // Save the selected address to localStorage (AsyncStorage in this case)
      try {
        await AsyncStorage.setItem('selectedAddress', JSON.stringify(address));
        console.log("Selected address saved to local storage:", address);
      } catch (error) {
        console.error("Error saving address to local storage:", error);
      }
    }
  };
  
  

  // const toggleMainAddress = async (address) => {
  //   const isCurrentlyMain = address.mainAddress;
  //   console.log(isCurrentlyMain)
  //   if (!isCurrentlyMain) {
  //     const currentMainAddress = addresses.find(addr => addr.mainAddress);
  //     console.log('===currentMainAddress==',currentMainAddress)
  //     // if (currentMainAddress) {
  //     //   await updateAddress({ id: currentMainAddress._id, data: { ...currentMainAddress, mainAddress: false } }).unwrap();
  //     // }
  //   }

  //   // Update the selected address to set its main address status
  //   // try {
  //   //   await updateAddress({ id: address._id, data: { ...address, mainAddress: !isCurrentlyMain } }).unwrap();
  //   //   refetch(); // Refetch addresses after updating
  //   // } catch (error) {
  //   //   console.error("Error updating address main status:", error);
  //   // }
  // };

  const renderAddressItem = (address) => (
    <Card style={styles.addressItem} key={address._id}>
      <Text category='s1'>{address.addressName}</Text>
      <Text category='c1'>{address.phoneNo}</Text>
      <Text category='c1'>{address.city}, {address.country}</Text>
      <Text category='c1'>{address.state ? address.state : 'N/A'}</Text>
      <Text category='c1'>{address.addressLabel}</Text>
      <View style={styles.buttonContainer}>
        <CheckBox
          style={styles.radio}
          checked={address.mainAddress}
          onChange={() => toggleMainAddress(address)}
        >
          {/* {address.mainAddress ? 'Main Address' : 'Set as Main Address'} */}
        </CheckBox>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Button size='tiny' onPress={() => handleEditAddress(address)}>Edit</Button>
          <Button
            size='tiny'
            appearance='outline'
            status='danger'
            onPress={() => {
              setSelectedAddress(address);
              setDeleteModalVisible(true);
            }}
            disabled={isDeleting}
          >
            {isDeleting && selectedAddress?._id === address._id ? (
              <ActivityIndicator size="small" color="red" />
            ) : (
              'Delete'
            )}
          </Button>
        </View>
      </View>
    </Card>
  );

  const PhoneNumberAccessory = () => (
    <View style={styles.accessoryContainer}>
      <Text category='s1'>+256</Text>
    </View>
  );

  const router = useRouter()

  return (
    <Layout style={styles.container}>
      <Button onPress={() => setModalVisible(true)}>Create New Address</Button>
      {isFetching ? (
        <FlatList
          data={Array.from({ length: 5 })} // Show 5 skeletons while loading
          renderItem={() => <SkeletonLoader />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : fetchError ? (
        <Text status='danger'>Error fetching addresses: {fetchError.message}</Text>
      ) : (
        <FlatList
          data={addresses} // Use local addresses state
          renderItem={({ item }) => renderAddressItem(item)}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      {edit && <Button appearance='outline' onPress={() => router.push('/checkout')}>Select and Confirm</Button>}

      {/* Create/Edit Address Modal */}
      <Modal visible={isModalVisible} backdropStyle={styles.backdrop} style={styles.modal}>
        <Layout style={styles.modalContent}>
          <Text style={{ marginVertical: 10 }} category='h6'>Create/Edit Address</Text>
          <Text category='label' appearance='hint'>Address Label</Text>
          <CheckBox
            style={styles.radio}
            checked={form.addressLabel === 'Home'}
            onChange={() => handleInputChange('addressLabel', form.addressLabel === 'Home' ? 'Office' : 'Home')}
          >
            {form.addressLabel === 'Home' ? 'Home' : 'Office'}
          </CheckBox>
          <Input
            label='Phone Number'
            value={form.phoneNo?.replace('+256', '')}
            onChangeText={(value) => handleInputChange('phoneNo', value)}
            placeholder='7XXX'
            accessoryLeft={PhoneNumberAccessory}
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
            label='City/Town'
            value={form.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
          <Input
            label='Region'
            value={form.state}
            onChangeText={(value) => handleInputChange('state', value)}
          />
          <CheckBox
            style={styles.radio}
            checked={form.mainAddress}
            onChange={(nextChecked) => handleInputChange('mainAddress', nextChecked)}
          >
            Set as Default
          </CheckBox>
          <View style={styles.buttonContainer}>
            <Button status='basic' appearance='outline' onPress={() => {
              resetForm();
              setModalVisible(false);
            }}>Cancel</Button>
            <Button onPress={selectedAddress ? handleUpdateAddress : handleSubmit} disabled={isCreating}>
              {isCreating ? 'Creating...' : selectedAddress ? 'Update Address' : 'Create Address'}
            </Button>
          </View>
        </Layout>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={isDeleteModalVisible} backdropStyle={styles.backdrop} style={styles.modal}>
        <Layout style={styles.modalContent}>
          <Text category='h5'>Confirm Delete</Text>
          <Text>Are you sure you want to delete this address?</Text>
          <View style={styles.buttonContainer}>
            <Button status='basic' appearance='outline' onPress={() => setDeleteModalVisible(false)}>Cancel</Button>
            <Button onPress={handleDeleteAddress} disabled={isDeleting}>
              {isDeleting ? <ActivityIndicator size="small" color="white" /> : 'Delete'}
            </Button>
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
    justifyContent: 'flex-end',
    margin: 0,
    bottom: 0,
    width: '100%'
  },
  modalContent: {
    padding: 20,
    width: '100%',
    gap: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  radio: {
    marginVertical: 4,
  },
  accessoryContainer: {
    paddingHorizontal: 8,
  },
  skeletonItem: {
    marginVertical: 10,
  },
  skeletonText: {
    height: 20,
    backgroundColor: '#c0c0c0', // Darker gray for text
    marginBottom: 8,
    borderRadius: 4, // Rounded corners
  },
  skeletonButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonButton: {
    height: 30,
    width: '45%',
    backgroundColor: '#c0c0c0', // Darker gray for buttons
    borderRadius: 4, // Rounded corners
  },
});

export default AddressComponent;
