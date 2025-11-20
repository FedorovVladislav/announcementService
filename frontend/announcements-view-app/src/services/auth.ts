export async function registerUser(data: { name: string; email: string; password: string }) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Произошла ошибка на сервере");
  }

  return result;
}