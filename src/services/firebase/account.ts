import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";

// Limite de operações por batch do Firestore.
const BATCH_LIMIT = 500;

// Exclusão definitiva da conta (LGPD, art. 18, VI): apaga o histórico,
// o perfil em users/{uid} e o usuário no Firebase Authentication.
// O Firebase exige login recente para excluir o usuário, por isso a senha
// é confirmada antes de apagar qualquer dado.
export const deleteAccount = async (password: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error("Nenhum usuário autenticado.");
  }

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  const historySnapshot = await getDocs(
    collection(firestore, "users", user.uid, "history")
  );
  for (let i = 0; i < historySnapshot.docs.length; i += BATCH_LIMIT) {
    const batch = writeBatch(firestore);
    historySnapshot.docs
      .slice(i, i + BATCH_LIMIT)
      .forEach((document) => batch.delete(document.ref));
    await batch.commit();
  }

  await deleteDoc(doc(firestore, "users", user.uid));
  await deleteUser(user);
};

// Mensagens amigáveis para os erros mais comuns da exclusão.
export const deleteAccountErrorMessage = (error: any): string => {
  switch (error?.code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      return "Senha incorreta.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet.";
    default:
      return "Não foi possível excluir a conta. Tente novamente.";
  }
};
