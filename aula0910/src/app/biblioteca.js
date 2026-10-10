import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";

// Fora do componente: o banco abre uma vez. O arquivo fica no aparelho —
// fechar o app não apaga. A tela /lista continua só na memória.
const db = SQLite.openDatabaseSync("biblioteca.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS biblioteca (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    autor VARCHAR(20) NOT NULL,
    paginas INTEGER NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM biblioteca ORDER BY id DESC");
}

function adicionar(titulo, autor, paginas) {
    return db.runSync("INSERT INTO biblioteca (titulo, autor, paginas) VALUES (?, ?, ?)", [titulo, autor, paginas]);
}

function deletar(id) {
    db.runSync("DELETE FROM biblioteca WHERE id = ?", [id])
}

function update(titulo, autor, paginas, id) {
    db.runSync("UPDATE biblioteca SET titulo = ?, autor = ?, paginas= ? WHERE id = ?", [titulo, autor, paginas, id]);
}

export default function listaDb() {
    const [lista, setLista] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [paginas, setPaginas] = useState(0);
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar())
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        if (idEditando == 0) {
            adicionar(titulo, autor, paginas);
        } else {
            update(titulo, autor, paginas, idEditando);
        }
        setTitulo("");
        setAutor("");
        setPaginas(0);
        setIdEditando(0);
        carregar();
    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    function editar(livro) {
        setIdEditando(livro.id);
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setPaginas(String(livro.paginas));
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "biblioteca" }} />

            <TextInput
                style={styles.campo}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="titulo"
            />
            <TextInput
                style={styles.campo}
                value={autor}
                onChangeText={setAutor}
                placeholder="autor"
            />
            <TextInput
                style={styles.campo}
                value={paginas}
                onChangeText={setPaginas}
                placeholder="Paginas"
            />

            <Button title="Salvar" onPress={salvar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.itens}>
                        <Text style={styles.item}>{item.titulo} - {item.autor} - {item.paginas}</Text>
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