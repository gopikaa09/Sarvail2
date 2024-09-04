import React, { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import axios from 'axios';
import SimpleStore from 'react-native-simple-store';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const passwordRef = useRef(null);

  const handleEmailSubmit = () => {
    passwordRef.current.focus(); // Move focus to password field
  };

  const handlePasswordSubmit = async () => {
    await submit(); // Submit form when password field is submitted
  };

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return; // Exit early if fields are not filled
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `https://sarvail.net/wp-json/ds-custom_endpoints/v1/login`,
        {
          username: form.email,
          password: form.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Invalid username or password');
      }

      const userData = response.data; // Get user data from the response

      // Save user data to local storage
      await SimpleStore.save('user', userData);
      await SimpleStore.save('loggedIn', true);
      console.log(userData);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView className='flex-1'
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
    >
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView bounces={false}>
          <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
            <View className='flex flex-row items-end'>
              <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
            </View>
            <Text className='text-white text-xl'>Log in to Sarvail</Text>
            <FormField
              title="User Name"
              value={form.email}
              handleChangeText={(e) => setForm({
                ...form,
                email: e,
              })}
              otherStyles="mt-7"
              keyboardType='email-address'
              placeholder="Enter User Name.."
              onSubmitEditing={handleEmailSubmit} // Move focus to password field
            />
            <FormField
              ref={passwordRef}
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({
                ...form,
                password: e,
              })}
              otherStyles="mt-7"
              placeholder="Enter Password"
              secureTextEntry={true}
              onSubmitEditing={handlePasswordSubmit} // Submit form
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
    </KeyboardAvoidingView>
  );
};

export default SignIn;
