import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import LectorCamara from "./hooks/LectorCamara";
import useLectorQR from "./hooks/useLectorQR";

// Tus componentes de la carpeta screens
import ScreenBloque1 from "./screens/ScreenBloque1";
import ScreenBloque2 from "./screens/ScreenBloque2";
import ScreenBloque3 from "./screens/ScreenBloque3";

export default function App() {
  const { pudoLeerQR, huboUnError, mensajeDeError, datosQR, actualizarLector } =
    useLectorQR();

  const [fase, setFase] = useState(0);
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [wifiHogar, setWifiHogar] = useState("");
  const [passHogar, setPassHogar] = useState("");

  if (mostrarCamara) {
    return (
      <LectorCamara
        onCancelar={() => setMostrarCamara(false)}
        onEscaneoExitoso={(data) => {
          setMostrarCamara(false);
          actualizarLector(true, data);
          Alert.alert("¡Éxito!", "Datos QR guardados. Pasamos al Formulario.");
          setFase(1);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.centrado}>
        {/* CONTENEDORES OBLIGATORIOS */}
        {pudoLeerQR && (
          <View style={styles.cajaInfo}>
            <Text style={styles.textoInfo}>Datos QR: {datosQR}</Text>
          </View>
        )}
        {huboUnError && (
          <View style={styles.cajaError}>
            <Text style={styles.textoError}>{mensajeDeError}</Text>
          </View>
        )}

        {/* REFACTOR EN 3 FASES */}
        {fase === 0 && (
          <ScreenBloque1 alAbrirCamara={() => setMostrarCamara(true)} />
        )}

        {fase === 1 && (
          <ScreenBloque2
            wifiHogar={wifiHogar}
            setWifiHogar={setWifiHogar}
            passHogar={passHogar}
            setPassHogar={setPassHogar}
            alAvanzar={() => {
              Alert.alert(
                "¡Éxito!",
                "Datos transmitidos. Pasamos al paso de conexión.",
              );
              setFase(2);
            }}
          />
        )}

        {fase === 2 && (
          <ScreenBloque3
            alFinalizar={() => {
              Alert.alert(
                "📢 Mensaje MQTT",
                "Confirmación recibida: ¡Conexión Exitosa!",
              );
              actualizarLector(false, "");
              setWifiHogar("");
              setPassHogar("");
              setFase(0);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cajaInfo: {
    backgroundColor: "#e8f5e9",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  textoInfo: { color: "#2e7d32", fontWeight: "bold" },
  cajaError: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  textoError: { color: "#c62828" },
});
