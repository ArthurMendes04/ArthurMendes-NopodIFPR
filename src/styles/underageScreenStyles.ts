import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 30,
  },

  appLogo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    color: colors.white[100],
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    width: 300,
  },

  text: {
    color: colors.white[100],
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    width: 300,
  },

  card: {
    width: 300,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 16,
    gap: 10,
    marginBottom: 10,
  },

  cardText: {
    color: colors.white[100],
    fontSize: 15,
    lineHeight: 21,
  },

  bold: {
    fontWeight: "bold",
  },

  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  button: {
    height: 60,
    backgroundColor: colors.button[100],
    borderRadius: 20,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.white[100],
    fontWeight: "bold",
    fontSize: 20,
  },
});
