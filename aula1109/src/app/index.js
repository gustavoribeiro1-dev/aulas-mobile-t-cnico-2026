import { StatusBar } from 'expo-status-bar';
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <Link href="/aula0708" style={styles.botao}>Aula 07/08</Link>
        <Link href="/aula1408" style={styles.botao}>Aula 14/08</Link>
        <Link href="/aula2108" style={styles.botao}>Aula 21/08</Link>
        <Link href="/aula0409" style={styles.botao}>Aula 04/09</Link>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  botao: {
    backgroundColor: "#2354D6",
    color: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 15
  },
});
