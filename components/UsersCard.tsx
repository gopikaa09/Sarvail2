import React from 'react';
import { View, Text, Image } from 'react-native';

export default function UsersCard({ user }) {
  return (
    <View className="flex-row items-center bg-slate-100 p-4 rounded-2xl my-2 mx-4">
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
            <View className="w-12 h-12 rounded-full bg-slate-200 justify-center items-center">
              <Text className="text-lg font-bold text-black">
                {user?.user_display_name?.[0]?.toUpperCase()} {/* Display the first letter of the user's name */}
              </Text>
            </View>
          </>
      }


      {/* User Details */}
      <View className="ml-4">
        <Text className="text-base font-semibold text-slate-900">{user?.user_display_name}</Text>
        <Text className="text-sm text-slate-600">{user?.user_email}</Text>
        <Text className="text-sm text-slate-600">{user?.ds_profession}</Text>
        <Text className="text-sm text-slate-600">{user?.ds_batch}</Text>
      </View>
    </View>
  );
}
