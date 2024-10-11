import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    const setupCallKeep = async () => {
      if (Platform.OS === 'android') {
        const permission = await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
        if (permission !== RESULTS.GRANTED) {
          Alert.alert('Permission required', 'READ_PHONE_STATE permission is required to manage calls');
          return;
        }
      }

      const options = {
        ios: {
          appName: 'MyApp', 
        },
        android: {
          alertTitle: 'Permissions Required',
          alertDescription: 'This app needs permission to access your phone calls.',
          cancelButton: 'Cancel',
          okButton: 'OK',
          additionalPermissions: [PERMISSIONS.ANDROID.CALL_PHONE],
        },
      };

      try {
        await RNCallKeep.setup(options); 
        RNCallKeep.setAvailable(true); 
        console.log('CallKeep setup complete');
      } catch (error) {
        console.error('CallKeep setup error:', error);
      }
    };

    setupCallKeep();
  }, []);

  const onReceiveCall = () => {
    const callUUID = '12345678-1234-1234-1234-123456789012'; 
    const handle = 'John Doe'; 
    RNCallKeep.displayIncomingCall(callUUID, handle);
  };

  const onMakeCall = () => {
    const callUUID = '87654321-4321-4321-4321-210987654321'; 
    const handle = 'Jane Smith'; 
    RNCallKeep.startCall(callUUID, handle, 'generic', true); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native CallKeep Demo</Text>
      <Button title="Receive Call" onPress={onReceiveCall} />
      <Button title="Make Call" onPress={onMakeCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
