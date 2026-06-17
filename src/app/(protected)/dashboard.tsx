import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { auth } from "../../firebaseConfig";
import {
  getCurrentWeekResistedStats,
  getMonthResistedCount,
  getResistanceDaysOfCurrentMonth,
  getTodayResistedCount,
  getYearResistedStats,
} from "../../services/firebase/user";
import { colors } from "../../styles/colors";

export default function Dashboard() {
  const router = useRouter();

  const [todayCount, setTodayCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [resistanceDays, setResistanceDays] = useState<number[]>([]);

  const [weekStats, setWeekStats] = useState([
    { day: "Seg", value: 0 },
    { day: "Ter", value: 0 },
    { day: "Qua", value: 0 },
    { day: "Qui", value: 0 },
    { day: "Sex", value: 0 },
    { day: "Sáb", value: 0 },
    { day: "Dom", value: 0 },
  ]);

  const [yearStats, setYearStats] = useState<number[]>(
    Array.from({ length: 12 }, () => 0)
  );

  const motivationalMessages = [
    "Cada resistência é uma vitória.",
    "Você está mais forte que o desejo.",
    "Continue firme, você consegue.",
    "Um dia de cada vez.",
    "Toda vontade vencida é um avanço.",
  ];

  const [motivation] = useState(
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ]
  );

  const currentDate = new Date();

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const daysInCurrentMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const monthDays = Array.from(
    { length: daysInCurrentMonth },
    (_, index) => index + 1
  );

  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1
  ).getDay();

  const calendarDays = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...monthDays,
  ];

  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  useFocusEffect(
    React.useCallback(() => {
      async function loadDashboardData() {
        const user = auth.currentUser;

        if (!user) return;

        const today = await getTodayResistedCount(user.uid);
        const month = await getMonthResistedCount(user.uid);
        const days = await getResistanceDaysOfCurrentMonth(user.uid);
        const week = await getCurrentWeekResistedStats(user.uid);
        const year = await getYearResistedStats(user.uid);

        setTodayCount(today);
        setMonthCount(month);
        setResistanceDays(days);
        setWeekStats(week);
        setYearStats(year);
      }

      loadDashboardData();
    }, [])
  );

  return (
    <LinearGradient
      colors={[colors.pink[100], colors.blue[100]]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: "white", fontSize: 36 }}>←</Text>
        </Pressable>

        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Sua Jornada
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 18,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            {currentMonthName} {currentYear}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {weekDays.map((day, index) => (
              <Text
                key={index}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: 34,
                  textAlign: "center",
                }}
              >
                {day}
              </Text>
            ))}
          </View>

          <View style={{ alignItems: "center", gap: 10 }}>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
              (_, rowIndex) => {
                const week = calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7);

                while (week.length < 7) {
                  week.push(null);
                }

                return (
                  <View
                    key={rowIndex}
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    {week.map((day, index) => {
                      const hasResistance =
                        day !== null && resistanceDays.includes(day);

                      const isToday =
                        day !== null && day === currentDate.getDate();

                      return (
                        <View
                          key={index}
                          style={{
                            width: 34,
                            height: 34,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {day !== null ? (
                            <View
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                borderWidth: isToday ? 3 : 1,
                                borderColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: hasResistance
                                  ? "rgba(255,255,255,0.35)"
                                  : isToday
                                  ? "rgba(255,255,255,0.18)"
                                  : "transparent",
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: isToday ? 15 : 13,
                                }}
                              >
                                {day}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ width: 32, height: 32 }} />
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              }
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 18,
              marginTop: 18,
            }}
          >
            <Text style={{ color: "white" }}>● Resistiu</Text>
            <Text style={{ color: "white" }}>○ Sem registro</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <View
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 14,
              padding: 16,
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Resistências no mês
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {monthCount}
            </Text>
          </View>

          <View
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 14,
              padding: 16,
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Recaídas no mês
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              0
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 18,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Semana atual
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {weekStats.map((item) => (
              <View key={item.day} style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: 8,
                  }}
                >
                  {item.day}
                </Text>

                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    borderWidth: 1,
                    borderColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 18,
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Ano {currentYear}
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 12 }}>
            {months.map((month, index) => (
              <View
                key={month}
                style={{
                  width: "25%",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 54,
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {month}
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {yearStats[index]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 14,
              padding: 16,
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Resistências hoje
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              {todayCount}
            </Text>
          </View>

          <View
            style={{
              width: "48%",
              borderWidth: 1,
              borderColor: "white",
              borderRadius: 14,
              padding: 16,
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Motivação do dia
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "600",
                marginTop: 14,
                textAlign: "center",
              }}
            >
              {motivation}
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}