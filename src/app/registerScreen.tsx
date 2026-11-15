import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { register } from "../services/firebase/auth";
import { createUserProfile } from "../services/firebase/user";
import { buildConsentRecord } from "../services/firebase/consent";
import { ConsentCheckbox } from "../components/ConsentCheckbox";
import { LegalDocumentModal } from "../components/LegalDocumentView";
import { HEALTH_CONSENT, TERMS_OF_USE } from "../legal/legalTexts";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../styles/colors";
import { styles } from "../styles/registerScreenStyles";
import { showAlert } from "../utils/showAlert"; // IMPORTA O showAlert
import {
  MIN_AGE,
  calculateAge,
  maskBirthDate,
  parseBirthDate,
  toIsoDate,
} from "../utils/age";

export default function RegisterScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [healthConsent, setHealthConsent] = useState(false);
  const [openDocument, setOpenDocument] = useState<"terms" | "health" | null>(
    null
  );

  const signUp = async () => {
  if (!userName.trim()) return showAlert("Erro", "Digite seu nome");
  if (!birthDate.trim())
    return showAlert("Erro", "Digite sua data de nascimento");

  const parsedBirthDate = parseBirthDate(birthDate);
  if (!parsedBirthDate)
    return showAlert(
      "Erro",
      "Data de nascimento inválida. Use o formato DD/MM/AAAA."
    );

  // Verificação de idade ANTES de criar a conta: menores de 18 anos não
  // chegam ao Firebase, então nenhum dado deles é gravado.
  if (calculateAge(parsedBirthDate) < MIN_AGE) {
    router.replace("/underageScreen");
    return;
  }

  if (!email.trim()) return showAlert("Erro", "Digite seu e-mail");
  if (!password.trim()) return showAlert("Erro", "Digite sua senha");
  if (!termsAccepted)
    return showAlert(
      "Termos de Uso",
      "Para criar a conta, leia e aceite os Termos de Uso e a Política de Privacidade."
    );
  if (!healthConsent)
    return showAlert(
      "Consentimento necessário",
      "Para usar o NoPod, leia e aceite o consentimento para tratamento de dados de saúde."
    );

  try {
    const userCredential = await register(email, password);
    const user = userCredential.user;

  await createUserProfile(user.uid, {
    name: userName,
    email: user.email,
    birthDate: toIsoDate(parsedBirthDate),
    createdAt: new Date(),
    currentStreak: 0,
    longestStreak: 0,
    totalResisted: 0,
    totalSmoked: 0,
    lastSmokeDate: null,
    consents: buildConsentRecord(),
  });

    showAlert("Sucesso", "Usuário cadastrado!", [
      {
        text: "OK",
        onPress: () => router.push("/"),
      },
    ]);
  } catch (error: any) {
    showAlert("Erro no cadastro", error.message);
  }
};

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
      <Image
        source={require("../assets/images/appLogo.png")}
        style={styles.appLogo}
      />

      <Text style={styles.loginText}>Cadastro</Text>

      <Text style={styles.labelText}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
      />

      <Text style={styles.labelText}>Data de nascimento</Text>
      <TextInput
        placeholder="DD/MM/AAAA"
        style={styles.input}
        value={birthDate}
        onChangeText={(text) => setBirthDate(maskBirthDate(text))}
        keyboardType="number-pad"
        maxLength={10}
      />

      <Text style={styles.labelText}>E-mail</Text>
      <TextInput
        placeholder="seuemail@exemplo.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.labelText}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <ConsentCheckbox
        checked={termsAccepted}
        label="Li e aceito os Termos de Uso e a Política de Privacidade."
        linkLabel="Ler os Termos de Uso"
        onOpenDocument={() => setOpenDocument("terms")}
        onUncheck={() => setTermsAccepted(false)}
      />

      <ConsentCheckbox
        highlighted
        checked={healthConsent}
        label="Autorizo o tratamento dos meus dados de saúde (hábito de fumar e registros de resistência) para acompanhar meu progresso no NoPod."
        linkLabel="Ler o consentimento (LGPD, art. 11)"
        onOpenDocument={() => setOpenDocument("health")}
        onUncheck={() => setHealthConsent(false)}
      />

      <View style={styles.containerButton}>
        <Pressable style={styles.loginPressable} onPress={signUp}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
        </Pressable>
      </View>

      <View style={styles.containerButton}>
        <Pressable
          style={styles.loginPressable}
          onPress={() => router.push("/")}
        >
          <Text style={styles.loginButtonText}>Voltar</Text>
        </Pressable>
      </View>
      </ScrollView>

      <LegalDocumentModal
        visible={openDocument === "terms"}
        document={TERMS_OF_USE}
        onAccept={() => {
          setTermsAccepted(true);
          setOpenDocument(null);
        }}
        onClose={() => setOpenDocument(null)}
      />

      <LegalDocumentModal
        visible={openDocument === "health"}
        document={HEALTH_CONSENT}
        onAccept={() => {
          setHealthConsent(true);
          setOpenDocument(null);
        }}
        onClose={() => setOpenDocument(null)}
      />
    </LinearGradient>
  );
}
