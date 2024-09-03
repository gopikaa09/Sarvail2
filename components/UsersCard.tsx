import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function UsersCard({ user }) {
  const navigate = useRouter();

  const handlePress = () => {
    navigate.push(`/userDetails/${user.id}`); // Adjust to your details page route
  };
  return (
    <View className="flex-row items-center bg-black-100 p-4 rounded-2xl my-2 mx-4 border-black-200"
    >
      <TouchableOpacity
        onPress={handlePress}
      >
        {/* Avatar with Initial */}
        {
          user?.ds_profile_pic ? <>
            <Image
              source={{ uri: user?.ds_profile_pic }}
              style={{ width: 50, height: 50 }}
              className="rounded-full mt-5"
              resizeMode="cover"
            />
          </> :
            <>
              <View className="w-12 h-12 rounded-full bg-slate-100 justify-center items-center">
                <Text className="text-lg font-bold text-black">
                  {user?.user_display_name?.[0]?.toUpperCase()}
                </Text>
              </View>
            </>
        }
      </TouchableOpacity>


      <TouchableOpacity
        onPress={handlePress}
      >
        <View className="ml-4">
          <Text className="text-base font-semibold text-slate-100"
            onPress={handlePress}
          >{user?.user_display_name}</Text>
          {/* <Text className="text-sm text-slate-600">{user?.user_email}</Text> */}
          <Text className="text-sm text-slate-200">{user?.ds_profession}</Text>
          <Text className="text-sm text-slate-200">{user?.ds_batch}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}
