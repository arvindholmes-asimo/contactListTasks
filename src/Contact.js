import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, TextInput, Text, Image, View, PermissionsAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Contacts from 'react-native-contacts';
import { AppContext } from './Context';

function Contact({ navigation}) {
    const { selectedContact, setSelectedContactData } = useContext(AppContext);
    const [checkedStatus, setCheckedStatus] = useState({});
    const [text, setText] = useState('');
    const [contactList, setContactList] = useState([]);

    useEffect(() => {
        getPermission();
    }, []);

    useEffect(() => {
        updateContactListCheckedStatus();
    }, [selectedContact]);

    const updateContactListCheckedStatus = () => {
        const updatedList = contactList.map((contact) => {
          const isSelected = selectedContact.some((selected) => selected.recordID === contact.recordID);
          return {
            ...contact,
            checked: isSelected,
          };
        });
        setContactList(updatedList);
      };



    const getPermission = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Please accept bare mortal',
            }
        ).then((res) => {
            if (res === 'granted') {
                Contacts.getAll()
                    .then((contactData) => {
                        let emailJson = contactData.map((cont) => ({
                            emailAddresses: cont.emailAddresses,
                            displayName: cont.displayName,
                            phoneNumbers: cont.phoneNumbers,
                            recordID: cont.recordID,
                            checked: false,
                        }));

                        emailJson.sort((a, b) => a.displayName.localeCompare(b.displayName));

                        setContactList(emailJson);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        });
    };

    const handleCheckboxChange = (item, id) => {
        const updatedCheckedStatus = {
            ...checkedStatus,
            [id]: !checkedStatus[id],
          };
          setCheckedStatus(updatedCheckedStatus);
        const updatedList = contactList.map((contact) => {
            if (contact.recordID === id) {
                return {
                    ...contact,
                    checked: updatedCheckedStatus[id],
                };
            }
            return contact;
        });

        setContactList(updatedList);

        const selectedContacts = updatedList.filter((contact) => contact.checked);
        setSelectedContactData(selectedContacts);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: 'black' }}>
                <TouchableOpacity style={styles.contactItem} >
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>{item?.displayName}</Text>
                        {item?.phoneNumbers && item.phoneNumbers.length > 0 && (
                            <Text style={{ color: '#fff', fontSize: 15 }}>{item.phoneNumbers[0]?.number}</Text>
                        )}
                    </View>

                    <CheckBox
                        style={{ marginRight: 10, borderWidth: 2, borderColor: '#fff', borderRadius: 5,backgroundColor:'#fff' }}
                        value={item.checked}
                        onValueChange={() => handleCheckboxChange(item, item.recordID)}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const handleSearch = (value) => {
        const filteredData = contactList.filter((item) => item?.displayName.includes(text));
        setText(value);
        setContactList(filteredData);
    };

    const handleSelection = () => {
        navigation.navigate('FavouriteList',{checkedStatus});
    };

    return (
        <View style={styles.container}>
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
                        onValueChange={(value) => handleSearch(value)}
                    />
                    {/* <TouchableOpacity onPress={handleSearch}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png' }}
                            style={styles.icon}
                        />
                    </TouchableOpacity> */}
                </View>
                <TouchableOpacity onPress={handleSelection} style={{ marginRight: 20 }}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5709/5709755.png' }}
                        style={{ width: 30, height: 30, margin: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <FlatList
                    data={contactList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item?.recordID?.toString() || index.toString()}
                />
            </View>
        </View>
    );
}

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f5f6',
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
        marginVertical: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 10,
        height: 80,
    },
    section: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});





