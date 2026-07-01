import { View, Text, Button, StyleSheet } from "react-native";

export default function ScreenBloque3({ alFinalizar }) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>Fase 2</Text>
      <Text style={styles.texto}>
        Sincronizando... Esperando confirmación de conexión exitosa
      </Text>
      <Button title="Simular Conexión Exitosa" onPress={alFinalizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  texto: { fontSize: 15, marginBottom: 20, textAlign: "center", color: "#666" },
});
