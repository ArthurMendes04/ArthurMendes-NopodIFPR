import { Alert, Platform } from "react-native";

// Pergunta de confirmação que funciona no celular e na web.
// (showAlert na web executa o primeiro botão automaticamente, então não
// serve para confirmações.)
export function confirmAction(
  title: string,
  message: string,
  confirmLabel: string
): Promise<boolean> {
  if (Platform.OS === "web") {
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
        { text: confirmLabel, style: "destructive", onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) }
    );
  });
}
