import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "expo-checkbox";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("compras.db");

db.execSync(`
  CREATE TABLE IF NOT EXISTS compras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto VARCHAR(50) NOT NULL,
    quantidade INTEGER NOT NULL,
    comprado BOOLEAN NOT NULL
  );
`);

function listar() {
    return db.getAllSync("SELECT * FROM compras ORDER BY id DESC");
}

function adicionar(produto, quantidade) {
    db.runSync("INSERT INTO compras (produto, quantidade, comprado) VALUES (?, ?, 0)", [produto, quantidade]);
}

function deletar(id) {
    db.runSync("DELETE FROM compras WHERE id = ?", [id]);
}

function update(produto, quantidade, id) {
    db.runSync("UPDATE compras SET produto = ?, quantidade = ? WHERE id = ?", [produto, quantidade, id]);
}

// Inverte o valor direto no SQL: 0 vira 1 e 1 vira 0
function alternarComprado(id) {
    db.runSync("UPDATE compras SET comprado = 1 - comprado WHERE id = ?", [id]);
}

// Um único comando apaga todos os comprados
function limparComprados() {
    db.runSync("DELETE FROM compras WHERE comprado = 1");
}

export default function ListaDb() {
    const [lista, setLista] = useState([]);
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [idEditando, setIdEditando] = useState(0);

    function carregar() {
        setLista(listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    function limparFormulario() {
        setProduto("");
        setQuantidade("");
        setIdEditando(0);
    }

    function salvar() {
        const qtd = parseInt(quantidade, 10);
        if (produto.trim() === "" || isNaN(qtd)) return;

        if (idEditando === 0) {
            adicionar(produto.trim(), qtd);
        } else {
            update(produto.trim(), qtd, idEditando);
        }
        limparFormulario();
        carregar();
    }

    function remover(id) {
        deletar(id);
        if (id === idEditando) limparFormulario();
        carregar();
    }

    function editar(item) {
        setIdEditando(item.id);
        setProduto(item.produto);
        setQuantidade(String(item.quantidade));
    }

    function marcar(item) {
        alternarComprado(item.id);
        carregar();
    }

    function limpar() {
        limparComprados();
        limparFormulario();
        carregar();
    }

    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Lista de Compras" }} />

            <TextInput
                style={styles.campo}
                value={produto}
                onChangeText={setProduto}
                placeholder="Produto"
            />
            <TextInput
                style={styles.campo}
                value={quantidade}
                onChangeText={setQuantidade}
                placeholder="Quantidade"
                keyboardType="numeric"
            />

            <Button title="Salvar" onPress={salvar} />

            <View style={styles.limpar}>
                <Button title="Limpar comprados" color="#DC2626" onPress={limpar} />
            </View>

            <FlatList
                style={styles.lista}
                data={lista}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.itens}>
                        <Checkbox
                            style={styles.checkbox}
                            value={!!item.comprado}
                            onValueChange={() => marcar(item)}
                        />
                        <Text style={[styles.item, item.comprado ? styles.itemComprado : null]}>
                            {item.produto} - {item.quantidade}
                        </Text>
                        <Button title="X" onPress={() => remover(item.id)} />
                        <Button title="Editar" onPress={() => editar(item)} />
                    </View>
                )}
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

    limpar: {
        marginTop: 12,
    },

    lista: {
        flex: 1,
        marginTop: 16,
    },

    itens: {
        flexDirection: "row",
        alignItems: "center",
    },

    checkbox: {
        marginRight: 8,
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

    itemComprado: {
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },
});