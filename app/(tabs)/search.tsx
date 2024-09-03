import ImageCard from '@/components/ImageCard';
import SearchInput from '@/components/SearchInput';
import UsersCard from '@/components/UsersCard';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import NewsSearch from '../pages/newsSearch';
import UserSearch from '../pages/userSearch';

const { width } = Dimensions.get('window');

export default function Search() {
  const [index, setIndex] = useState(0);
  const UserSearchTab = () => (
    <UserSearch />
  );

  const NewsSearchtab = () => (
    <NewsSearch />
  );

  const renderScene = SceneMap({
    newsSearch: NewsSearchtab,
    userSearch: UserSearchTab,
  });

  const [routes] = useState([
    { key: 'newsSearch', title: 'News' },
    { key: 'userSearch', title: 'Student' },
  ]);

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.flexContainer}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={styles.tabBar}
                indicatorStyle={styles.tabBarIndicator}
              />
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    backgroundColor: '#161622',
    flex: 1,
  },
  searchInputContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  tabBar: {
    backgroundColor: '#161622',
  },
  tabBarIndicator: {
    backgroundColor: '#FF9C01',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
