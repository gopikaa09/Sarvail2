import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function NewsSearch() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  // Fetch initial data (if required)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts?per_page=200'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setData(json);
      setFilteredData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const handleSearch = (searchQuery) => {
    const filtered = data.filter(item =>
      item.post_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const NewsSearchHeader = () => (
    <View style={styles.searchInputContainer}>
      <SearchInput
        placeholder="Search .."
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
    </View>
  );

  return (
    <View style={styles.flexContainer}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => <ImageCard item={item} />}
          ListHeaderComponent={NewsSearchHeader()} // Pass component, not a function call
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data available</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  searchInputContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
