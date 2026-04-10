import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Client",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res.detail) {
        alert(res.detail);
      } else {
        // 🔥 Save session
        localStorage.setItem("user", JSON.stringify(res.user));

        // 🔥 Redirect based on role
        if (res.user.role === "Server") {
          navigate("/dashboard");
        } else {
          navigate("/client");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-6">

        <div className="flex flex-col items-center gap-2">
          <Shield className="h-10 w-10 text-primary" />
          <h1 className="text-2xl font-bold text-gradient">FairFL</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label>Role</Label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-1 w-full rounded-md bg-muted border border-border px-3 py-2"
            >
              <option>Client</option>
              <option>Server</option>
            </select>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </div>
      </div>
    </div>
  );
}