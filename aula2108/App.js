import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ paddingTop: 50, paddingLeft: 10 }}>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 30 }}>
        <View style={{ backgroundColor: 'blue', height: 50, width: 50, borderRadius: 10 }}>
        </View>
        <View style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom:30 }}>
        <View>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
        <View>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
        <View>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', paddingBottom: 30 }}>
        <View style={{ backgroundColor: 'blue', width: '90%', height: 80, borderRadius: 10 }}>

        </View>
      </View>

      <View style={{flexDirection: 'row', paddingBottom: 20}}>
        <View style={{ backgroundColor: 'blue', height: 50, width: 50, borderRadius: 10 }}>
        </View>
        <View style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{ backgroundColor: 'blue', height: 50, width: 50, borderRadius: 10 }}>
        </View>
        <View style={{ width: 150, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Texto</Text>
          <Text>Texto</Text>
        </View>
      </View>

    </View>
  );
}

