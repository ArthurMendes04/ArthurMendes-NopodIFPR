# Requisitos do NoPod, versão atualizada

Lista de requisitos do documento [Designer da Solução do Produto](Designer%20da%20solução%20do%20produto.pdf) (REF01 a REF07 e RNF01 a RNF05), acrescida dos requisitos que vieram dos ajustes pedidos pela banca (LGPD, menores de idade e enquadramento como ferramenta de bem-estar).

## Requisitos funcionais

| ID | Requisito | Situação |
| --- | --- | --- |
| REF01 | O sistema deve permitir que novos usuários se cadastrem. | Implementado |
| REF02 | O sistema deve permitir que usuários registrados façam login. | Implementado |
| REF03 | O sistema deve exibir tela de monitoramento. | Implementado (Home e Jornada) |
| REF04 | O sistema deve exibir círculo animado para exercício de respiração. | Implementado |
| REF05 | O sistema deve permitir que o usuário defina metas personalizadas. | Planejado |
| REF06 | O sistema deve conceder recompensas ao usuário sempre que ele atingir as metas personalizadas. | Planejado |
| REF07 | O sistema deve disponibilizar tela informacional que apresente conteúdos educativos. | Planejado |
| **REF08** | O sistema deve solicitar a data de nascimento no cadastro e impedir o cadastro de menores de 18 anos, exibindo uma tela de encaminhamento (Disque Saúde 136, UBS). | Implementado |
| **REF09** | O sistema deve solicitar consentimento específico e destacado para o tratamento de dados de saúde, separado dos Termos de Uso, e registrar a versão e a data do aceite. | Implementado |
| **REF10** | O sistema deve exigir o aceite dos Termos de Uso e da Política de Privacidade e pedir novo aceite quando a versão dos documentos mudar. | Implementado |
| **REF11** | O sistema deve oferecer, no Perfil, a exclusão definitiva da conta e de todos os dados, com confirmação de senha. | Implementado |
| **REF12** | O sistema deve exibir aviso de que não substitui acompanhamento profissional de saúde. | Implementado |

## Requisitos não funcionais

| ID | Requisito | Situação |
| --- | --- | --- |
| RNF01 | A autenticação e autorização dos usuários devem ser gerenciadas utilizando o Firebase Authentication. | Implementado |
| RNF02 | Os dados do usuário devem ser armazenados de forma persistente e segura utilizando o Firebase Firestore. | Implementado |
| RNF03 | O sistema deve ser funcional com dispositivos móveis com sistema operacional Android e iOS. | Implementado (testado em Android e web) |
| RNF04 | O sistema deve apresentar uma interface intuitiva, simples e de fácil navegação. | Implementado |
| RNF05 | As ações principais do aplicativo devem responder em até 2 segundos, considerando conexão estável. | Implementado |
| **RNF06** | As regras de segurança do Firestore devem negar acesso por padrão e permitir que cada usuário leia e altere apenas os próprios dados. | Implementado |
| **RNF07** | O servidor deve recusar registros de dados de saúde sem consentimento registrado e cadastros de menores de 18 anos. | Implementado |
| **RNF08** | O sistema deve coletar apenas os dados necessários (minimização, LGPD art. 6º, III), sem CPF, localização ou contatos. | Implementado |

O tratamento de dados e a conduta para menores estão documentados em [Docs/LGPD](../LGPD/README.md).
