import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native-safe-area-context';
import { CameraScreen } from 'react-native-camera-kit';
import ImagePicker from 'react-native-image-picker';


function Camera(props) {
    const [isPermitted, setIsPermitted] = useState(false);
    const [clickImage, setClickImage] = useState([]);


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };


    return (
        <SafeAreaView >
            <Text>Camera</Text>

        </SafeAreaView>
    );
}



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f4f5f6',

//     }})
export default Camera;