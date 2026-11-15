import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { colors } from "../styles/colors";
import { styles } from "../styles/underageScreenStyles";
import { showAlert } from "../utils/showAlert";

// Tela exibida quando a pessoa informa idade menor que 18 anos no cadastro.
// Nenhum dado é salvo: a verificação acontece antes de criar a conta.
export default function UnderageScreen() {
  const router = useRouter();

  const callDisqueSaude = async () => {
    try {
      await Linking.openURL("tel:136");
    } catch {
      showAlert(
        "Disque Saúde 136",
        "Não foi possível abrir o telefone. Ligue para 136, a ligação é gratuita."
      );
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
      >
        <Image
          source={require("../assets/images/appLogo.png")}
          style={styles.appLogo}
        />

        <Text style={styles.title}>Ainda não podemos criar sua conta</Text>

        <Text style={styles.text}>
          O NoPod é para maiores de 18 anos. Mas você não precisa passar por
          isso sozinho:
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            • Ligue grátis para o <Text style={styles.bold}>Disque Saúde 136</Text>.
          </Text>
          <Text style={styles.cardText}>
            • Procure a Unidade Básica de Saúde (UBS) mais próxima: o SUS
            oferece tratamento gratuito para parar de fumar.
          </Text>
          <Text style={styles.cardText}>
            • Converse com alguém de confiança: família, professor ou
            orientador da escola.
          </Text>
        </View>

        <View style={styles.containerButton}>
          <Pressable style={styles.button} onPress={callDisqueSaude}>
            <Text style={styles.buttonText}>Ligar para o 136</Text>
          </Pressable>
        </View>

        <View style={styles.containerButton}>
          <Pressable style={styles.button} onPress={() => router.replace("/")}>
            <Text style={styles.buttonText}>Voltar ao início</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
