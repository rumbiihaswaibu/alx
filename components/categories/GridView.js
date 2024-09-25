import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { useGetCategoriesQuery } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';

const PlaceholderItem = () => {
  return (
    <View style={styles.item}>
      <View style={styles.placeholderImage} />
      <View style={styles.placeholderText} />
    </View>
  );
};

const GridScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetCategoriesQuery();
  const router = useRouter();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push(`/category/${item.id}?index=${index}`)}
      >
        <View style={styles.item}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text
            style={{
              fontSize: 12,
              height: 35,
              textAlign: 'center',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPlaceholderItem = () => {
    return <PlaceholderItem />;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
        <Text style={styles.header}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Text appearance="hint" style={{ color: 'red', borderBottom: 'solid 2px' }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <FlatList
          data={[...Array(6)]} // Placeholder data for loading state
          renderItem={renderPlaceholderItem}
          horizontal={true}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <FlatList
          data={data?.data || []}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 86,
    borderRadius: 5,
    padding: 5,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    backgroundColor: '#E1E9EE',
    marginBottom: 10,
    borderRadius: 5,
  },
  placeholderText: {
    width: 60,
    height: 20,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
});

export default GridScreen;
