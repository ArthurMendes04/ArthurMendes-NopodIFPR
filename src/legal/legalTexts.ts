// Textos legais do NoPod (LGPD – Lei 13.709/2018).
// Ao alterar o conteúdo de um documento, aumente a versão correspondente:
// quem aceitou uma versão anterior será solicitado a aceitar de novo.

// TODO: substituir pelo e-mail real do encarregado de dados (art. 41 da LGPD).
export const DPO_EMAIL = "[seu e-mail]";

export const HEALTH_CONSENT_VERSION = "1.0";

export type LegalSection = {
  title: string;
  body: string;
};

export type LegalDocument = {
  title: string;
  version: string;
  sections: LegalSection[];
};

export const HEALTH_CONSENT: LegalDocument = {
  title: "Consentimento para tratamento de dados de saúde",
  version: HEALTH_CONSENT_VERSION,
  sections: [
    {
      title: "Por que pedimos este consentimento",
      body:
        "Informações sobre o hábito de fumar ou usar cigarro eletrônico são dados pessoais sensíveis referentes à saúde (art. 5º, II, da LGPD). " +
        "Por isso, o NoPod só trata esses dados com o seu consentimento específico e destacado, conforme o art. 11, I, da LGPD.",
    },
    {
      title: "Quais dados de saúde são tratados",
      body:
        "• Registros de cada vez que você resistiu à vontade de fumar (data e hora).\n" +
        "• Contadores e sequências calculados a partir desses registros (total de resistências, dias seguidos, última resistência).\n" +
        "• Registros de recaída, quando essa função estiver disponível.",
    },
    {
      title: "Para que usamos",
      body:
        "Exclusivamente para mostrar o seu progresso no aplicativo (tela inicial e Jornada) e apoiar a sua decisão de parar de fumar. " +
        "Não vendemos, não usamos para publicidade e não compartilhamos esses dados com terceiros, exceto o provedor de infraestrutura " +
        "(Google Firebase), que armazena os dados em nome do NoPod.",
    },
    {
      title: "Por quanto tempo",
      body:
        "Enquanto a sua conta existir. Ao excluir a conta pelo Perfil, os seus dados de saúde e de cadastro são apagados.",
    },
    {
      title: "Seus direitos",
      body:
        "Você pode, a qualquer momento: consultar seus dados no próprio aplicativo; pedir correção; revogar este consentimento; " +
        "e excluir a sua conta e todos os dados pelo Perfil (art. 8º, §5º, e art. 18 da LGPD). " +
        "Sem este consentimento o aplicativo não consegue registrar o seu progresso, por isso a revogação é feita pela exclusão da conta.",
    },
    {
      title: "Encarregado de dados",
      body: `Dúvidas ou solicitações sobre seus dados: ${DPO_EMAIL}.`,
    },
  ],
};
