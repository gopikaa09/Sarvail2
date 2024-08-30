import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import SimpleStore from 'react-native-simple-store';
const { width } = Dimensions.get('window')
export default function PeopleDetails() {
  const { userId } = useLocalSearchParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedUser = await SimpleStore.get('user');
        if (storedUser && storedUser.token) {
          setToken(storedUser.token);
        }
      } catch (err) {
        console.error('Error fetching token:', err);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch(`http://sarvail.net/wp-json/ds-custom_endpoints/v1/users?id=${userId}`, {
          method: 'GET',
          headers: {
            'Api-Token': `Bearer ${token}` // Use the fetched token here
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]); // Depend on `token` to ensure it's available before fetching data

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  console.log('====================================');
  console.log(userData);
  console.log('====================================');
  return (
    <View style={styles.container}>
      <View>
        {userData ? (
          <>
            <View className=" items-center"
            >
              {/* Avatar with Initial */}
              {
                userData?.user?.ds_profile_pic ? <>
                  <View className={`bg-slate-100 h-32 w-96 absolute`}>

                  </View>
                  <Image
                    source={{ uri: userData?.user?.ds_profile_pic }}
                    style={{ width: 100, height: 100 }}
                    className="rounded-full mt-5 relative top-16"
                    resizeMode="cover"
                  />
                </> :
                  <>
                    <View className="w-28 h-28 rounded-full bg-slate-200 justify-center items-center relative top-16">
                      <Text className="text-lg font-bold text-black">
                        {userData?.user?.user_display_name?.[0]?.toUpperCase()} {/* Display the first letter of the user's name */}
                      </Text>
                    </View>
                  </>
              }


              <View className="ml-4 items-center relative top-16">
                <Text className="text-lg font-semibold text-slate-100 mt-4"
                >{userData?.user?.user_display_name}</Text>
                {/* <Text className="text-sm text-slate-600">{user?.user_email}</Text> */}
                <Text className="text-sm text-slate-100 my-1">{userData?.user?.ds_batch}</Text>
              </View>

            </View>
            <View className='flex gap-y-2 ml-2 relative top-20'>
              <Text className='text-slate-50 text-xl'>Personal Details</Text>
              <View className='flex gap-2.5'>
                <Text className='text-slate-50'>First Name : {userData?.user?.user_nicename}</Text>
                <Text className='text-slate-50'>Batch : {userData?.user?.ds_batch}</Text>
                <Text className='text-slate-50'>Email : {userData?.user?.user_email}</Text>
                <Text className='text-slate-50'>Mobile : {userData?.user_meta?.ds_res_mobile} || {userData?.user_meta?.ds_off_mobile}</Text>
                <Text className='text-slate-50'>Profession : {userData?.user?.ds_profession}</Text>
                <Text className='text-slate-50 leading-6'>Address : {userData?.user_meta?.ds_res_address},{userData?.user_meta?.ds_res_city},{userData?.user_meta?.ds_res_state},{userData?.user_meta?.ds_res_pin}</Text>
              </View>
            </View>
            {/* Add more fields as needed */}
          </>
        ) : (
          <Text style={styles.text}>No user data available</Text>
        )}
      </View>
      <StatusBar barStyle="dark-content" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginVertical: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 18,
    textAlign: 'center',
  },
});
