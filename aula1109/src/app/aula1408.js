import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View id='header' style={styles.header}>
        <View>
          <View style={styles.circulo}></View>
        </View>
        <View>
          <Text style={styles.titulo}>Olá, Estudante</Text>
          <Text style={styles.subtitulo}>Bem-vindo ao seu painel</Text>
        </View>
      </View>

      <View >
        <Text style={styles.menuTitulo}>Menu</Text>
      </View>
      <View style={styles.menu}>
        <Pressable style={[styles.botao, styles.botaoNotas]}>
          <Text>NOTAS</Text>
        </Pressable>

        <Pressable style={[styles.botao, styles.botaoAulas]}>
          <Text>AULAS</Text>
        </Pressable>

        <Pressable style={[styles.botao, styles.botaoAvisos]}>
          <Text>AVISOS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  menuTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menu: {
    flexDirection: 'row',
  },
  botao: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  botaoNotas: {
    backgroundColor: '#4C8BF5',
  },

  botaoAulas: {
    backgroundColor: '#13e772',
  },

  botaoAvisos: {
    backgroundColor: '#d323ca',
  },
  textoBotao: {
    textAlign: 'center',
  },
  

});
