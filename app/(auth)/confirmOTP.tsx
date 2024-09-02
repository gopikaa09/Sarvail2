import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmOTP() {
  const [form, setForm] = useState({
    username: '',
    otp_register: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const submit = async () => {
    if (form.username === "" || form.otp_register === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    console.log(form);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://www.sarvail.net/uat/wp-json/ds-custom_endpoints/v1/register/verify`,
        {
          username: form.username,
          otp_register: form.otp_register
        },
      );
      console.log(response);
      if (response.status === 200) {
        Alert.alert("Success", "OTP verified Succesfully");
        router.replace("/sign-in");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row items-end'>
            <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <Text className='text-white text-xl'>Confirm OTP</Text>
          <FormField
            title="Email"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form,
              username: e,
            })}
            otherStyles="mt-7"
            placeholder="Enter Username"
          />
          <FormField
            title="Password"
            value={form.otp_register}
            handleChangeText={(e) => setForm({
              ...form,
              otp_register: e,
            })}
            otherStyles="mt-7"
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <CustomButton
            title="Confirm OTP"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
