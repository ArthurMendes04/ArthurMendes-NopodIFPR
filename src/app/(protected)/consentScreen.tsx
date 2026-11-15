import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { LegalDocumentView } from "../../components/LegalDocumentView";
import { auth } from "../../firebaseConfig";
import { HEALTH_CONSENT, TERMS_OF_USE } from "../../legal/legalTexts";
import { saveConsents } from "../../services/firebase/consent";
import { colors } from "../../styles/colors";
import { styles } from "../../styles/consentScreenStyles";
import { showAlert } from "../../utils/showAlert";

// Exibida pelo layout protegido quando a conta não tem os aceites vigentes
// (contas criadas antes desta tela ou após mudança de versão).
// Nenhum dado de saúde é registrado enquanto a pessoa não aceitar.
export default function ConsentScreen() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [healthConsent, setHealthConsent] = useState(false);
  const [saving, setSaving] = useState(false);

  const canContinue = termsAccepted && healthConsent;

  const accept = async () => {
    const user = auth.currentUser;
    if (!user || !canContinue) return;
    try {
      setSaving(true);
      await saveConsents(user.uid);
      router.replace("/home");
    } catch (error: any) {
      console.error("Erro ao salvar consentimento:", error);
      showAlert("Erro", "Não foi possível salvar o seu aceite. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const decline = async () => {
    await signOut(auth);
    router.replace("/");
  };

  const renderCheck = (checked: boolean, onToggle: () => void, label: string) => (
    <Pressable
      style={styles.checkRow}
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <MaterialIcons
        name={checked ? "check-box" : "check-box-outline-blank"}
        size={26}
        color={colors.pink[100]}
      />
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );

  return (
    <LinearGradient colors={[colors.pink[100], colors.blue[100]]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Antes de continuar</Text>
        <Text style={styles.intro}>
          Leia e aceite os documentos abaixo para usar o NoPod.
        </Text>

        <View style={styles.card}>
          <LegalDocumentView document={TERMS_OF_USE} />
          {renderCheck(
            termsAccepted,
            () => setTermsAccepted((v) => !v),
            "Li e aceito os Termos de Uso e a Política de Privacidade."
          )}
        </View>

        <View style={[styles.card, styles.highlightedCard]}>
          <LegalDocumentView document={HEALTH_CONSENT} />
          {renderCheck(
            healthConsent,
            () => setHealthConsent((v) => !v),
            "Autorizo o tratamento dos meus dados de saúde para acompanhar meu progresso no NoPod."
          )}
        </View>

        {saving ? (
          <ActivityIndicator size="large" color={colors.white[100]} />
        ) : (
          <>
            <Pressable
              style={[styles.button, !canContinue && styles.disabledButton]}
              onPress={accept}
              disabled={!canContinue}
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.secondaryButton]} onPress={decline}>
              <Text style={styles.buttonText}>Não concordo (sair)</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}
