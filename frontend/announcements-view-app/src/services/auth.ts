import type { RegistrationFormData } from "@/types/RegistrationFormData";

export async function registerUser(data: RegistrationFormData) {
    try {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

    // читаем ответ текстом (чтобы не ломаться на пустом/не JSON)
    const text = await response.text();
    const json = text ? JSON.parse(text) : null;

    // Если сервер вернул ошибку (400–500)
    if (!response.ok) {
      throw new Error(json?.message || `Ошибка ${response.status}`);
    }

    // Успех
    return json;
  } catch (err) {
    // Ошибки сети / парсинга / другие
    console.error("Ошибка запроса:", err);
    throw new Error(err instanceof Error ? err.message : "Неизвестная ошибка");
  }
}