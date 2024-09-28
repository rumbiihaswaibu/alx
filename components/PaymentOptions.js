import React from 'react'
import { View } from 'react-native'
import AirtelMoney from '@/assets/AirtelMoney'
import MOMO from '@/assets/MOMO'

const PaymentOption = ({ selected, type }) => {
  const getBorderColor = () => {
    switch (type) {
      case 'MTN':
        if (selected) {
          return '#0C5771'
        }
        return '#FECD02'
      case 'AIRTEL':
        if (selected) {
          return '#ED1C24'
        }

      default:
        return '#dee4ec'
    }
  }
  return (
    <View
      style={{
        padding: 10,
        width: '48%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: getBorderColor(),
        // backgroundColor: type == 'MTN' ? '#FECD02' : 'white',
      }}>
      <View style={{ alignItems: 'flex-start' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{ marginRight: 4 }}>{type == 'MTN' ? <MOMO /> : <AirtelMoney />}</View>
        </View>
      </View>
    </View>
  )
}

export default PaymentOption
