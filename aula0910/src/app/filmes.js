import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

// Fora do componente: o banco abre uma vez. O arquivo fica no aparelho —
// fechar o app não apaga. A tela /lista continua só na memória.
const db = SQLite.openDatabaseSync("filme.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS filme (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    nota INTEGER NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM filme ORDER BY id DESC");
}

function adicionar(titulo, nota) {
    return db.runSync("INSERT INTO filme (titulo, nota) VALUES (?, ?)", [titulo, nota]);
}

function deletar(id) {
    db.runSync("DELETE FROM filme WHERE id = ?", [id])
}

function update(titulo, nota, id) {
    db.runSync("UPDATE filme SET titulo = ?, nota = ? WHERE id = ?", [titulo, nota, id]);
}

export default function listaDb() {
    const [lista, setLista] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [nota, setNota] = useState("");
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar())
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        if (idEditando == 0) {
            adicionar(titulo, nota);
        } else {
            update(titulo, nota, idEditando);
        }
        setTitulo("");
        setNota("");
        setIdEditando(0);
        carregar();
    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    function editar(filme) {
        setIdEditando(filme.id);
        setTitulo(filme.titulo);
        setNota(String(filme.nota));
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Avaliação de Filmes" }} />

            <TextInput
                style={styles.campo}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="titulo"
            />
            <TextInput
                style={styles.campo}
                value={nota}
                onChangeText={setNota}
                placeholder="nota"
            />

            <Button title="Salvar" onPress={salvar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => {
                    const nota = Number(item.nota);
                    const corNota = nota >= 7 ? styles.notaBoa : styles.notaRuim;

                    return (
                        <View style={styles.itens}>
                            <Text style={styles.item}>
                                {item.titulo} - <Text style={corNota}>{nota.toFixed(1)}</Text>
                            </Text>
                            <Button title="X" onPress={() => remover(item.id)} />
                            <Button title="Editar" onPress={() => editar(item)} />
                        </View>
                    );
                }}
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
    notaBoa: {
        color: "#16A34A",
        fontWeight: "bold",
    },
    notaRuim: {
        color: "#DC2626",
        fontWeight: "bold",
    },
});