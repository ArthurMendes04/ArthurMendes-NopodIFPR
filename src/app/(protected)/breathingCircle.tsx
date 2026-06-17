import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../firebaseConfig";
import { registerResistedEvent } from "../../services/firebase/user";
import { showAlert } from "../../utils/showAlert";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/breathingCircleStyles";
import { colors } from "../../styles/colors";

export default function BreathingCircle() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 2.4,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [scaleAnim]);

  const handleConsegui = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        showAlert("Erro", "Usuário não encontrado.");
        return;
      }

      await registerResistedEvent(user.uid);

      router.push("./greetings");
    } catch (error: any) {
      console.error("Erro ao registrar resistência:", error);
      showAlert("Erro", "Não foi possível registrar sua resistência.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.goBackButton}>
            <Pressable
              onPress={() => router.push("./home")}
              style={styles.goBackPressable}
            >
              <Ionicons name="arrow-back" size={20} color="white" />
              <Text style={styles.pressableText}>Voltar</Text>
            </Pressable>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.instructions}>
              Utilize a figura abaixo para controlar sua respiração
            </Text>
            <Text style={styles.subInstructions}>
              (Fique o tempo que precisar)
            </Text>
          </View>

          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />

          <Pressable
            onPress={handleConsegui}
            style={styles.successButton}
            disabled={loading}
          >
            <Text style={styles.successButtonText}>
              {loading ? "Salvando..." : "Consegui"}
            </Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
