import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getTodayResistedCount } from "../../services/firebase/user";
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, firestore } from "../../firebaseConfig";
import { colors } from "../../styles/colors";
import { styles } from "../../styles/homeStyles";
import { showAlert } from "../../utils/showAlert";
import { getUserProfile } from "../../services/firebase/user";

export default function Home() {
  /*  const [selectedDays, setSelectedDays] = useState({
      seg: false,
      ter: false,
      qua: false,
      qui: false,
      sex: false,
      sab: false,
      dom: false,
    });
  */
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [vezesNaoFumou, setVezesNaoFumou] = useState(0);
  const [ultimaResistencia, setUltimaResistencia] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);

  /*  const salvarDadosNoFirestore = async (novosDados: Partial<any>) => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await runTransaction(firestore, async (transaction) => {
            const atual = docSnap.data();
            transaction.update(docRef, { ...atual, ...novosDados });
          });
        } else {
          await setDoc(docRef, { ...novosDados });
        }
      } catch (err) {
        console.error("Erro ao salvar no Firestore:", err);
      }
    };
  */
  const handleLogout = async () => {
    if (Platform.OS === "web") {
      const confirmar = window.confirm("Você tem certeza que deseja sair?");
      if (!confirmar) return;
      try {
        setUserImage(null);
        await signOut(auth);
        router.replace("/");
      } catch (error) {
        console.error("Erro ao sair:", error);
      }
    } else {
      showAlert("Sair do aplicativo", "Você tem certeza que deseja sair?");
      Alert.alert(
        "Sair do aplicativo",
        "Você tem certeza que deseja sair?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sair",
            style: "destructive",
            onPress: async () => {
              try {
                setUserImage(null);
                await signOut(auth);
                router.replace("/");
              } catch (error) {
                console.error("Erro ao sair:", error);
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      async function carregarDados() {
        try {
          const user = auth.currentUser;

          if (user) {
            const dados = await getUserProfile(user.uid);

            if (dados) {
              setNomeUsuario(dados.name || "");
              const totalHoje = await getTodayResistedCount(user.uid);
              setVezesNaoFumou(totalHoje);

              if (dados.lastResistanceDate) {
                const data = dados.lastResistanceDate.toDate();

                const dataFormatada = `${data.toLocaleDateString("pt-BR")} às ${data.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`;

                setUltimaResistencia(dataFormatada);
              }
            }
          }
        } catch (error) {
          console.log("Erro ao carregar dados:", error);
        }
      }

      carregarDados();
    }, [])
  );

  /*  const toggleDaySelection = (day: keyof typeof selectedDays) => {
      Vibration.vibrate(50);
      setSelectedDays((prev) => {
        const novos = { ...prev, [day]: !prev[day] };
  //      salvarDadosNoFirestore({ selectedDays: novos });
        return novos;
      });
    };
  */
  /*  const renderDayIcon = (day: keyof typeof selectedDays) => {
      const isSelected = selectedDays[day];
      return (
        <TouchableOpacity onPress={() => toggleDaySelection(day)}>
          <MaterialIcons
            name="check-box"
            size={40}
            style={{
              backgroundColor: isSelected ? "white" : "transparent",
              borderRadius: 5,
              color: isSelected ? "green" : "black",
              textAlign: "center",
            }}
          />
        </TouchableOpacity>
      );
    };
  */
  const handleQueroFumar = () => {
    router.push("/breathingCircle");
  };

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.informations}>
          <Image
            source={require("../../assets/images/appLogo.png")}
            style={styles.appLogo}
          />

        </View>

        <View style={styles.logoutContainer}>
          <Pressable onPress={handleLogout}>
            <MaterialIcons name="logout" size={30} color="white" />
          </Pressable>
        </View>

        <View style={styles.userTextContainer}>
          <Text style={styles.userText}>Olá {nomeUsuario}!</Text>
        </View>

        <View style={styles.homeCardsContainer}>
          <Pressable
            style={styles.homeSmallCard}
            onPress={() => router.push("./dashboard")}
          >            <MaterialIcons name="bar-chart" size={46} color="white" />
            <Text style={styles.homeSmallCardText}>Jornada</Text>
          </Pressable>

          <Pressable style={styles.homeSmallCard}>
            <MaterialIcons name="track-changes" size={46} color="white" />
            <Text style={styles.homeSmallCardText}>Metas</Text>
          </Pressable>

          <Pressable style={styles.homeSmallCard}>
            <MaterialIcons name="campaign" size={46} color="white" />
            <Text style={styles.homeSmallCardText}>Fique por dentro!</Text>
          </Pressable>
        </View>

        <View style={styles.middleCardsContainer}>
          <View style={styles.middleCard}>
            <Text style={styles.middleCardTitle}>
              Vezes que deixou de fumar hoje
            </Text>

            <Text style={styles.middleCardNumber}>
              {vezesNaoFumou}
            </Text>
          </View>

          <View style={styles.middleCard}>
            <Text style={styles.middleCardTitle}>
              Meta atual
            </Text>

            <Text style={styles.middleCardSubText}>
              Em breve
            </Text>
          </View>
        </View>

        <View style={styles.smokeButtonContainer}>
          <Pressable onPress={handleQueroFumar}>
            <Text style={styles.smokeButtonText}>NÃO FUMAR</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}