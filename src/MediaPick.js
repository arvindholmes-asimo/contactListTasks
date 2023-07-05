import React ,{useState}from 'react';
import { SafeAreaView,
     Text,
      Modal,
      TouchableOpacity, 
      View ,

      StyleSheet
    } from 'react-native';

function MediaPick({ navigation }) {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)

        navigation.navigate('Choice')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}> 
            <View>
                <Text style={{color:'#111'}}>MediaPick</Text>
            </View>
                <Modal visible={!isModalVisible}  animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={()=> navigation.navigate('Camera')}
                                 style={[styles.optionButton,{backgroundColor:'lightblue'}]}
                                // onPress={() => handleOptionSelected('Option 1')}
                            >
                                <Text style={styles.optionText}>Camera</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                               style={[styles.optionButton,{backgroundColor:'yellow'}]}
                                // onPress={() => handleOptionSelected('Option 2')}
                            >
                                <Text style={styles.optionText}>Gallery</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.optionButton,{backgroundColor:'red'}]} onPress={toggleModal}
                                // onPress={() => handleOptionSelected('Option 3')}
                            >
                                <Text   style={[styles.optionText]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#f3f3f3',
        padding: 20,
        borderRadius: 5,
        position:'relative',
        width:200

      },optionButton: {
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin:10,
        borderRadius:10,
        
      },
      optionText: {
        fontSize: 16,
        color:'#111',
        textAlign:'center'

      }
      
})

export default MediaPick;