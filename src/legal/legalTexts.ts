// Textos legais do NoPod (LGPD – Lei 13.709/2018).
// Ao alterar o conteúdo de um documento, aumente a versão correspondente:
// quem aceitou uma versão anterior será solicitado a aceitar de novo.

// E-mail do encarregado pelo tratamento de dados pessoais (art. 41 da LGPD).
export const DPO_EMAIL = "arthurvasconcelos7@gmail.com";

export const HEALTH_CONSENT_VERSION = "1.0";
export const TERMS_VERSION = "1.0";

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

export const TERMS_OF_USE: LegalDocument = {
  title: "Termos de Uso e Política de Privacidade",
  version: TERMS_VERSION,
  sections: [
    {
      title: "1. O que é o NoPod",
      body:
        "O NoPod é um aplicativo de apoio a quem deseja parar de fumar ou de usar cigarro eletrônico. " +
        "Ele oferece exercícios de respiração, registro das vezes em que você resistiu à vontade de fumar e acompanhamento do seu progresso.",
    },
    {
      title: "2. Não substitui acompanhamento profissional",
      body:
        "O NoPod é uma ferramenta de apoio e não substitui consulta, diagnóstico ou tratamento por profissional de saúde. " +
        "Procure um médico ou a Unidade Básica de Saúde (UBS): o SUS oferece tratamento gratuito para parar de fumar. " +
        "Em caso de mal-estar, sintomas de abstinência intensos ou emergência, procure atendimento imediatamente (SAMU 192). " +
        "Informações: Disque Saúde 136.",
    },
    {
      title: "3. Quem pode usar",
      body:
        "O aplicativo é destinado exclusivamente a pessoas com 18 anos ou mais. A data de nascimento é solicitada no cadastro " +
        "para verificar a idade, e contas de menores de idade não são criadas.",
    },
    {
      title: "4. Sua conta",
      body:
        "Você é responsável pela veracidade das informações informadas e pelo sigilo da sua senha. " +
        "Use o aplicativo apenas para fins pessoais e de acordo com a lei.",
    },
    {
      title: "5. Dados pessoais que coletamos",
      body:
        "• Cadastro: nome, e-mail e data de nascimento, tratados para criar e manter a sua conta e verificar a idade mínima " +
        "(execução do contrato, art. 7º, V, da LGPD).\n" +
        "• Dados de saúde: registros de resistência e progresso, tratados somente com o seu consentimento específico " +
        "(art. 11, I, da LGPD), solicitado em documento separado.\n" +
        "Os dados ficam armazenados no Google Firebase, que atua como operador em nome do NoPod. Não vendemos dados " +
        "nem os usamos para publicidade.",
    },
    {
      title: "6. Segurança",
      body:
        "O acesso aos dados exige login, e as regras do banco de dados permitem que cada pessoa leia e altere apenas os próprios dados.",
    },
    {
      title: "7. Seus direitos e exclusão da conta",
      body:
        "Você pode acessar, corrigir e excluir seus dados, além de revogar o consentimento (art. 18 da LGPD). " +
        "A opção \"Excluir conta\", no Perfil, apaga de forma definitiva a conta, os dados de cadastro e todo o histórico.",
    },
    {
      title: "8. Alterações destes termos",
      body:
        "Se estes termos mudarem, você será avisado no aplicativo e precisará aceitar a nova versão para continuar usando.",
    },
    {
      title: "9. Contato",
      body: `Encarregado pelo tratamento de dados pessoais: ${DPO_EMAIL}.`,
    },
  ],
};
