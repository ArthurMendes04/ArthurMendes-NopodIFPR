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
    gap: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  title: {
    color: colors.white[100],
    fontSize: 26,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: colors.white[100],
    borderRadius: 20,
    padding: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.pink[100],
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
  },

  value: {
    fontSize: 16,
    color: "#222",
  },

  small: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  linkText: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },

  button: {
    height: 56,
    backgroundColor: colors.button[100],
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.white[100],
    fontWeight: "bold",
    fontSize: 17,
  },

  dangerCard: {
    borderWidth: 1,
    borderColor: colors.white[100],
    borderRadius: 20,
    padding: 18,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },

  dangerTitle: {
    color: colors.white[100],
    fontSize: 18,
    fontWeight: "bold",
  },

  dangerText: {
    color: colors.white[100],
    fontSize: 14,
    lineHeight: 20,
  },

  dangerButton: {
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white[100],
    alignItems: "center",
    justifyContent: "center",
  },

  dangerConfirm: {
    backgroundColor: "#C62828",
    borderColor: "#C62828",
  },

  input: {
    backgroundColor: colors.white[100],
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  flex: {
    flex: 1,
  },
});
