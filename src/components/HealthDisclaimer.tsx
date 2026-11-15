import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

type Props = {
  // Texto adicional específico da tela (ex.: orientação do exercício).
  extra?: string;
};

export const DISCLAIMER_TEXT =
  "O NoPod é uma ferramenta de apoio e não substitui o acompanhamento de um profissional de saúde. " +
  "O SUS oferece tratamento gratuito para parar de fumar: procure a UBS mais próxima ou ligue para o Disque Saúde 136. " +
  "Em emergência, ligue 192.";

// Aviso exibido nas telas principais, pedido pela banca.
export function HealthDisclaimer({ extra }: Props) {
  return (
    <View style={styles.container} accessibilityRole="text">
      <MaterialIcons name="info-outline" size={20} color={colors.white[100]} />
      <Text style={styles.text}>
        {extra ? `${extra} ` : ""}
        {DISCLAIMER_TEXT}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  text: {
    flex: 1,
    color: colors.white[100],
    fontSize: 12,
    lineHeight: 17,
  },
});
