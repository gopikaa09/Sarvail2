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
  const [query, setQuery] = useState(''); // Add state for search query

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
    setLoading(true); // Set loading state before fetching new data
    try {
      const response = await axios.get(
        'http://sarvail.net/wp-json/ds-custom_endpoints/v1/users',
        {
          headers: {
            "Api-Token": `Bearer ${user.token}` // Replace with your actual token or other headers
          }
        }
      );

      if (response.status === 200) { // Axios uses response status for checking successful responses
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
      setLoading(false); // Reset loading state after fetching
    }
  };

  // Search handler
  const handleSearch = () => {
    if (query.trim() === '') {
      setFilteredData(data); // If query is empty, show all data
    } else {
      const filtered = data.filter((user) =>
        user?.user_nicename?.toLowerCase().includes(query.toLowerCase()) // Filter users by name
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    handleSearch(); // Call handleSearch whenever query changes
  }, [query]);

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
        <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
      </View>
      <Text className="font-semibold text-gray-100 text-lg mb-3">Peoples</Text>
      <View>
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      </View>
    </View>
  )

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <FlatList
        data={filteredData} // Use filteredData here
        keyExtractor={(item) => item?.id?.toString()} // Convert ID to string
        renderItem={({ item }) => <UsersCard user={item} />}
        ListHeaderComponent={SearchInputComponent()}
      />
    </SafeAreaView>
  );
}
