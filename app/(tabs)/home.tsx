import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, Keyboard, ScrollView, Dimensions, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageCard from '@/components/ImageCard';
import Badge from '@/components/Badge';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants';
import { useRouter } from 'expo-router';
import SearchInput from '@/components/SearchInput';

const { width } = Dimensions.get('window');

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for managing refreshing
  const [searchVisible, setSearchVisible] = useState(false); // State for managing search visibility

  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current; // Reference for scroll position

  useEffect(() => {
    fetchData(selectedFilters);
  }, [selectedFilters]);

  const fetchData = async (categories) => {
    setLoading(true);
    setRefreshing(true);
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
      setRefreshing(false);
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

  const renderItem = React.useCallback(({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => {
        router.push(`/details/${item.ID}`);
      }}>
        <Image
          source={{ uri: item?.featured_image?.medium_large }}
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={styles.background}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text className='bg-secondary-100 text-slate-50 p-2 rounded-3xl font-semibold self-start my-0 opacity-80 text-xs'>{item?.categories[0]?.name}</Text>
        <Text style={styles.text} numberOfLines={2}
          onPress={() => {
            router.push(`/details/${item.ID}`);
          }}
        >{item.post_title}</Text>
      </View>
    </View>
  ), [router]);

  const headerComponent = () => (
    <View className="my-6">
      <View className='flex flex-row justify-between mx-2'>
        <View className='flex flex-row items-end'>
          <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
        </View>
      </View>

      <View className=''>
        {searchVisible && (
          <View className='px-2'>
            <SearchInput
              placeholder="Search..."
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
            />
          </View>
        )}
        <View className='px-2'>
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
        <ScrollView>
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
            renderItem={renderItem}
          />
        </ScrollView>
      </View>
    </View>
  );

  const onRefresh = useCallback(() => {
    fetchData(selectedFilters);
  }, [selectedFilters]);

  // Track scroll direction
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset > scrollY) {
          setSearchVisible(false); // Scroll down
        } else {
          setSearchVisible(true); // Scroll up
        }
        scrollY.setValue(currentOffset);
      },
    }
  );

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
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          refreshing={refreshing}
          onRefresh={onRefresh}
          onScroll={handleScroll} // Attach scroll handler
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  image: {
    width: width * 0.97,
    height: 280,
    borderRadius: 10,
  },
  background: {
    position: 'absolute',
    width: width * 0.97,
    height: 280,
    borderRadius: 10,
    bottom: 0,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    lineHeight: 32
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
