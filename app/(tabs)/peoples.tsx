import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleStore from 'react-native-simple-store';
import axios from 'axios';
import SearchInput from '@/components/SearchInput';
import UsersCard from '@/components/UsersCard';

export default function Peoples() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); // State for managing refreshing

  const getUser = async () => {
    try {
      const storedUser = await SimpleStore.get('user');
      setUser(storedUser);
    } catch (err) {
      console.error('Failed to get user from SimpleStore', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://sarvail.net/wp-json/ds-custom_endpoints/v1/users',
        {
          headers: {
            "Api-Token": `Bearer ${user.token}`
          }
        }
      );

      if (response.status === 200) {
        const json = response.data;
        setData(json);
        setFilteredData(json);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false); // Ensure to stop the refreshing animation after fetching data
    }
  };

  // Implement handleRefresh function to fetch data on pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <View className='flex-1 justify-center items-center'>
          <Text className="text-white">Failed to load data. Please try again later.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SearchInputComponent = () => (
    <View className='my-6 px-4'>
      <View className='flex flex-row items-end'>
        <Text className='text-secondary-100 text-4xl'>S</Text>
        <Text className="font-semibold text-3xl text-gray-100">arvail</Text>
      </View>
      <Text className="font-semibold text-gray-100 text-lg mb-3">Peoples</Text>
      {/* Uncomment and modify as needed */}
      {/* <View>
        <SearchInput
          placeholder={"Search..."}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      </View> */}
    </View>
  );

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <UsersCard user={item} />}
        ListHeaderComponent={SearchInputComponent()}
        refreshing={refreshing} // Use refreshing state
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}
