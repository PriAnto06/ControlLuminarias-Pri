import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function ScreenBloque2({
  wifiHogar,
  setWifiHogar,
  passHogar,
  setPassHogar,
  alAvanzar,
}) {
  const validarYEnviar = () => {
    if (!wifiHogar || !passHogar) {
      Alert.alert("Error", "Campos vacíos");
    } else {
      alAvanzar();
    }
  };

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>Fase 1</Text>
      <Text style={styles.texto}>
        Ingresá los datos de la red Wi-Fi de tu casa
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Wi-Fi de tu casa"
        value={wifiHogar}
        onChangeText={setWifiHogar}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña del Wi-Fi"
        secureTextEntry
        value={passHogar}
        onChangeText={setPassHogar}
      />
      <Button title="Transmitir Datos" onPress={validarYEnviar} />
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
});
