import { createContext, useContext } from "react";

// Permite que a tela de consentimento avise o layout protegido que o
// aceite foi salvo, liberando o acesso às demais telas.
type ConsentGate = {
  markConsentAccepted: () => void;
};

export const ConsentGateContext = createContext<ConsentGate>({
  markConsentAccepted: () => {},
});

export const useConsentGate = () => useContext(ConsentGateContext);
