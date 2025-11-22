import { useState } from "react";

const LoginForm = () => {
  // состояния для email и пароля
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // обработчик отправки формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    console.log("Email:", email);
    console.log("Password:", password);
    // здесь можно сделать API-запрос на сервер для входа
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "left" }}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;