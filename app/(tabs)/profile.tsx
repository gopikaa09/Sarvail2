import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleStore from 'react-native-simple-store';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Icons from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    ds_batch: '',
    email: '',
    ds_res_mobile: '',
    country_code: '',
    password: '',
    ds_profession: ''
  });
  const [token, setToken] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SimpleStore.get('user');
        if (storedUser) {
          setUser(storedUser);
          setForm({
            username: storedUser.user.user_nicename || '',
            first_name: storedUser.user_meta?.first_name || '',
            last_name: storedUser.user_meta?.last_name || '',
            ds_batch: storedUser.user.ds_batch || '',
            email: storedUser.user.user_email || '',
            ds_res_mobile: storedUser.ds_res_mobile || '',
            country_code: storedUser.country_code || '',
            password: '',
            ds_profession: storedUser.user.ds_profession || ''
          });
          setToken(storedUser.token); // Set token for API requests
          setProfileImage(storedUser.user.ds_profile_pic || null); // Set profile image
        } else {
          console.warn('No user data found in SimpleStore');
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const defaultImage = 'https://via.placeholder.com/150';

  const handleLogout = async () => {
    await SimpleStore.save('loggedIn', false);
    Alert.alert("Success", "Logged out successfully");
    router.replace('/sign-in');
  };

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      uploadProfilePicture(uri);
    } else {
      Alert.alert('Cancelled', 'Image picking was cancelled');
    }
  };

  const uploadProfilePicture = async (imageUri) => {
    try {
      const response = await axios.put('http://sarvail.net/wp-json/ds-custom_endpoints/v1/me', {
        params: {
          ds_profile_pic: imageUri
        },
        headers: {
          "Api-Token": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Alert.alert("Success", "Please select Image ");
        setProfileImage(response.data.ds_profile_pic); // Update local profile image state
      } else {
        Alert.alert("Error", "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
      Alert.alert("Error", "An error occurred while updating the profile picture");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post('http://sarvail.net/wp-json/ds-custom_endpoints/v1/me', {
        first_name: form.first_name,
        last_name: form.last_name,
        ds_batch: form.ds_batch,
        ds_res_mobile: form.ds_res_mobile,
        user_email: form.email,
      }, {
        headers: {
          "Api-Token": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        setUser({ ...user, user: { ...user.user, ...response.data } }); // Update the local user state
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      Alert.alert("Error", "An error occurred while updating the profile");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className='bg-primary flex-1'>
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}>
        <View>
          <TouchableOpacity
            onPress={openPicker}
          >
            <Image
              source={{ uri: profileImage || defaultImage }}
              style={{ width: 80, height: 80 }}
              className="rounded-full mt-5"
              resizeMode="cover"
            />
            <View className='absolute left-14 top-20 bg-black-100 rounded-2xl'>
              <Icons name="pencil" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
        <Text className='text-white font-semibold text-lg my-2'>{form.first_name} {form.last_name}</Text>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
          placeholder="Your unique username"
        />
        <FormField
          title="First Name"
          value={form.first_name}
          handleChangeText={(e) => setForm({ ...form, first_name: e })}
          otherStyles="mt-7"
          placeholder="First Name"
        />
        <FormField
          title="Last Name"
          value={form.last_name}
          handleChangeText={(e) => setForm({ ...form, last_name: e })}
          otherStyles="mt-7"
          placeholder="Last Name"
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType='email-address'
          placeholder="Enter Email.."
        />
        <FormField
          title="Batch"
          value={form.ds_batch}
          handleChangeText={(e) => setForm({ ...form, ds_batch: e })}
          otherStyles="mt-7"
          placeholder="Enter Batch.."
        />
        <FormField
          title="Profession"
          value={form.ds_profession}
          handleChangeText={(e) => setForm({ ...form, ds_profession: e })}
          otherStyles="mt-7"
          placeholder="Enter your Profession.."
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }} className='mb-4'>
          <CustomButton
            title="Update"
            handlePress={handleUpdate} // Add the update handler
            containerStyles="mt-7 px-5 min-h-[50px]"
          />
          <CustomButton
            title="Log Out"
            handlePress={handleLogout}
            containerStyles="bg-white mt-7 px-5 py-2 min-h-[50px]"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
