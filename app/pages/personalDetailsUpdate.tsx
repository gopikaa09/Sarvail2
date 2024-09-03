import FormField from '@/components/FormField';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalDetailsUpdate() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    ds_gender: '',
    ds_res_mobile: '',
    ds_batch: '',
  })
  const handleUpdate = () => {

  }
  return (
    <SafeAreaView>

      <FormField
        title="First Name"
        value={form.last_name}
        handleChangeText={(e) => setForm({ ...form, last_name: e })}
        otherStyles="mt-7"
        placeholder="Last Name"
      />
      <FormField
        title="Gender"
        value={form.ds_gender}
        handleChangeText={(e) => setForm({ ...form, ds_gender: e })}
        otherStyles="mt-7"
        placeholder="Gender"
      />
      <FormField
        title="Mobile Number"
        value={form.ds_res_mobile}
        handleChangeText={(e) => setForm({ ...form, ds_res_mobile: e })}
        otherStyles="mt-7"
        placeholder="Mobile Number"
      />
      <FormField
        title="Batch"
        value={form.ds_batch}
        handleChangeText={(e) => setForm({ ...form, ds_batch: e })}
        otherStyles="mt-7"
        placeholder="First Name"
      />
      <CustomButton
        title="Update"
        handlePress={handleUpdate} // Add the update handler
        containerStyles="mt-7 px-5 min-h-[50px]"
      />
    </SafeAreaView>
  );
}