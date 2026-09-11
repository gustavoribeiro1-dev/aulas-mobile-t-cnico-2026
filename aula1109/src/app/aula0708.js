import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View, TextInput } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Usuario</Text>
      <StatusBar style="auto" />
       <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 10 }}
        />
      <Text>Senha</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginBottom: 10 }}
        />
        <Button
          title="Log In"
          onPress={() => showAlert('Simple Button pressed')}
        />

      
    </View>

    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
