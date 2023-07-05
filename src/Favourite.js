import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, FlatList, Image, View } from 'react-native';

import { AppContext } from './Context';

export default function FavouriteList({ navigation, checkedStatus ,handleCheckboxChange }) {
    const { selectedContact, setSelectedContactData } = useContext(AppContext);

    const [selectedData, setSelectedData] = useState([]);
    const [text, setText] = useState('');


    useEffect(() => {
        setSelectedData(selectedContact);
    }, [selectedContact]);

    const handleDelete = (item) => {
        const updatedList = selectedContact.filter((contact) => contact.recordID !== item.recordID);
        setSelectedContactData(updatedList);

        const updatedStatus = { ...checkedStatus };
         updatedStatus[item.recordID];
         console.log('updatedStatus',updatedStatus,item.recordID);
        handleCheckboxChange(item,item.recordID); 
    };
    

    const handleSearch = (value) => {
        const filteredData = selectedData.filter((item) => item?.displayName.includes(text));
        setText(value);
        console.log();
        setSelectedData(filteredData);
    };

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.contactItem}>
                    <View>
                        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>{item?.displayName}</Text>
                        {item?.phoneNumbers && item.phoneNumbers.length > 0 && (
                            <Text style={{ color: '#000', fontSize: 15 }}>{item.phoneNumbers[0]?.number}</Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item)}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6096/6096937.png' }}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={{ flex: 1, color: 'blue', fontSize: 20, fontWeight: 'bold' }}>Favourite List</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Contact', { selectedContacts: selectedData })}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png' }}
                        style={{ width: 30, height: 30, margin: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.searchBar}>
                    <View>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8089/8089114.png' }}
                            style={{ width: 30, height: 30, margin: 10 }}
                        />
                    </View>
                    <TextInput
                        value={text}
                        placeholder="Search contact"
                        placeholderTextColor="#111"
                        style={{ flex: 1, paddingLeft: 10, color: '#000' }}
                        onChange={(value) =>handleSearch
                            (value)}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png' }}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={selectedData}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.recordID + index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightBlue',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10,
        marginTop: 10,
        padding: 15,
        marginHorizontal: 10,
        height: 80,
    },
    searchBar: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: '#f4f4f4',
        borderColor: '#333',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});



 

