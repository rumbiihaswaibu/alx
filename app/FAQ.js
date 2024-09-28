import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, Divider, Input, Tab, TabBar, Text } from '@ui-kitten/components';
import { ArrowLeft, Bell, CaretDown } from "phosphor-react-native";

const FAQScreen = ({ navigation }) => {

    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

    const FAQItem = ({ question, answer }) => (
        <Layout style={styles.faqItem}>
            <Text category="s1" style={styles.faqQuestion}>{question}</Text>
            <Text category="p2" appearance="hint">{answer}</Text>
        </Layout>
    );

    return (
        <Layout style={{backgroundColor:'white'}} >
            <Divider style={{ marginBottom: 10 }} />

            {/* Tabs */}
            <TabBar selectedIndex={selectedTabIndex} onSelect={index => setSelectedTabIndex(index)}>
                <Tab title="General" />
                <Tab title="Account" />
                <Tab title="Service" />
                <Tab title="Payment" />
            </TabBar>

            {/* Search Bar */}
            <Layout style={styles.searchBar}>
                <Input
                    placeholder="Search for questions..."
                    accessoryRight={() => <CaretDown size={20} />}
                />
            </Layout>
            <Divider style={{
                height: 1,
                // backgroundColor: '#ccc',
                shadowColor: '#000', // Shadow color
                shadowOffset: { width: 0, height: 2 }, // Offset to give the shadow a bottom position
                shadowOpacity: 0.25, // How transparent the shadow is
                shadowRadius: 3.84, // How blurry the shadow is
                elevation: 3, // Only for Android, controls the shadow depth
            }} />

            {/* FAQs */}
            <ScrollView style={styles.container}>
                <FAQItem
                    question="How do I make a purchase?"
                    answer="When you find a product you want to purchase, tap on it to view the product details, and then tap the 'Add to Cart' button."
                />
                <FAQItem
                    question="What payment methods are accepted?"
                    answer="We accept a variety of payment methods including credit/debit cards, PayPal, and more."
                />
                <FAQItem
                    question="How do I track my orders?"
                    answer="Go to your order history and select the order you want to track to see the latest updates."
                />
                <FAQItem
                    question="Can I cancel or return an order?"
                    answer="Yes, you can cancel or return an order within a specified time frame after placing it."
                />
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        padding: 16,
        backgroundColor: '#fff',
    },
    faqItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E9F2',
    },
    faqQuestion: {
        marginBottom: 8,
    },
});

export default FAQScreen;
