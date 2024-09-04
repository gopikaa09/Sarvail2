import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserName() {
  const [form, setForm] = useState({
    username: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView bounces={false}>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <View className='flex flex-row items-end'>
            <Text className='text-secondary-100 text-4xl'>S</Text><Text className="font-semibold text-3xl text-gray-100">arvail</Text>
          </View>
          <Text className='text-white text-xl'>Log in to Sarvail</Text>
          <FormField
            title="Email"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form,
              username: e,
            })}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder="Enter Email.."
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
