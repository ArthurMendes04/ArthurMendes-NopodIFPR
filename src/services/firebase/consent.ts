import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { HEALTH_CONSENT_VERSION, TERMS_VERSION } from "../../legal/legalTexts";

// Registro de aceite salvo em users/{uid}.consents.
// Guardar versão e data permite comprovar o consentimento (art. 8º, §2º, LGPD).
export const buildConsentRecord = () => {
  const now = new Date();
  return {
    terms: { version: TERMS_VERSION, acceptedAt: now },
    healthData: { version: HEALTH_CONSENT_VERSION, acceptedAt: now },
  };
};

// true se o perfil aceitou os Termos de Uso e o consentimento de saúde
// nas versões vigentes.
export const hasValidConsents = (profile: any): boolean => {
  const consents = profile?.consents;
  return (
    consents?.terms?.version === TERMS_VERSION &&
    consents?.healthData?.version === HEALTH_CONSENT_VERSION
  );
};

// Usado por quem já tinha conta antes do aceite existir, ou quando a
// versão de algum documento muda.
export const saveConsents = async (userId: string) => {
  await setDoc(
    doc(firestore, "users", userId),
    { consents: buildConsentRecord() },
    { merge: true }
  );
};
