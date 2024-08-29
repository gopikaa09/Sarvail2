import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Keyboard, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';
import Badge from '@/components/Badge';
import Corousel from 'react-native-reanimated-carousel'
const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters
  const [corouselData, setCoruselData] = useState([])
  // const width = Dimensions.get('window').width
  const width = 320
  useEffect(() => {
    fetchData(selectedFilters);
  }, [selectedFilters]); // Fetch data when selectedFilters changes

  const fetchData = async (categories) => {
    setLoading(true); // Set loading state before fetching new data
    try {
      const categoryQuery = categories.length > 0 ? `&category=${categories.join(',')}` : '';
      const response = await fetch(
        `http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts?per_page=10${categoryQuery}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      const corouselData = json.slice(1, 4)
      setCoruselData(corouselData)
      setData(json);
      setFilteredData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]); // Automatically filter data when query changes

  // console.log('====================================');
  // console.log(corouselData);
  // console.log('====================================');
  const handleSearch = () => {
    if (query) {
      const filtered = data.filter((item) =>
        item.post_title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    Keyboard.dismiss(); // Dismiss keyboard after search
  };

  const TopFilters = [
    { value: 'alumni-news', label: 'Alumni News' },
    { value: 'know-sarvalians', label: 'Know Sarvalians' },
    { value: 'reunions', label: 'Reunions' },
    { value: 'events', label: 'Events' },
    { value: 'school-news', label: 'School News' },
    { value: 'school-development', label: 'School Development' },
    { value: 'help-sarvailians', label: 'Help Sarvailians' },
  ];

  const handleFilters = (category) => {
    setSelectedFilters((prevSelected) => {
      if (prevSelected.includes(category)) {
        // Remove category if already selected
        return prevSelected.filter((item) => item !== category);
      } else {
        // Add category if not selected
        return [...prevSelected, category];
      }
    });
  };
  const headerComponent = () => {
    return (
      <View className="my-6 px-4">
        <View className='flex flex-row items-end'>
          <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
        </View>
        {/* <Text className="font-semibold text-gray-100 text-lg">Recent News</Text> */}
        <View className='my-1'>
          {/* <SearchInput
            query={query}         // Pass the query state
            setQuery={setQuery}   // Pass the setQuery function
            onSearch={handleSearch}  // Pass the handleSearch function
          /> */}
        </View>
        <View className='mx-2'>
          <Corousel
            data={corouselData}
            width={width}
            height={width / 2}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{ uri: item?.featured_image?.medium_large }}
                  style={{ width: width, height: width / 2 }}
                // className="m-2"
                // resizeMode="cover"
                />
              </View>
            )}
            autoPlay={true}
            autoPlayInterval={2000}
            mode={'parallax'}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row my-1.5">
            {TopFilters.map((filter, index) => (
              <Badge
                key={index}
                text={filter.label}
                isSelected={selectedFilters.includes(filter.value)}
                onPress={() => handleFilters(filter.value)} // Pass filter value to handleFilters
              />
            ))}
          </View>
        </ScrollView>

      </View>
    )
  }



  return (
    <SafeAreaView className="flex-1 bg-primary">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">Error: {error.message}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => <ImageCard item={item} />}
          ListHeaderComponent={headerComponent()}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-100 text-lg">No data available</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
