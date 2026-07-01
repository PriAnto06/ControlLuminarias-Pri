import { View, Text, Button, StyleSheet } from "react-native";

export default function ScreenBloque1({ alAbrirCamara }) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>Fase 0</Text>
      <Text style={styles.texto}>
        Escanear el código QR de fábrica con la cámara
      </Text>
      <Button title="Abrir Cámara" onPress={alAbrirCamara} />
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
