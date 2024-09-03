import React from 'react';
import { View, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';
import { icons } from "../constants";
import Icons from 'react-native-vector-icons/AntDesign'
const SearchInput = ({ query, setQuery, onSearch, placeholder }) => {
  const handleClear = () => {
    setQuery('')
  } // Add onSearch prop
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-12 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={() => { }}
        blurOnSubmit={false}
      />

      <TouchableOpacity
        onPress={() => {
          onSearch();
        }}
      >
        <View className='flex flex-row gap-2'>
          {
            query &&
            <Icons name="closecircleo" size={14} className="text-slate-50" color="white" onPress={handleClear} />
          }
          <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
