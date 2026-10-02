import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

// Fora do componente: o banco abre uma vez. O arquivo fica no aparelho —
// fechar o app não apaga. A tela /lista continua só na memória.
const db = SQLite.openDatabaseSync("tarefas.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    tamanho TEXT NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM tarefas ORDER BY id DESC");
}

function adicionar(texto, tamanho) {
    db.runSync("INSERT INTO tarefas (texto, tamanho) VALUES (?, ?)", [texto, tamanho]);
}
function deletar(id) {
    db.runSync("DELETE FROM tarefas WHERE id = ?", [id])
}

export default function ListaDb() {
    const [texto, setTexto] = useState("");
    const [lista, setLista] = useState([]);
    const [tamanho, setTamanho] = useState("");

    function carregar() {
        setLista(listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        adicionar(texto, tamanho);
        setTexto("");
        setTamanho("");
        carregar();
    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Pastelaria" }} />

            <TextInput
                style={styles.campo}
                value={texto}
                onChangeText={setTexto}
                placeholder="Nome do pastel"
            />
            <TextInput
                style={styles.campo}
                value={tamanho}
                onChangeText={setTamanho}
                placeholder="Tamanho do pastel"
            />

            <Button title="Adicionar" onPress={salvar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.itens}>
                        <Text style={styles.item}>{item.texto} - {item.tamanho}G</Text>
                        <Button title="X" onPress={() => remover(item.id)}></Button>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    campo: {
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#111827",
        marginBottom: 12,
    },

    lista: {
        flex: 1,
        marginTop: 16,
    },

    itens: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    item: {
        flex: 1,
        backgroundColor: "#F1F3F6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        fontSize: 15,
        color: "#111827",
    },
});