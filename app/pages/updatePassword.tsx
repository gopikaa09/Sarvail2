import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import axios from 'axios';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import SimpleStore from 'react-native-simple-store';

export default function UpdatePassword() {
  const [form, setForm] = useState({
    update_password: '',
    confirm_password: ''
  })
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const storedUser = await SimpleStore.get('user');
      setUser(storedUser);
    } catch (err) {
      console.error('Failed to get user from SimpleStore', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (form.update_password === form.confirm_password) {
      try {
        const response = await axios.post('https://www.sarvail.net/uat/wp-json/ds-custom_endpoints/v1/me/',
          {
            update_password: form.update_password
          },
          {
            headers: {
              "Api-Token": `Bearer ${user.token}`
            }
          }
        )
      } catch (err) {
        Alert.alert("error", "")
      }
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row items-end'>
            <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <Text className='text-white text-xl'>Log in to Sarvail</Text>
          <FormField
            title="Email"
            value={form.update_password}
            handleChangeText={(e) => setForm({
              ...form,
              update_password: e,
            })}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder="Enter Email.."
          />
          <FormField
            title="Password"
            value={form.confirm_password}
            handleChangeText={(e) => setForm({
              ...form,
              confirm_password: e,
            })}
            otherStyles="mt-7"
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className='justify-center pt-5 flex-row gap-1'>
            <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
            <Link href="/sign-up" className='text-lg text-secondary font-pregular'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
