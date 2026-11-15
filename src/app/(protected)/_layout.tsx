// src/app/(protected)/layout.tsx
import { Redirect, Slot, router, usePathname } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ConsentGateContext } from "../../components/ConsentGate";
import { auth } from "../../firebaseConfig";
import { hasValidConsents } from "../../services/firebase/consent";
import { getUserProfile } from "../../services/firebase/user";

export default function ProtectedLayout() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [needsConsent, setNeedsConsent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/");
        return;
      }

      setLoading(true);
      // LGPD: sem os aceites vigentes, a pessoa vai para a tela de
      // consentimento antes de acessar qualquer área que trate dados de saúde.
      try {
        const profile = await getUserProfile(user.uid);
        setNeedsConsent(!hasValidConsents(profile));
      } catch (error) {
        console.error("Erro ao verificar consentimento:", error);
        setNeedsConsent(true);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const gate = useMemo(
    () => ({ markConsentAccepted: () => setNeedsConsent(false) }),
    []
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // O redirecionamento é renderizado (não chamado durante o carregamento)
  // para não remontar o layout em loop na versão web.
  if (needsConsent && pathname !== "/consentScreen") {
    return <Redirect href="/consentScreen" />;
  }

  return (
    <ConsentGateContext.Provider value={gate}>
      <Slot />
    </ConsentGateContext.Provider>
  );
}
