import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

// Fora do componente: o banco abre uma vez. O arquivo fica no aparelho —
// fechar o app não apaga. A tela /lista continua só na memória.
const db = SQLite.openDatabaseSync("contatos.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM contatos ORDER BY id DESC");
}

function adicionar(nome, telefone){
    return db.runSync("INSERT INTO contatos (nome, telefone) VALUES (?, ?)", [nome, telefone]);
}

function deletar(id) {
    db.runSync("DELETE FROM contatos WHERE id = ?", [id])
}

function update(nome, telefone, id) {
    db.runSync("UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?", [nome, telefone, id]);
}

export default function listaDb(){
    const [lista, setLista] = useState([]);
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar())
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        if(idEditando == 0){
            adicionar(nome, telefone);
        } else {
            update(nome, telefone, idEditando);
        }
        setNome("");
        setTelefone("");
        setIdEditando(0);
        carregar();
    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    function editar(contato) {
        setIdEditando(contato.id);
        setNome(contato.nome);
        setTelefone(contato.telefone);
    }

    return(
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Contatos" }} />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome"
            />
            <TextInput
            style={styles.campo}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Telefone"
            />

            <Button title="Salvar" onPress={salvar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.itens}>
                        <Text style={styles.item}>{item.nome} - {item.telefone}</Text>
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