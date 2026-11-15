import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LegalDocument } from "../legal/legalTexts";
import { colors } from "../styles/colors";

type Props = {
  document: LegalDocument;
};

// Conteúdo de um documento legal (Termos de Uso, consentimento etc.).
export function LegalDocumentView({ document }: Props) {
  return (
    <View>
      <Text style={styles.title}>{document.title}</Text>
      <Text style={styles.version}>Versão {document.version}</Text>
      {document.sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionBody}>{section.body}</Text>
        </View>
      ))}
    </View>
  );
}

type ModalProps = {
  visible: boolean;
  document: LegalDocument;
  // Sem onAccept, o modal é só de leitura (botão "Fechar").
  onAccept?: () => void;
  onClose: () => void;
};

// Modal com o documento e os botões "Concordo" / "Não concordo".
export function LegalDocumentModal({ visible, document, onAccept, onClose }: ModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <ScrollView contentContainerStyle={styles.sheetContent}>
            <LegalDocumentView document={document} />
          </ScrollView>

          {onAccept ? (
            <View style={styles.buttons}>
              <Pressable style={[styles.button, styles.secondary]} onPress={onClose}>
                <Text style={[styles.buttonText, styles.secondaryText]}>Não concordo</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={onAccept}>
                <Text style={styles.buttonText}>Concordo</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.buttons}>
              <Pressable style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Fechar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  version: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.pink[100],
    marginBottom: 4,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 21,
    color: "#333",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "90%",
    backgroundColor: colors.white[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  sheetContent: {
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.button[100],
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white[100],
    fontWeight: "bold",
    fontSize: 16,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.button[100],
  },
  secondaryText: {
    color: colors.button[100],
  },
});
