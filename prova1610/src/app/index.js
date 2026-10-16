import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.menu}>
          <Link href='/jogos' style={styles.botao}>Meus Jogos</Link>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
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
