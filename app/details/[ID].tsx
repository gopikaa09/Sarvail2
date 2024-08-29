import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import RenderHTML from 'react-native-render-html';

const Details = () => {
  const { ID } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://sarvail.net/wp-json/ds-custom_endpoints/v1/posts/${ID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ID]);

  return (
    <SafeAreaView className="flex-1 bg-[#1E293B]">
      {/* Move alignItems to contentContainerStyle */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-[#EF4444] text-lg">Error: {error.message}</Text>
          </View>
        ) : (
          data && (
            <View className="items-center justify-center">
              {data?.featured_image?.large ? (
                <Image
                  source={{ uri: data.featured_image.large }}
                  style={{ width: Dimensions.get('window').width - 40, height: 240 }} // Replace className with style
                  className="rounded-lg mt-5"
                  resizeMode="cover"
                />

              ) : (
                <Text className="text-[#EF4444] text-lg">Image not available</Text>
              )}
              <Text className="font-bold text-xl text-[#E2E8F0] mt-3 mb-2">{data?.post_title}</Text>

              {/* Render HTML content */}
              {data.post_content && (
                <RenderHTML
                  contentWidth={Dimensions.get('window').width - 40}
                  source={{ html: data.post_content }}
                  tagsStyles={tagsStyles}
                />
              )}
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const tagsStyles = {
  p: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#E2E8F0', // Slate-100 color
  },
  ul: {
    marginVertical: 1,
    paddingLeft: 20,
    color: '#E2E8F0', // Slate-100 color
  },
  li: {
    marginTop: -3,
    fontSize: 16,
    marginLeft: 2,
    lineHeight: 32,
    color: '#E2E8F0', // Slate-100 color
  },
  img: {
    width: 250,
    height: 250,
  },
};

export default Details;
