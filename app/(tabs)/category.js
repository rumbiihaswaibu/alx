import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetCategoriesQuery } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { Layout, Menu, MenuGroup, MenuItem, Drawer, DrawerItem, Divider } from '@ui-kitten/components';
import { Link, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


const StarIcon = (props) => (
    <Icon
        {...props}
        size={40}
        style={{ height: 80 }}
        name='star'
    />
);

const SidebarMenu = ({ route }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);
    const { data, isLoading, error } = useGetCategoriesQuery();
    const [selectedIndex, setSelectedIndex] = useState({ row: route?.params?.index || 0 });
    const router = useRouter()

    useEffect(() => {
        if (route?.params?.category) {
            setExpandedCategory(route.params.category);
        } else if (data?.data && data.data.length > 0) {
            // Set the first category as the default expanded category
            setExpandedCategory(data.data[0].id);
        }
    }, [route?.params, data]);

    const toggleCategory = (categoryId) => {
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
        setExpandedSubcategory(null); // Reset subcategory state when changing categories
    };

    const renderSubcategories = (category) => {
        if (!category || !category.children) return null;

        return category.children.map((subcategory) => {
            if (expandedSubcategory === subcategory.id && subcategory.children) {
                return (
                    <MenuGroup
                        title={subcategory.name}
                        key={subcategory.id}
                        accessoryLeft={StarIcon}
                    >
                        {subcategory.children.map((subsubcategory) => (
                            <MenuItem
                                key={subsubcategory.id}
                                title={subsubcategory.name}
                            />
                        ))}
                    </MenuGroup>
                );
            }
            return (
                <MenuItem
                    title={subcategory.name}
                    key={subcategory.id}
                    onPress={() => router.push(`/ads/category/${subcategory.id}`)}
                />
            );
        });
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error fetching categories.</Text>;
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Categories' }} />
            <Divider />
            <View style={styles.container}>
                <Layout style={styles.sidebar}>
                    {data?.data && (
                        <Drawer
                            selectedIndex={selectedIndex}
                            onSelect={(index) => setSelectedIndex(index)}
                        >
                            {data.data.map((item) => (
                                <DrawerItem
                                    style={styles.categoryItem}
                                    key={item.id}
                                    title={item.name}
                                    onPress={() => toggleCategory(item.id)}
                                />
                            ))}
                        </Drawer>
                    )}
                </Layout>
                <Menu style={styles.subcategoryView}>
                    {expandedCategory && renderSubcategories(data.data.find((category) => category.id === expandedCategory))}
                </Menu>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        background: 'white',
    },
    sidebar: {
        width: 130,
        padding: 10,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    categoryItem: {
        paddingVertical: 10,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    subcategoryView: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default SidebarMenu;
