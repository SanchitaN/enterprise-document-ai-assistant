import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";

import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        username,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Welcome Back
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Input
          label="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button
          type="submit"
          loading={loading}
        >
          Login
        </Button>
      </form>
    </Card>
  );
}