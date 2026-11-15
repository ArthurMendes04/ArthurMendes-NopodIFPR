import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";

type Props = {
  checked: boolean;
  label: string;
  linkLabel: string;
  // Marcar a caixa sempre abre o documento: o aceite acontece no botão
  // "Concordo", depois de a pessoa ver o texto.
  onOpenDocument: () => void;
  onUncheck: () => void;
  highlighted?: boolean;
};

export function ConsentCheckbox({
  checked,
  label,
  linkLabel,
  onOpenDocument,
  onUncheck,
  highlighted,
}: Props) {
  return (
    <View style={[styles.container, highlighted && styles.highlighted]}>
      <Pressable
        style={styles.row}
        onPress={checked ? onUncheck : onOpenDocument}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        hitSlop={6}
      >
        <MaterialIcons
          name={checked ? "check-box" : "check-box-outline-blank"}
          size={26}
          color={colors.white[100]}
        />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
      <Pressable onPress={onOpenDocument} hitSlop={6}>
        <Text style={styles.link}>{linkLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginBottom: 10,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: colors.white[100],
    borderRadius: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  label: {
    flex: 1,
    color: colors.white[100],
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    color: colors.white[100],
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginLeft: 34,
    marginTop: 4,
  },
});
