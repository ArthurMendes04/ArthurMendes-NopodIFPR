import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
    gap: 12,
  },

  heading: {
    color: colors.white[100],
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },

  intro: {
    color: colors.white[100],
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },

  card: {
    width: "100%",
    backgroundColor: colors.white[100],
    borderRadius: 20,
    padding: 20,
  },

  highlightedCard: {
    borderWidth: 3,
    borderColor: colors.pink[100],
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  checkLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },

  disabledButton: {
    opacity: 0.5,
  },

  button: {
    height: 56,
    width: "100%",
    maxWidth: 320,
    backgroundColor: colors.button[100],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white[100],
  },

  buttonText: {
    color: colors.white[100],
    fontWeight: "bold",
    fontSize: 18,
  },
});
