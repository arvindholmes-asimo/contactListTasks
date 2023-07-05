import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import Contact from './Contact';
// import { Contact_Icon,
//     Multimedia_Icon
//  } from './icons/IconSrc';

function Choice({ navigation }) {



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => navigation.navigate('FavouriteList')} style={styles.option}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3771/3771518.png' }} style={{ width: 80, height: 80 }} />
                    <Text style={styles.title}>Contacts </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MediaPick')} style={styles.option}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1084/1084322.png' }} style={{ width: 80, height: 80 }} />
                    <Text style={styles.title}>Mediapicker </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff'
    }, option: {
        padding: 10,
        color: '#111',
        borderBottom: 1,
        borderColor: 'black',
        // borderWidth:1,
    }, section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, title: {
        fontSize: 16,
        color: "#111",
        marginVertical:10,
    }
})
export default Choice;