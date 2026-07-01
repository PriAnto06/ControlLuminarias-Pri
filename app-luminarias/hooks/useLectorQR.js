import { useState } from "react";

export default function useLectorQR() {
  const [pudoLeerQR, setPudoLeerQR] = useState(false);
  const [huboUnError, setHuboUnError] = useState(false);
  const [mensajeDeError, setMensajeDeError] = useState("");
  const [datosQR, setDatosQR] = useState("");
  const actualizarLector = (exito, datos, errorMsg = "") => {
    setPudoLeerQR(exito);
    setDatosQR(datos);
    setHuboUnError(!exito && errorMsg !== "");
    setMensajeDeError(errorMsg);
  };
  return { pudoLeerQR, huboUnError, mensajeDeError, datosQR, actualizarLector };
}
