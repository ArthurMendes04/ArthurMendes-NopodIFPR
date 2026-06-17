import { firestore } from "../../firebaseConfig";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export const createUserProfile = async (userId: string, data: any) => {
  await setDoc(doc(firestore, "users", userId), data);
};

export const registerResistedEvent = async (userId: string) => {
  const userRef = doc(firestore, "users", userId);

  // salva no histórico
  await addDoc(collection(firestore, "users", userId, "history"), {
    type: "resisted",
    createdAt: new Date(),
  });

  // atualiza contador e última resistência
  await updateDoc(userRef, {
    totalResisted: increment(1),
    lastResistanceDate: new Date(),
  });
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(firestore, "users", userId);

  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  return userSnap.data();

};

export const getTodayResistedCount = async (userId: string) => {
  const historyRef = collection(firestore, "users", userId, "history");

  const querySnapshot = await getDocs(historyRef);

  const hoje = new Date();

  const totalHoje = querySnapshot.docs.filter((documento) => {
    const dados = documento.data();

    if (dados.type !== "resisted") {
      return false;
    }

    if (!dados.createdAt) {
      return false;
    }

    const dataRegistro = dados.createdAt.toDate();

    return (
      dataRegistro.getDate() === hoje.getDate() &&
      dataRegistro.getMonth() === hoje.getMonth() &&
      dataRegistro.getFullYear() === hoje.getFullYear()
    );
  });

  return totalHoje.length;
};

export const getMonthResistedCount = async (userId: string) => {
  const historyRef = collection(firestore, "users", userId, "history");

  const querySnapshot = await getDocs(historyRef);

  const hoje = new Date();

  const totalMes = querySnapshot.docs.filter((documento) => {
    const dados = documento.data();

    if (dados.type !== "resisted") {
      return false;
    }

    if (!dados.createdAt) {
      return false;
    }

    const dataRegistro = dados.createdAt.toDate();

    return (
      dataRegistro.getMonth() === hoje.getMonth() &&
      dataRegistro.getFullYear() === hoje.getFullYear()
    );
  });

  return totalMes.length;
};

export const getResistanceDaysOfCurrentMonth = async (userId: string) => {
  const historyRef = collection(firestore, "users", userId, "history");

  const querySnapshot = await getDocs(historyRef);

  const hoje = new Date();

  const diasComResistencia = querySnapshot.docs
    .map((documento) => {
      const dados = documento.data();

      if (dados.type !== "resisted") {
        return null;
      }

      if (!dados.createdAt) {
        return null;
      }

      const dataRegistro = dados.createdAt.toDate();

      const mesmoMes = dataRegistro.getMonth() === hoje.getMonth();
      const mesmoAno = dataRegistro.getFullYear() === hoje.getFullYear();

      if (!mesmoMes || !mesmoAno) {
        return null;
      }

      return dataRegistro.getDate();
    })
    .filter((dia): dia is number => dia !== null);

  return [...new Set(diasComResistencia)];
};

export const getCurrentWeekResistedStats = async (userId: string) => {
  const historyRef = collection(firestore, "users", userId, "history");

  const querySnapshot = await getDocs(historyRef);

  const hoje = new Date();

  const inicioSemana = new Date(hoje);
  const diaSemana = hoje.getDay();

  const diferencaParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

  inicioSemana.setDate(hoje.getDate() + diferencaParaSegunda);
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  fimSemana.setHours(23, 59, 59, 999);

  const semana = [
    { day: "Seg", value: 0 },
    { day: "Ter", value: 0 },
    { day: "Qua", value: 0 },
    { day: "Qui", value: 0 },
    { day: "Sex", value: 0 },
    { day: "Sáb", value: 0 },
    { day: "Dom", value: 0 },
  ];

  querySnapshot.docs.forEach((documento) => {
    const dados = documento.data();

    if (dados.type !== "resisted") return;
    if (!dados.createdAt) return;

    const dataRegistro = dados.createdAt.toDate();

    if (dataRegistro < inicioSemana || dataRegistro > fimSemana) return;

    const dia = dataRegistro.getDay();

    const indice = dia === 0 ? 6 : dia - 1;

    semana[indice].value += 1;
  });

  return semana;
};

export const getYearResistedStats = async (userId: string) => {
  const historyRef = collection(firestore, "users", userId, "history");

  const querySnapshot = await getDocs(historyRef);

  const hoje = new Date();
  const anoAtual = hoje.getFullYear();

  const meses = Array.from({ length: 12 }, () => 0);

  querySnapshot.docs.forEach((documento) => {
    const dados = documento.data();

    if (dados.type !== "resisted") return;
    if (!dados.createdAt) return;

    const dataRegistro = dados.createdAt.toDate();

    if (dataRegistro.getFullYear() !== anoAtual) return;

    const mes = dataRegistro.getMonth();

    meses[mes] += 1;
  });

  console.log("Estatísticas do ano:", meses);

  return meses;
};