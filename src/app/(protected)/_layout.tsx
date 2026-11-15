// src/app/(protected)/layout.tsx
import { Slot, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { hasValidConsents } from "../../services/firebase/consent";
import { getUserProfile } from "../../services/firebase/user";

export default function ProtectedLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/");
        return;
      }

      // LGPD: sem consentimento vigente, a pessoa vai para a tela de
      // consentimento antes de acessar qualquer área que trate dados de saúde.
      try {
        const profile = await getUserProfile(user.uid);
        if (!hasValidConsents(profile)) {
          router.replace("/consentScreen");
        }
      } catch (error) {
        console.error("Erro ao verificar consentimento:", error);
        router.replace("/consentScreen");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />; // Slot = conteúdo das rotas protegidas
}
