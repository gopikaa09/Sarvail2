import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Badge({ text, onPress, isSelected }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`border-2 rounded-xl p-2 mr-2 ${isSelected ? ' border-secondary-100 text-slate-100' : 'border-white'
          }`}
      >
        <Text className={isSelected ? 'text-slate-100' : 'text-slate-50'}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
