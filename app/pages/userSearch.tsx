import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleStore from 'react-native-simple-store';
import axios from 'axios';
import SearchInput from '@/components/SearchInput';
import UsersCard from '@/components/UsersCard';

export default function UserSearch() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [batch, setBatch] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');

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
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      setError(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleNameSearch = () => {
    if (name.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(user =>
        user?.user_nicename?.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleBatchSearch = async () => {
    if (batch.trim() === '') {
      setFilteredData(data);
    } else {
      try {
        const response = await axios.get(
          `http://sarvail.net/wp-json/ds-custom_endpoints/v1/users?ds_batch=${batch}`,
          {
            headers: {
              "Api-Token": `Bearer ${user.token}`
            }
          }
        );
        setFilteredData(response.data);
      } catch (error) {
        setError(error);
        Alert.alert("Error", "Failed to fetch data for batch search");
      }
    }
  };

  const handleProfessionSearch = async () => {
    if (profession.trim() === '') {
      setFilteredData(data);
    } else {
      try {
        const response = await axios.get(
          `http://sarvail.net/wp-json/ds-custom_endpoints/v1/users?ds_profession=${profession}`,
          {
            headers: {
              "Api-Token": `Bearer ${user.token}`
            }
          }
        );
        setFilteredData(response.data);
      } catch (error) {
        setError(error);
        Alert.alert("Error", "Failed to fetch data for profession search");
      }
    }
  };

  useEffect(() => {
    handleNameSearch();
  }, [name, data]);
  useEffect(() => {
    handleBatchSearch()
  }, [batch])
  useEffect(() => {
    handleProfessionSearch()
  }, [profession])
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Failed to load data. Please try again later.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const SearchInputComponent = () => (
    <View className='flex flex-col gap-2 mx-3'>
      <View>
        <SearchInput
          placeholder="Search by Batch"
          query={batch}
          setQuery={setBatch}
          onSearch={handleBatchSearch}
        />
      </View>
      <View>
        <SearchInput
          placeholder="Search by Name"
          query={name}
          setQuery={setName}
          onSearch={handleNameSearch}
        />
      </View>
      <View>
        <SearchInput
          placeholder="Search by Profession"
          query={profession}
          setQuery={setProfession}
          onSearch={handleProfessionSearch}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <UsersCard user={item} />}
        ListHeaderComponent={SearchInputComponent()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // Replace 'primary' with an actual color or your theme's primary color
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
  },
});
