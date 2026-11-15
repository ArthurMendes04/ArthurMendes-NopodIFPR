import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { HEALTH_CONSENT_VERSION } from "../../legal/legalTexts";

// Registro de consentimento salvo em users/{uid}.consents.
// Guardar versão e data permite comprovar o consentimento (art. 8º, §2º, LGPD).
export const buildConsentRecord = () => {
  const now = new Date();
  return {
    healthData: { version: HEALTH_CONSENT_VERSION, acceptedAt: now },
  };
};

// true se o perfil tem o consentimento de saúde na versão vigente.
export const hasValidConsents = (profile: any): boolean => {
  const consents = profile?.consents;
  return consents?.healthData?.version === HEALTH_CONSENT_VERSION;
};

// Usado por quem já tinha conta antes do consentimento existir, ou quando a
// versão de algum documento muda.
export const saveConsents = async (userId: string) => {
  await setDoc(
    doc(firestore, "users", userId),
    { consents: buildConsentRecord() },
    { merge: true }
  );
};
