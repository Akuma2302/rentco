import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ShieldCheck } from "lucide-react";
import { Logo } from "../components/Logo";
import { PhoneFrame } from "../components/PhoneFrame";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would verify credentials
    navigate("/home");
  };

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col sm:overflow-y-auto bg-[linear-gradient(180deg,#EEF4FF_0%,#ffffff_42%)]">
        <div className="flex-1 flex flex-col justify-center px-7 py-8">
            {/* Brand */}
            <div className="w-full mb-7">
              <Logo size="lg" showTagline />
              <h1 className="mt-6 text-[28px] leading-[1.1] text-brand-navy">
                What You Have,
                <br />
                <span className="text-brand-blue">Someone Needs.</span>
              </h1>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">
                Own Smarter. Access Better.
              </p>
              <div className="mt-3 h-1 w-10 rounded-full bg-brand-blue" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu.my"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl bg-input-background"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use your verified university email to login
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-input-background"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-12 rounded-2xl text-base font-bold">
                Login
              </Button>

              <div className="text-center">
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-brand-blue hover:underline"
                >
                  New user? Create an account
                </Link>
              </div>
            </form>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>Verified Student Community</span>
              </div>
            </div>
          </div>
      </div>
    </PhoneFrame>
  );
}
