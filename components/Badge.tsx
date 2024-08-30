import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Badge({ text, onPress, isSelected }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`rounded-2xl p-1.5 mr-2 ${isSelected ? ' bg-secondary-100 text-slate-100 border-secondary-200' : 'border-white border'
          }`}
      >
        <Text className={`text-xs ${isSelected ? 'text-slate-200 font-semibold' : 'text-slate-100'}`}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
