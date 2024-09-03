import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from "../../constants"

const TabLayout = () => {
  const TabIcon = ({ icon, color, name, focused, }) => {
    return (
      <View className='items-center justify-center gap-1'>
        <Image source={icon}
          resizeMode='contain'
          tintColor={color}
          className='w-6 h-6'
        />
        <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text>
      </View >
    )
  }
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FF9C01',
          tabBarInactiveTintColor: '#565756',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#050005',
            height: 84
          },
          headerShown: false
        }}


      >
        <Tabs.Screen name='home' options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='search' options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.search}
              color={color}
              name="Search"
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='peoples' options={{
          title: "Peoples",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.peoples}
              color={color}
              name="Peoples"
              focused={focused}
            />
          )
        }} />

        <Tabs.Screen name='profile' options={{
          title: "Profile",
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: '#161622',
          //   // Set header background color
          // },
          // headerTintColor: '#FFFFFF',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }} />
      </Tabs>

    </>
  )
}

export default TabLayout
