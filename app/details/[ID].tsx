import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, View, ActivityIndicator, StatusBar, TouchableOpacity, Platform, Dimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { LinearGradient } from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/Entypo';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

const { width } = Dimensions.get('window');

const Details = () => {
  const { ID } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const formattedDate = new Date(data?.post_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleBackStep = () => {
    console.log('Back button pressed');
    try {
      router.back();
    } catch (error) {
      console.error('Error navigating back:', error);
    }
  };


  const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
  const MAX_HEIGHT = 350;

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600 text-lg text-center">Error: {error.message}</Text>
        </View>
      ) : (
        data && (
          <ImageHeaderScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            renderHeader={() => (
              <View className="w-full h-full overflow-hidden justify-center items-center relative">
                <Image
                  source={{ uri: data?.featured_image?.large }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0, 0, 0, 0.8)']}

                  className="absolute bottom-0 w-full h-full"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 100,
                    pointerEvents: 'box-none', // Ensures this view doesn't block touch events
                  }}
                >
                  <TouchableOpacity
                    onPress={() => console.log('Test Button Pressed')}
                    style={{
                      backgroundColor: 'blue',
                      padding: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: 'white' }}>Test Button</Text>
                  </TouchableOpacity>

                </View>
                <View className="absolute bottom-4 left-2 self-start">
                  <Text className="bg-secondary-100 text-gray-100 p-2 rounded-full font-semibold mb-2 self-start">
                    {data?.categories[0]?.name}
                  </Text>
                  <Text className="text-gray-100 text-2xl font-bold mb-1" numberOfLines={2}>
                    {data?.post_title}
                  </Text>
                  <Text className="text-gray-100 text-sm">{formattedDate}</Text>
                </View>
              </View>
            )}
          >
            <TriggeringView className='bg-primary'>
              <View className='bg-primary px-4 pt-5 rounded-t-3xl relative z-1 -mt-3'>
                {data.post_content && (
                  <RenderHTML
                    contentWidth={Dimensions.get('window').width}
                    source={{ html: data.post_content }}
                    tagsStyles={tagsStyles}
                  />
                )}
              </View>
            </TriggeringView>
          </ImageHeaderScrollView >
        )
      )}
      <StatusBar barStyle="dark-content" />
    </SafeAreaView >
  );
};

const tagsStyles = {
  p: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    color: '#E2E8F0',
  },
  ul: {
    marginVertical: 1,
    paddingLeft: 20,
    color: '#E2E8F0',
  },
  li: {
    marginTop: -3,
    fontSize: 16,
    marginLeft: 2,
    lineHeight: 32,
    color: '#E2E8F0',
  },
  img: {
    width: 250,
    height: 250,
  },
  a: {
    color: 'white',
  },
};

export default Details;
