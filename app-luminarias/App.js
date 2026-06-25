import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import NetInfo from "@react-native-community/netinfo"; // <-- La librería que arreglamos recién

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  // Estados para manejar el flujo de la consigna
  const [fase, setFase] = useState(0); // 0: Escaneo, 1: Enviar HTTP, 2: Esperando Red
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [cargando, setCargando] = useState(false);

  if (!permission)
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>
          Necesitamos tu permiso para usar la cámara
        </Text>
        <Button title="Dar Permiso" onPress={requestPermission} />
      </View>
    );
  }

  // --- FASE 0: El escaneo del QR ---
  // --- FASE 0: El escaneo del QR (Versión sin trabas) ---
  const cuandoEscanee = ({ data }) => {
    setMostrarCamara(false);

    Alert.alert(
      "¡QR Detectado!",
      "Simulamos que leyó SmartLamp_Config. Ahora pasarías a la Fase 1.",
    );
    setFase(1);
  };

  // --- FASE 1: Enviar credenciales por HTTP POST ---
  const enviarCredencialesAlESP32 = async () => {
    setCargando(true);

    const datosWifi = {
      ssid: "Red_Hogar_WiFi",
      password: "Password_Super_Segura",
    };

    try {
      const respuesta = await fetch("http://192.168.4.1/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosWifi),
      });

      if (respuesta.ok) {
        Alert.alert(
          "¡Enviado!",
          "El ESP32 recibió las credenciales y se va a reiniciar en modo Estación (STA).",
        );
        manejarTransicionDeRed();
      } else {
        throw new Error("El chip respondió con un error.");
      }
    } catch (error) {
      Alert.alert(
        "Error de conexión",
        "No pudimos comunicarnos con el ESP32. ¿Te aseguraste de conectarte a su Wi-Fi 'SmartLamp_Config'?",
      );
    } finally {
      setCargando(false);
    }
  };

  // --- FASE 2: Esperar que vuelva internet (El Bache de Conectividad 🚨) ---
  const manejarTransicionDeRed = () => {
    setFase(2);

    // Usamos NetInfo para escuchar cuándo el celular vuelve a tener internet real
    const desescribirNetInfo = NetInfo.addEventListener((state) => {
      // state.isInternetReachable nos dice si el celular realmente navega en internet
      if (state.isConnected && state.isInternetReachable) {
        desescribirNetInfo(); // Dejamos de escuchar para que no se ejecute mil veces

        Alert.alert(
          "¡Internet Recuperado!",
          "El celular ya volvió a tener red. Acá conectaríamos al Broker MQTT para esperar el OK de la lámpara.",
        );
        // Volvemos al inicio para poder probar el flujo de nuevo
        setFase(0);
      }
    });
  };

  // --- RENDERIZADO DE LAS PANTALLAS SEGÚN LA FASE ---
  return (
    <View style={styles.container}>
      {mostrarCamara ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={cuandoEscanee}
        />
      ) : (
        <View style={styles.centrado}>
          {fase === 0 && (
            <>
              <Text style={styles.titulo}>Fase 0: Escaneo</Text>
              <Button
                title="Escanear QR de Fábrica"
                onPress={() => setMostrarCamara(true)}
              />
            </>
          )}

          {fase === 1 && (
            <>
              <Text style={styles.titulo}>Fase 1: Aprovisionamiento</Text>
              <Text style={styles.texto}>
                Mandale los datos de la red de tu casa al chip.
              </Text>
              {cargando ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button
                  title="Enviar Datos por HTTP"
                  onPress={enviarCredencialesAlESP32}
                />
              )}
            </>
          )}

          {fase === 2 && (
            <>
              <Text style={styles.titulo}>Fase 2: Esperando Red...</Text>
              <ActivityIndicator size="large" color="#ffa500" />
              <Text style={styles.textoBache}>
                El ESP32 apagó su red. Esperando que tu celular se reconecte a
                internet para buscar el broker MQTT...
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  texto: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#555" },
  textoBache: {
    fontSize: 14,
    color: "#e66000",
    textAlign: "center",
    marginTop: 15,
    paddingHorizontal: 20,
  },
});
