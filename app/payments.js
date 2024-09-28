import React, { useState } from 'react';
import PaymentOption from '../components/PaymentOptions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Keyboard, Text } from 'react-native';
import { Layout, Input, useTheme } from '@ui-kitten/components';
import { Phone } from 'phosphor-react-native';
import DraggableButton from '@/components/ConfirmRepay';
import { useLocalSearchParams, useRouter } from 'expo-router';

const PaymentOptions = () => {
    const [selected, setSelected] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const theme = useTheme();
    const router = useRouter();
    const { amount } = useLocalSearchParams();

    const validNum = (v) => v.match(/^\+256(?:75|74|70|78|77|76|3|2)\d{7}$/);

    const handleChange = (val) => {
        setPhoneNumber(val);
        if (val.match(/^\0(?:75|74|70|2)/)) {
            setSelected('AIRTEL');
        }
        if (val.match(/^\0(?:78|77|76|3)/)) {
            setSelected('MTN');
        }
        if (validNum(val)) {
            Keyboard.dismiss();
        }
    };

    const renderPhoneAccessory = () => (
        <Phone size={20} color={theme['color-primary-500']} />
    );

    const isPhoneNumberValid = validNum(phoneNumber); // Check if phone number is valid

    return (
        <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
            <View>
                <View
                    style={{
                        height: 100,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#e2e8f0',
                        borderWidth: 1,
                        borderColor: '#cbd5e1',
                        flexDirection: 'row',
                        borderRadius: 3,
                        marginVertical: 15,
                        padding: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 35,
                            color: theme['color-primary-default'],
                            textAlign: 'center',
                            fontWeight: '600',
                            marginRight: 2,
                        }}>
                        {Number(amount).toLocaleString()} /-
                    </Text>
                </View>

                <View style={{ width: '100%', marginVertical: 5 }}>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            width: '100%',
                        }}>
                        <PaymentOption type="MTN" selected={selected === 'MTN'} />
                        <PaymentOption type="AIRTEL" selected={selected === 'AIRTEL'} />
                    </View>
                </View>
            </View>

            <View style={{ marginVertical: 20 }}>
                <Input
                    label="Enter your Phone Number"
                    onChangeText={handleChange}
                    keyboardType="phone-pad"
                    placeholder="07## ### ###"
                    accessoryLeft={renderPhoneAccessory}
                    status={isPhoneNumberValid ? 'success' : 'danger'} // Optional visual feedback
                />
            </View>

            <View style={{ marginBottom: 30 }}>
                <DraggableButton
                    onSlideConfirmed={() =>
                        router.push({
                            pathname: 'processing',
                            params: {
                                amount: amount,
                                msisdn: phoneNumber,
                            },
                        })
                    }
                    disable={!isPhoneNumberValid} // Disable if phone number is invalid
                />
            </View>
        </Layout>
    );
};

export default PaymentOptions;
