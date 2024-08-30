import { Alert, Image, Share, Text, TouchableOpacity, View, Linking } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { truncateHtml } from '@/hooks/useTruncate';
import Icons from 'react-native-vector-icons/AntDesign';

const ImageCard = ({ item }) => {
  const truncatedContent = truncateHtml(item?.post_content, 150);
  const avatar = item?.post_author === '1'
    ? 'https://media.licdn.com/dms/image/C5603AQGPN1Fj6eXLWQ/profile-displayphoto-shrink_400_400/0/1581546724198?e=2147483647&v=beta&t=ndNnjK31VXbZNDhy-EaxJZd55nt6FTu_ShrEq-Z9_Io'
    : ''; // Set to a proper URL or local path
  const router = useRouter();

  const handlePress = () => {
    // Ensure this route matches your app's route structure
    router.push(`/details/${item.ID}`);
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${item?.guid}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Format the date
  const formattedDate = new Date(item?.post_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Optional: Add a function to handle opening external links
  const handleLinkOpen = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open URL:', err);
    });
  };

  return (
    <View className="flex flex-col px-4 mb-8">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          {/* Avatar or additional content */}
        </View>
        {/* Optional menu icon or other elements */}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        className="w-full h-48 rounded-xl mt-1 relative flex justify-center items-center"
      >
        <Image
          source={{ uri: item?.featured_image?.medium_large }}
          className="w-full h-full rounded-xl mt-1"
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View className="ml-0 gap-y-1 mt-2">
        <Text className="font-psemibold text-lg text-white" numberOfLines={2}>
          {item?.post_title}
        </Text>
      </View>
      <View className='flex flex-row justify-between my-2'>
        <Text className='text-gray-400 text-sm'>{formattedDate}</Text>
        <Icons name="sharealt" size={15} color="white" onPress={handleShare} />
      </View>
      <View className="border-t border-gray-50 mt-2" />
      {/* Additional optional elements */}
    </View>
  );
};

export default ImageCard;
