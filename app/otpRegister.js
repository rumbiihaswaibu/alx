import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import LoginIllustration from '../assets/LoginIllustration';

const OtpRegisterScreen = () => {
  const [step, setStep] = useState(1); // Step tracker
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const handleOtpRequest = () => {
    console.log('Sending OTP to:', phoneNumber);
    // Trigger API to send OTP
    setStep(2); // Move to next step after requesting OTP
  };

  const handleOtpVerification = () => {
    console.log('Verifying OTP:', otp);
    // Implement verification logic here
    setStep(3); // Move to the registration form if OTP is correct
  };

  const handleRegistration = () => {
    console.log('Registering User:', { fullName, phoneNumber, password });
    // Implement registration logic here
  };

  const handleChangeOtp = (text) => {
    if (text.length <= 4) {
      setOtp(text); // Limit OTP input to 4 digits
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>

          {step === 1 && (
            <>
              <LoginIllustration />
              <Text category='h5' style={styles.title}>Enter Phone Number</Text>
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
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <LoginIllustration />
              <Text category='h5' style={styles.title}>Enter OTP Code</Text>
              <Text category='s1' appearance='hint' style={styles.description}>
                We have sent a verification code to your mobile number.
              </Text>
              <Input
                style={styles.otpInput}
                value={otp}
                size='large'
                onChangeText={handleChangeOtp}
                keyboardType='numeric'
                maxLength={4}
                textAlign='center'
                placeholder='XXXX'
              />
              <Text category='s1' appearance='hint' style={styles.description}>
                Didn’t receive the OTP? Resend OTP
              </Text>
              <Button style={styles.button} onPress={handleOtpVerification}>
                Verify OTP
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <LoginIllustration />
              <Text category='h5' style={styles.title}>Complete Registration</Text>
              <Input
                style={styles.input}
                placeholder='Full Name'
                value={fullName}
                onChangeText={setFullName}
              />
              <Input
                style={styles.input}
                placeholder='Phone Number'
                value={phoneNumber}
                disabled={true} // Phone number is already set, disable it
              />
              <Input
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <Button style={styles.button} onPress={handleRegistration}>
                Complete Registration
              </Button>
            </>
          )}
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
  },
  title: {
    textAlign: 'center',
  },
  description: {
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  otpInput: {
    width: '90%',
    marginHorizontal: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
});

export default OtpRegisterScreen;
