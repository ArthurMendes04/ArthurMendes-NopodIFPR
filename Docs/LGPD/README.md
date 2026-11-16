# Tratamento de dados pessoais e conduta para menores — NoPod

Documentação pedida pela banca: como o NoPod trata dado de saúde à luz da LGPD (Lei nº 13.709/2018) e qual é a conduta para menores de 18 anos.

**Resumo:** os dados de saúde só são gravados com consentimento específico e destacado (art. 11, I), registrado com versão e data. O usuário exclui a conta e todos os dados pelo próprio aplicativo. O app é restrito a maiores de 18 anos, e menores são bloqueados antes de qualquer dado ser gravado.

## Documentos exibidos no aplicativo

| Documento | Onde aparece | Registro do aceite |
| --- | --- | --- |
| [Termos de Uso e Política de Privacidade](Termos_de_Uso_e_Politica_de_Privacidade.md) | Cadastro (checkbox próprio) | `users/{uid}.consents.terms` |
| [Consentimento para dados de saúde](Consentimento_Dados_de_Saude.md) | Cadastro, em checkbox separado; tela de consentimento para contas antigas | `users/{uid}.consents.healthData` |

Os textos ficam em `src/legal/legalTexts.ts`. Quando a versão de um documento muda, quem aceitou a versão anterior volta à tela de consentimento antes de usar o app.

## Dados tratados

| Dado | Finalidade | Base legal (LGPD) |
| --- | --- | --- |
| Nome ou apelido, e-mail | Criar e manter a conta | Execução de contrato (art. 7º, V) |
| Data de nascimento | Verificar a idade mínima de 18 anos | Execução de contrato (art. 7º, V) |
| Histórico de resistências e contadores derivados | Mostrar o progresso (Home e Jornada) | Consentimento específico e destacado (art. 11, I) |
| Registro dos aceites (versão e data) | Comprovar o consentimento | Art. 8º, §2º |

Não são coletados CPF, localização, contatos nem fotos de terceiros. Os dados não são vendidos, não são usados para publicidade e não são compartilhados, exceto com o Google Firebase, que armazena os dados como operador.

## Segurança

As [regras do Firestore](../../firestore.rules) negam tudo por padrão e só permitem que cada pessoa leia e altere os próprios dados (`users/{uid}`). Além disso:

- validam os campos e os tipos gravados;
- exigem 18 anos ou mais também no servidor, e a data de nascimento não pode ser trocada depois;
- só aceitam registros no histórico (dado de saúde) se o consentimento estiver registrado;
- não permitem editar registros do histórico, apenas criar ou apagar.

## Direitos do titular e exclusão de conta

Pelo **Perfil → Excluir conta**, o usuário:

1. confirma a senha (o Firebase exige login recente);
2. o app apaga todos os documentos de `users/{uid}/history`;
3. apaga o documento `users/{uid}`;
4. apaga o usuário no Firebase Authentication.

A exclusão é definitiva. Como o app não funciona sem os dados de saúde, a revogação do consentimento é feita pela exclusão da conta (art. 8º, §5º, e art. 18). Outras solicitações vão para o encarregado de dados: **arthurvasconcelos7@gmail.com** (art. 41).

Implementação: `src/services/firebase/account.ts` e `src/app/(protected)/profile.tsx`.

## Conduta para menores de 18 anos

O NoPod é **restrito a maiores de 18 anos** nesta versão. Dados de saúde de adolescentes exigiriam salvaguardas adicionais da LGPD (art. 14) e do Estatuto Digital da Criança e do Adolescente (Lei nº 15.211/2025), como consentimento do responsável e supervisão parental, que o projeto ainda não oferece.

- **Cadastro:** a data de nascimento é obrigatória. Abaixo de 18 anos, o cadastro é bloqueado **antes** de criar a conta, e nenhum dado é gravado.
- **Encaminhamento:** a pessoa vê uma tela com o Disque Saúde 136 (botão de ligar), a orientação de procurar a UBS e de conversar com alguém de confiança.
- **Servidor:** as regras do Firestore recusam o cadastro de quem tem menos de 18 anos, mesmo que o app seja burlado.
- **Termos de Uso:** declaram que o uso é exclusivo para maiores de 18 anos.
- **Fase futura:** uma versão para 16 e 17 anos fica no roadmap, condicionada a consentimento verificável do responsável, parcerias institucionais e revisão jurídica.

Implementação: `src/utils/age.ts`, `src/app/registerScreen.tsx` e `src/app/underageScreen.tsx`.

## Aviso de saúde

O componente `HealthDisclaimer` ("não substitui acompanhamento profissional") aparece no cadastro, na Home, no exercício de respiração e no Perfil, e reforça que o NoPod é uma ferramenta de bem-estar, não um dispositivo médico.
