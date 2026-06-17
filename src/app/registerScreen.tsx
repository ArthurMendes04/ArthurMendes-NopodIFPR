import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { register } from "../services/firebase/auth";
import { createUserProfile } from "../services/firebase/user";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../styles/colors";
import { styles } from "../styles/registerScreenStyles";
import { showAlert } from "../utils/showAlert"; // IMPORTA O showAlert

export default function RegisterScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
  if (!userName.trim()) return showAlert("Erro", "Digite seu nome");
  if (!email.trim()) return showAlert("Erro", "Digite seu e-mail");
  if (!password.trim()) return showAlert("Erro", "Digite sua senha");

  try {
    const userCredential = await register(email, password);
    const user = userCredential.user;

  await createUserProfile(user.uid, {
    name: userName,
    email: user.email,
    createdAt: new Date(),
    currentStreak: 0,
    longestStreak: 0,
    totalResisted: 0,
    totalSmoked: 0,
    lastSmokeDate: null,
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
    </LinearGradient>
  );
}
