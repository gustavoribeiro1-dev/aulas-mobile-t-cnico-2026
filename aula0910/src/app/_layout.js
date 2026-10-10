import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Arquivo especial. O _layout.js envolve TODAS as telas da pasta — é o lugar
// de tudo que precisa existir uma vez só no app inteiro.
//
// O SafeAreaProvider é exatamente esse caso: ele mede a tela e guarda as
// medidas para quem estiver dentro dele. Colocar em cada tela funcionaria,
// mas seria repetir a mesma linha em todo arquivo novo.
export default function Layout() {
  return (
    <SafeAreaProvider>
      {/* O Stack empilha as telas: abrir uma põe em cima, voltar tira do
          topo. O botão de voltar e a animação vêm de graça. */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#2354D6" },
          headerTintColor: "#FFFFFF",
        }}
      />
    </SafeAreaProvider>
  );
}