import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
// import colors from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const ProductCard = ({ imageUrl, id, name, price, location }) => {
  const router = useNavigation();
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.navigate('AdDetails', { id })}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../assets/placeholder.png')
          }
          style={styles.image}
        />
        <Text style={styles.price} numberOfLines={1}>
          UGX {price?.toLocaleString()}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.location}>
          {location?.city} , {location?.country}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const LoadingGridCard = () => (
  <View style={[styles.card, styles.cardBorder]}>
    <View style={styles.imagePlaceholder} />
    <View style={styles.textPlaceholder} />
    <View style={styles.textPlaceholder} />
    <View style={styles.textPlaceholder} />
  </View>
);

const GridScreen = () => {
  return (
      <FlatList
        data={[...Array(6).keys()]}
        renderItem={({ item }) => <LoadingGridCard key={item} />}
        numColumns={2}
        keyExtractor={(item) => String(item)}
        scrollEnabled={false}
      />
  );
};

const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Feather name="shopping-cart" size={64}  />
    <Text style={styles.emptyTitle}>No Items Found</Text>
    <Text style={styles.emptySubtitle}>Try adjusting your search or filter options.</Text>
  </View>
);

const GridView = ({ data, isLoading }) => {
  if (isLoading) return <GridScreen />;

  const renderItem = ({ item }) => (
    <ProductCard
      imageUrl={item.imageUrl}
      id={item._id}
      name={item.title}
      price={item.price}
      location={item.store?.location}
    />
  );

  return (
    <FlatList
      data={data?.data.docs}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item) => item._id}
      scrollEnabled={false}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    // borderColor: colors.blackDividers,
    margin: 5,
    height: 264,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  price: {
    fontSize: 16,
    // color: colors.blackText,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    // color: colors.blackSecondaryText,
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    // color: colors.blackSecondaryText,
  },
  imagePlaceholder: {
    height: 160,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
    borderRadius: 5,
  },
  textPlaceholder: {
    height: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 5,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    // color: colors.blackSecondaryText,
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    height:200,
    marginTop: 150
  },
  emptyTitle: {
    fontSize: 18,
    // color: colors.blackText,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 14,
    // color: colors.blackSecondaryText,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
});

export default GridView;
