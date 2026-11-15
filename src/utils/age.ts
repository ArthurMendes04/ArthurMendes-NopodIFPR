// Regras de idade do NoPod.
// O MVP aceita apenas maiores de 18 anos (decisão após a banca, por causa da
// LGPD e do ECA Digital no tratamento de dados de saúde de adolescentes).

export const MIN_AGE = 18;

// Aplica a máscara DD/MM/AAAA enquanto o usuário digita.
export function maskBirthDate(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

// Converte "DD/MM/AAAA" em data. Retorna null se a data não existir
// (ex.: 31/02/2000) ou estiver fora de um intervalo razoável.
export function parseBirthDate(value: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  if (!isRealDate) return null;

  const today = new Date();
  if (date > today || year < 1900) return null;

  return date;
}

// Idade completa em anos na data de hoje.
export function calculateAge(birthDate: Date, today: Date = new Date()): number {
  let age = today.getFullYear() - birthDate.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

// Formato salvo no Firestore: "AAAA-MM-DD".
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
