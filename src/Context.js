import React, { createContext, useState ,useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export { AppContext, ContextProvider };

const AppContext = createContext();

const ContextProvider = ({ children }) => {
    const [selectedContact, setSelectedContact] = useState([]);
    const [checkedStatus, setCheckedStatus] = useState({});

    useEffect (() => {
        retriveCheckedStatus ();

    },[])
    useEffect (() => {
        persistCheckedStatus ();

    },[checkedStatus])

    const setSelectedContactData = (contactData) => {
        setSelectedContact(contactData);
    };
    
const updateCheckedStatus = (id, status) => {
    setCheckedStatus((prevState) => ({
      ...prevState,
      [id]: status,
    }));
  };


  

  const retriveCheckedStatus = async () => {
    try {
        const storedCheckedStatus = await AsyncStorage.getItem('checkedStatus');
        if (storedCheckedStatus){
            setCheckedStatus(JSON.parse(storedCheckedStatus))
        }
    } catch (error) {
        console.log('error Retrive checked status', error);
        
    }
}

  const persistCheckedStatus = async () =>{
  
    AsyncStorage.setItem('checkedStatus', JSON.stringify(checkedStatus))
      .then(() => console.log('Checked status persisted'))
      .catch((error) => console.log('Error persisting checked status:', error));
  };

  

    return (
        <AppContext.Provider value={{ selectedContact, setSelectedContactData,checkedStatus,updateCheckedStatus }}>
            {children}
        </AppContext.Provider>
    );
};



