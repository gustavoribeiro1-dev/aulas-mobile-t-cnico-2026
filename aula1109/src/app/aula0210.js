import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

// Fora do componente: o banco abre uma vez. O arquivo fica no aparelho —
// fechar o app não apaga. A tela /lista continua só na memória.
const db = SQLite.openDatabaseSync("flores.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS flores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL,
    cor VARCHAR(20) NOT NULL,
    nomec VARCHAR(50) NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM flores ORDER BY id DESC");
}

function adicionar(nome, cor, nomec) {
    db.runSync("INSERT INTO flores (nome, cor, nomec) VALUES (?, ?, ?)", [nome, cor, nomec]);
}
function deletar(id) {
    db.runSync("DELETE FROM flores WHERE id = ?", [id])
}

function update(nome, cor, nomec, id) {
    db.runSync("UPDATE flores SET nome = ?, cor = ?, nomec = ? WHERE id = ?", [nome, cor, nomec, id]);
}

export default function ListaDb() {
    const [lista, setLista] = useState([]);
    const [nome, setNome] = useState("");
    const [cor, setCor] = useState("");
    const [nomec, setNomec] = useState("");
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvarOuEditar() {
        if (idEditando == 0) {
            adicionar(nome, cor, nomec);
        } else {
            update(nome, cor, nomec, idEditando);
            
        }
        setNome("");
        setCor("");
        setNomec("");
        setIdEditando(0);
        carregar();

    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    function editar(flor) {
        setIdEditando(flor.id);
        setNome(flor.nome);
        setCor(flor.cor);
        setNomec(flor.nomec);
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Floricultura" }} />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
            />
            <TextInput
                style={styles.campo}
                value={cor}
                onChangeText={setCor}
                placeholder="Cor Predominante"
            />
            <TextInput
                style={styles.campo}
                value={nomec}
                onChangeText={setNomec}
                placeholder="Nome Cientifico"
            />

            <Button title="Salvar" onPress={salvarOuEditar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.itens}>
                        <Text style={styles.item}>{item.nome} - {item.cor} - {item.nomec}</Text>
                        <Button title="X" onPress={() => remover(item.id)}></Button>
                        <Button title="Editar" onPress={() => editar(item)}></Button>
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