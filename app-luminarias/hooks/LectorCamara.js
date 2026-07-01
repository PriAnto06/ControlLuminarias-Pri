import { StyleSheet, View, Text, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function LectorCamara({ onEscaneoExitoso, onCancelar }) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission)
    return (
      <View style={styles.centrado}>
        <Text>Cargando cámara...</Text>
      </View>
    );

  if (!permission.granted) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.texto}>
          Necesitamos tu permiso para usar la cámara
        </Text>
        <Button title="Dar Permiso" onPress={requestPermission} />
        <Button title="Volver" onPress={onCancelar} />
      </View>
    );
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFill}
      onBarcodeScanned={({ data }) => {
        if (data) onEscaneoExitoso(data);
      }}
    />
  );
}

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  texto: { fontSize: 16, marginBottom: 20, textAlign: "center" },
});
