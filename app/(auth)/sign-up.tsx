import React, { useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import axios from 'axios';

const SignUp = () => {
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

  const [isSubmitting, setisSubmitting] = useState(false);

  // Refs for each field
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const batchRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const professionRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = async () => {
    console.log(form);
    setisSubmitting(true);
    try {
      const response = await axios.post(
        `https://sarvail.net/wp-json/ds-custom_endpoints/v1/register`,
        {
          username: form.username,
          first_name: form.first_name,
          last_name: form.last_name,
          ds_batch: form.ds_batch,
          email: form.email,
          ds_res_mobile: form.ds_res_mobile,
          country_code: form.country_code,
          password: form.password,
          ds_profession: form.ds_profession
        },
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Invalid username or password');
      }
      if (response.status === 200) {
        Alert.alert("Success", "User registered successfully");
        router.replace("/otpRegisterConfirm");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row items-end'>
            <Text className='text-secondary-100 text-4xl'>S</Text>
            <Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <Text className='text-white text-2xl'>Sign up to Sarvail</Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Your unique username"
            onSubmitEditing={() => firstNameRef.current.focus()}
          />
          <FormField
            ref={firstNameRef}
            title="First Name"
            value={form.first_name}
            handleChangeText={(e) => setForm({ ...form, first_name: e })}
            otherStyles="mt-7"
            placeholder="First Name"
            onSubmitEditing={() => lastNameRef.current.focus()}
          />
          <FormField
            ref={lastNameRef}
            title="Last Name"
            value={form.last_name}
            handleChangeText={(e) => setForm({ ...form, last_name: e })}
            otherStyles="mt-7"
            placeholder="Last Name"
            onSubmitEditing={() => batchRef.current.focus()}
          />
          <FormField
            ref={batchRef}
            title="Batch"
            value={form.ds_batch}
            handleChangeText={(e) => setForm({ ...form, ds_batch: e })}
            otherStyles="mt-7"
            placeholder="Enter Batch.."
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <FormField
            ref={emailRef}
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder="Enter Email.."
            onSubmitEditing={() => mobileRef.current.focus()}
          />
          <FormField
            ref={mobileRef}
            title="Mobile Number"
            value={form.ds_res_mobile}
            handleChangeText={(e) => setForm({ ...form, ds_res_mobile: e })}
            otherStyles="mt-7"
            placeholder="Enter Mobile Number"
            onSubmitEditing={() => professionRef.current.focus()}
          />
          <FormField
            ref={professionRef}
            title="Profession"
            value={form.ds_profession}
            handleChangeText={(e) => setForm({ ...form, ds_profession: e })}
            otherStyles="mt-7"
            placeholder="Enter your Profession.."
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormField
            ref={passwordRef}
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter Password"
            onSubmitEditing={submit}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className='justify-center pt-5 flex-row gap-1 items-center'>
            <Text className='text-lg text-gray-100 font-pregular'>Already have an account ?</Text>
            <Link href="/sign-in" className='text-lg text-secondary font-pregular'>Login</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
