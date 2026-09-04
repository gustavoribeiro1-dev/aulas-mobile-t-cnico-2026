import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View id='header' style={styles.header}>
        <View>
          <View style={styles.circulo}></View>
        </View>
        <View>
          <Text style={styles.titulo}>React Native</Text>
          <Text style={styles.subtitulo}>Avaliação 04/09</Text>
        </View>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
        />
        <Pressable style={styles.botao}>
          <Text style={styles.texto}>ENVIAR</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  circulo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: 'blue',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    color: 'gray',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 10, 
    width: 200, 
    marginBottom: 10
  },
  botao: {
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#4C8BF5'
  },
  texto: {
    color: '#FFF',
  }
});
