import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import SimpleStore from 'react-native-simple-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedIn = await SimpleStore.get('loggedIn');
        if (userLoggedIn) {
          router.replace('/home');
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to fetch login status', error);
      }
    };

    checkLoginStatus();
  }, [router]);

  const handlePasssword = () => {
    router.push('/sign-in');
  };

  const handleOTP = () => {
    router.push('/otpLoginConfirm')
  }

  return (
    // <QueryClientProvider client={queryClient}>
    <SafeAreaView className='bg-primary'>
      <View className='items-center justify-center h-full'>
        <Image source={images.sarvailLogo} className='w-44 h-56' />
        <CustomButton
          title="Login With Password"
          handlePress={handlePasssword}
          containerStyles="w-[240px] mt-6"
        />
        <CustomButton
          title="Login with OTP"
          handlePress={handleOTP}
          containerStyles="w-[240px] mt-6"
        />
      </View>
    </SafeAreaView>
    // </QueryClientProvider>
  );
}
