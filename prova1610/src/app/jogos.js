import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";


const db = SQLite.openDatabaseSync("jogos.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS jogos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    plataforma VARCHAR(50),
    horas INTEGER
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM jogos ORDER BY id DESC");
}

function adicionar(titulo, plataforma, horas) {
    return db.runSync("INSERT INTO jogos (titulo, plataforma, horas) VALUES (?, ?, ?)", [titulo, plataforma, horas]);
}

function deletar(id) {
    db.runSync("DELETE FROM jogos WHERE id = ?", [id])
}

function update(titulo, plataforma, horas, id) {
    db.runSync("UPDATE jogos SET titulo = ?, plataforma = ?, horas =? WHERE id = ?", [titulo, plataforma, horas, id]);
}

export default function listaDb() {
    const [lista, setLista] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [horas, setHoras] = useState(0);
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar())
    }

    useEffect(() => {
        carregar();
    }, []);

    function salvar() {
        if (idEditando == 0) {
            if (titulo != "") {
                adicionar(titulo, plataforma, horas);
            } else {
                window.alert("O jogo precisa de um titulo");
            }
        } else {
            if(titulo != ""){
                update(titulo, plataforma, horas, idEditando);
            } else {
               window.alert("O jogo precisa de um titulo"); 
            }
            
        }
        setTitulo("");
        setPlataforma("");
        setHoras(0);
        setIdEditando(0);
        carregar();
    }

    function remover(id) {
        deletar(id);
        carregar();
    }

    function editar(jogo) {
        setIdEditando(jogo.id);
        setTitulo(jogo.titulo);
        setPlataforma(jogo.plataforma);
        setHoras(String(jogo.horas));
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Biblioteca de jogos" }} />

            <TextInput
                style={styles.campo}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="titulo"
            />
            <TextInput
                style={styles.campo}
                value={plataforma}
                onChangeText={setPlataforma}
                placeholder="Plataforma"
            />
            <TextInput
                style={styles.campo}
                value={horas}
                onChangeText={setHoras}
                placeholder="Horas Jogadas"
                keyboardType="numeric"
            />

            <Button title="Salvar" onPress={salvar} />

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) =>
                    <View style={styles.itens}>
                        <Text style={styles.item}>{item.titulo} - {item.plataforma} - {item.horas}</Text>
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
    notaBoa: {
        color: "#16A34A",
        fontWeight: "bold",
    },
    notaRuim: {
        color: "#DC2626",
        fontWeight: "bold",
    },
});