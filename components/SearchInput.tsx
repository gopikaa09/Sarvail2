import React from 'react';
import { View, TouchableOpacity, Image, TextInput, Keyboard } from 'react-native';
import { icons } from "../constants";

const SearchInput = ({ query, setQuery, onSearch }) => { // Add onSearch prop
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search..."
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
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
