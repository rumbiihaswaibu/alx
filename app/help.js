import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Layout, List, ListItem, Divider, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';
import { ArrowLeft, Bell, Headphones, WhatsappLogo, Globe, FacebookLogo, TwitterLogo, InstagramLogo } from "phosphor-react-native";

const HelpCenterScreen = ({ navigation }) => {

  const data = [
    { title: 'Customer Service', icon: () => <Headphones size={20} /> },
    { title: 'Whatsapp', icon: () => <WhatsappLogo size={20} /> },
    { title: 'Website', icon: () => <Globe size={20} /> },
    { title: 'Facebook', icon: () => <FacebookLogo size={20} /> },
    { title: 'Twitter', icon: () => <TwitterLogo size={20} /> },
    { title: 'Instagram', icon: () => <InstagramLogo size={20} /> },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      accessoryLeft={item.icon}
    //   accessoryRight={() => <Icon name='arrow-ios-forward' />}
      style={styles.listItem}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Divider />
      <Layout style={styles.container}>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listItem: {
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
  },
});

export default HelpCenterScreen;
