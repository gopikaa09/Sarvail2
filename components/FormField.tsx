import React, { useState, forwardRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { icons } from '@/constants';

const FormField = forwardRef(({ title, value, placeholder, handleChangeText, otherStyles, isEditable = true, onSubmitEditing, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary flex-row items-center'>
        <TextInput
          ref={ref}
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          editable={isEditable}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {
          title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
});

export default FormField;
