import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { LegalDocumentView } from "../../components/LegalDocumentView";
import { auth } from "../../firebaseConfig";
import { HEALTH_CONSENT } from "../../legal/legalTexts";
import { saveConsents } from "../../services/firebase/consent";
import { colors } from "../../styles/colors";
import { styles } from "../../styles/consentScreenStyles";
import { showAlert } from "../../utils/showAlert";

// Exibida pelo layout protegido quando a conta não tem o consentimento
// vigente (contas criadas antes desta tela ou após mudança de versão).
// Nenhum dado de saúde é registrado enquanto a pessoa não aceitar.
export default function ConsentScreen() {
  const [saving, setSaving] = useState(false);

  const accept = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      setSaving(true);
      await saveConsents(user.uid);
      router.replace("/home");
    } catch (error: any) {
      console.error("Erro ao salvar consentimento:", error);
      showAlert("Erro", "Não foi possível salvar o seu consentimento. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const decline = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <LinearGradient colors={[colors.pink[100], colors.blue[100]]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Antes de continuar</Text>
        <Text style={styles.intro}>
          Para registrar o seu progresso, o NoPod precisa do seu consentimento
          para tratar dados de saúde.
        </Text>

        <View style={styles.card}>
          <LegalDocumentView document={HEALTH_CONSENT} />
        </View>

        {saving ? (
          <ActivityIndicator size="large" color={colors.white[100]} />
        ) : (
          <>
            <Pressable style={styles.button} onPress={accept}>
              <Text style={styles.buttonText}>Concordo</Text>
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
