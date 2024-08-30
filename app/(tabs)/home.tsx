import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Keyboard, ScrollView, Dimensions, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';
import Badge from '@/components/Badge';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants';
const { width } = Dimensions.get('window');
const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    fetchData(selectedFilters);
  }, [selectedFilters]);

  const fetchData = async (categories) => {
    setLoading(true);
    try {
      const categoryQuery = categories.length > 0 ? `&category=${categories.join(',')}` : '';
      const response = await fetch(
        `http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts?per_page=200${categoryQuery}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      const carouselData = json.slice(1, 4);
      setCarouselData(carouselData);
      setData(json);
      setFilteredData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  const handleSearch = () => {
    if (query) {
      const filtered = data.filter((item) =>
        item.post_title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    Keyboard.dismiss();
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
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const headerComponent = () => {
    return (
      <View className="my-6">
        <View className='flex flex-row justify-between mx-2'>
          <View className='flex flex-row items-end'>
            <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <View className="flex flex-row items-center h-10 w-8/12 px-2 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
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
            >
              <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
        <View className=''>
          <Carousel
            data={carouselData}
            width={width}
            height={280}
            scrollAnimationDuration={300}
            snapEnabled={true}
            mode='parallax'
            autoPlay={true}
            autoPlayInterval={2000}
            showPagination={true}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image
                  source={{ uri: item?.featured_image?.medium_large }}
                  style={styles.image}
                />
                {/* Linear Gradient Overlay */}
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                  style={styles.background}
                />
                {/* Text Over Image */}
                <View style={styles.textContainer}>
                  <Text className='bg-secondary-100 text-slate-50 p-2 rounded-3xl font-semibold self-start my-2 opacity-80 text-xs'>{item?.categories[0]?.name}</Text>
                  <Text style={styles.text} numberOfLines={2}>{item.post_title}</Text>
                </View>
              </View>
            )}
          />

        </View>
        <View className='px-4'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row my-1.5">
              {TopFilters.map((filter, index) => (
                <Badge
                  key={index}
                  text={filter.label}
                  isSelected={selectedFilters.includes(filter.value)}
                  onPress={() => handleFilters(filter.value)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View >
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
const styles = StyleSheet.create({
  itemContainer: {
    width: width, // Ensure the container matches the full screen width for proper centering
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0, // Add horizontal margin to create space between items
  },
  image: {
    width: width * 0.9, // Adjust image width dynamically based on screen width
    height: 280, // Fixed height
    borderRadius: 10,
  },
  background: {
    position: 'absolute',
    width: width * 0.9, // Match image width for background gradient
    height: 280, // Same height as image
    borderRadius: 10,
    bottom: 0, // Position at the bottom
  },
  textContainer: {
    position: 'absolute',
    bottom: 20, // Position text a little above the bottom for better appearance
    left: 30, // Give some padding from the left
    right: 30, // Give some padding from the right
    lineHeight: 32
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a subtle shadow for better text visibility
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});


