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
  const [otpRequested, setOtpRequested] = useState(false);
  const router = useRouter();

  const requestOtp = async () => {
    if (form.username === "") {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.get(
        `http://sarvail.net/wp-json/ds-custom_endpoints/v1/login/otp?username=${form.username}`
      );
      if (response.status === 200) {
        setOtpRequested(true);
        Alert.alert("Success", "OTP has been sent to your registered contact.");
      }
    } catch (error) {
      // setOtpRequested(true);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submit = async () => {
    if (form.otp_register === "") {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://sarvail.net/wp-json/ds-custom_endpoints/v1/login`,
        {
          username: form.username,
          otp_login: form.otp_register,
        }
      );
      if (response.status === 200) {
        Alert.alert("Success", "OTP verified successfully.");
        router.replace("/sign-in");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      router.replace("/sign-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-end">
            <Text className="text-secondary-100 text-4xl">S</Text>
            <Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <Text className="text-white text-xl">Confirm OTP</Text>
          <FormField
            title="User Name"
            value={form.username}
            handleChangeText={(e) =>
              setForm({
                ...form,
                username: e,
              })
            }
            otherStyles="mt-7"
            placeholder="Enter Username"
          />
          {!otpRequested ? (
            <CustomButton
              title="Get OTP"
              handlePress={requestOtp}
              isLoading={isSubmitting}
              containerStyles="mt-7"
            />

          ) : (
            <>
              <FormField
                title="OTP"
                value={form.otp_register}
                handleChangeText={(e) =>
                  setForm({
                    ...form,
                    otp_register: e,
                  })
                }
                otherStyles="mt-7"
                placeholder="Enter OTP"
                secureTextEntry={true}
              />
              <CustomButton
                title="Confirm OTP"
                handlePress={submit}
                isLoading={isSubmitting}
                containerStyles="mt-7"
              />
            </>
          )}
          <View className='justify-center pt-5 flex-row gap-1'>
            <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
            <Link href="/sign-up" className='text-lg text-secondary font-pregular'>Sign Up</Link>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
