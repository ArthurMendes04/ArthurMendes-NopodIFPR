import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
    gap: 10,
  },

  logoutContainer: {
    position: "absolute",
    top: 77,
    right: 20,
  },

  informations: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  appLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  userTextContainer: {},

  userText: {
    paddingHorizontal: 10,
    color: colors.white[100],
    fontSize: 20,
  },

  weekControlContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
  },

  weekText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  weekTextTwo: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },

  calendarDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  calendarDaysText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
  },

  calendar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  weekIcons: {
    fontSize: 32,
  },

  noSmokeContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
  },

  noSmokeText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },

  imageContainer: {
    marginTop: 10,
  },

  noSmokeImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  smokeButtonContainer: {
    marginTop: 50,
    backgroundColor: colors.button[100],
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },

  smokeButtonText: {
    fontSize: 25,
    color: colors.white[100],
  },

  homeCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 22,
  },

  homeSmallCard: {
    width: "31%",
    height: 105,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  homeSmallCardText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },

  middleCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5,
    marginBottom: 25,
  },

  middleCard: {
    width: "48%",
    minHeight: 220,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  middleCardTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  middleCardNumber: {
    color: "white",
    fontSize: 64,
    fontWeight: "bold",
  },

  middleCardSubText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

});
