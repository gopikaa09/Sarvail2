import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
const CustomMobileField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>Mobile Number</Text>
      <View className='flex flex-row gap-x-3'>
        <View className='border-2 border-black-200 rounded-2xl h-16 px-4 w-2/12 bg-black-100 focus:border-secondary flex-row items-center'>
          <TextInput className='flex-1 text-white font-psemibold text-base w-10'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
          />
        </View>
        <View className='border-2 border-black-200 rounded-2xl h-16 px-4 w-9/12 bg-black-100 focus:border-secondary flex-row items-center'>
          <TextInput className='flex-1 text-white font-psemibold text-base w-10'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
          />
        </View>
      </View>

    </View>
  )
}

export default CustomMobileField

const styles = StyleSheet.create({})