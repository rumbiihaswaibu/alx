import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import LoginIllustration from '../assets/LoginIllustration';

const OtpRegisterScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(''); // Single state to store the OTP as a string

  const handleOtpRequest = () => {
    console.log('Sending OTP to:', phoneNumber);
    // Here, you would typically trigger your API call to send the OTP
  };

  const handleOtpVerification = () => {
    console.log('Verifying OTP:', otp);
    // Implement verification logic here
  };

  const handleChange = (text) => {
    if (text.length <= 4) { // Limit input to 4 characters
      setOtp(text); // Set OTP to the input value
    }
  };

  return (
    <Layout style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{backgroundColor:'white'}} keyboardShouldPersistTaps='handled'>
      <Layout style={styles.container}>
        {/* <Text category='h5' style={{textAlign:'center'}}>OTP Register</Text>
        <Text category='s1' appearance='hint' style={styles.description}>
          We will send you a one-time password to your mobile number.
        </Text>
        <Input
          style={styles.input}
          placeholder='Phone Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          accessoryLeft={() => <Text style={styles.countryCode}>+256</Text>}
        />
        <Button style={styles.button} onPress={handleOtpRequest}>
          Send OTP
        </Button> */}
        <LoginIllustration />

        <Text category='h5' style={{textAlign:'center'}}>Enter your OTP Code</Text>

        <Text category='s1' appearance='hint' style={styles.description}>
        We have sent a verification code to your email address. Please enter your code down below
        </Text>

        <Input
          style={styles.otpInput}
          value={otp}
          size='large'
          onChangeText={handleChange}
          keyboardType='numeric'
          maxLength={4} // Limit the length of OTP to 4 digits
          textAlign='center'
          placeholder='XXXX'
        />
        <Text category='s1' appearance='hint' style={styles.description}>
            Didn’t you receive the OTP? Resend OTP
        </Text>
        <Button style={styles.button} onPress={handleOtpVerification}>
          Verify OTP
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    marginHorizontal:'auto',
    overflow: 'hidden', // Ensure no horizontal scroll happens
  },
  description: {
    marginVertical: 20,
    textAlign:'center'
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  otpInput: {
    width: '90%', // Full width for the OTP input
    // height: 50,
    marginHorizontal: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20, // Add margin for better spacing
  },
});

export default OtpRegisterScreen;
