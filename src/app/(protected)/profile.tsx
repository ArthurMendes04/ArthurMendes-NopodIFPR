import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { HealthDisclaimer } from "../../components/HealthDisclaimer";
import { LegalDocumentModal } from "../../components/LegalDocumentView";
import { auth } from "../../firebaseConfig";
import { DPO_EMAIL, HEALTH_CONSENT, TERMS_OF_USE } from "../../legal/legalTexts";
import {
  deleteAccount,
  deleteAccountErrorMessage,
} from "../../services/firebase/account";
import { getUserProfile } from "../../services/firebase/user";
import { colors } from "../../styles/colors";
import { styles } from "../../styles/profileStyles";
import { confirmAction } from "../../utils/confirmAction";
import { showAlert } from "../../utils/showAlert";

// "AAAA-MM-DD" -> "DD/MM/AAAA"
const formatIsoDate = (iso?: string) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const formatTimestamp = (value: any) => {
  const date = value?.toDate ? value.toDate() : null;
  return date ? date.toLocaleDateString("pt-BR") : "—";
};

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [openDocument, setOpenDocument] = useState<"terms" | "health" | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const user = auth.currentUser;
      if (!user) return;
      getUserProfile(user.uid)
        .then(setProfile)
        .catch((error) => console.error("Erro ao carregar perfil:", error));
    }, [])
  );

  const handleLogout = async () => {
    const ok = await confirmAction("Sair do aplicativo", "Você tem certeza que deseja sair?", "Sair");
    if (!ok) return;
    await signOut(auth);
    router.replace("/");
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      showAlert("Excluir conta", "Digite sua senha para confirmar.");
      return;
    }

    const ok = await confirmAction(
      "Excluir conta definitivamente?",
      "Sua conta, seus dados de cadastro e todo o seu histórico serão apagados. Esta ação não pode ser desfeita.",
      "Excluir"
    );
    if (!ok) return;

    try {
      setDeleting(true);
      await deleteAccount(password);
      setPassword("");
      showAlert("Conta excluída", "Sua conta e seus dados foram apagados.");
      router.replace("/");
    } catch (error: any) {
      console.error("Erro ao excluir conta:", error);
      showAlert("Erro", deleteAccountErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  };

  const contactDpo = async () => {
    try {
      await Linking.openURL(`mailto:${DPO_EMAIL}`);
    } catch {
      showAlert("Encarregado de dados", `Envie um e-mail para ${DPO_EMAIL}.`);
    }
  };

  return (
    <LinearGradient colors={[colors.pink[100], colors.blue[100]]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <MaterialIcons name="arrow-back" size={30} color="white" />
          </Pressable>
          <Text style={styles.title}>Perfil</Text>
          <View style={{ width: 30 }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meus dados</Text>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{profile?.name || "—"}</Text>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{profile?.email || auth.currentUser?.email || "—"}</Text>
          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.value}>{formatIsoDate(profile?.birthDate)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacidade (LGPD)</Text>
          <Text style={styles.small}>
            Termos aceitos em {formatTimestamp(profile?.consents?.terms?.acceptedAt)} ·
            Consentimento de saúde em {formatTimestamp(profile?.consents?.healthData?.acceptedAt)}
          </Text>

          <Pressable style={styles.linkRow} onPress={() => setOpenDocument("terms")}>
            <MaterialIcons name="description" size={22} color={colors.pink[100]} />
            <Text style={styles.linkText}>Termos de Uso e Política de Privacidade</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => setOpenDocument("health")}>
            <MaterialIcons name="health-and-safety" size={22} color={colors.pink[100]} />
            <Text style={styles.linkText}>Consentimento de dados de saúde</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={contactDpo}>
            <MaterialIcons name="mail-outline" size={22} color={colors.pink[100]} />
            <Text style={styles.linkText}>Falar com o encarregado de dados</Text>
          </Pressable>
        </View>

        <HealthDisclaimer />

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </Pressable>

        <View style={styles.dangerCard}>
          <Text style={styles.dangerTitle}>Excluir conta</Text>
          <Text style={styles.dangerText}>
            Apaga definitivamente sua conta, seus dados de cadastro e todo o
            histórico de resistências. Também revoga o consentimento de dados
            de saúde.
          </Text>

          {!showDelete ? (
            <Pressable style={styles.dangerButton} onPress={() => setShowDelete(true)}>
              <Text style={styles.buttonText}>Excluir minha conta</Text>
            </Pressable>
          ) : (
            <>
              <Text style={styles.dangerText}>Digite sua senha para confirmar:</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!deleting}
              />
              {deleting ? (
                <ActivityIndicator size="large" color={colors.white[100]} />
              ) : (
                <View style={styles.row}>
                  <Pressable
                    style={[styles.dangerButton, styles.flex]}
                    onPress={() => {
                      setShowDelete(false);
                      setPassword("");
                    }}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.dangerButton, styles.dangerConfirm, styles.flex]}
                    onPress={handleDeleteAccount}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </Pressable>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      <LegalDocumentModal
        visible={openDocument === "terms"}
        document={TERMS_OF_USE}
        onClose={() => setOpenDocument(null)}
      />
      <LegalDocumentModal
        visible={openDocument === "health"}
        document={HEALTH_CONSENT}
        onClose={() => setOpenDocument(null)}
      />
    </LinearGradient>
  );
}
