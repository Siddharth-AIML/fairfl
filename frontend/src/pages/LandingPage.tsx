import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Cpu, Scale, Lock, BarChart3, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Cpu, title: "Federated Training", desc: "Train models across distributed clients without sharing raw data" },
  { icon: Scale, title: "Fairness Monitoring", desc: "Real-time demographic parity tracking and bias detection" },
  { icon: Lock, title: "Privacy First", desc: "Only model weights are shared — data never leaves the device" },
  { icon: BarChart3, title: "Explainability", desc: "SHAP-based feature importance and model interpretability" },
  { icon: Users, title: "Multi-Client", desc: "Manage and monitor multiple federated learning participants" },
  { icon: Zap, title: "Real-Time Alerts", desc: "Instant notifications when bias thresholds are exceeded" },
];

const stats = [
  { value: "99.2%", label: "Uptime" },
  { value: "<0.05", label: "Avg DP Score" },
  { value: "50+", label: "Clients Supported" },
  { value: "10ms", label: "Aggregation Latency" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-gradient">FairFL</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(263_70%_58%/0.12),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Zap className="h-3 w-3" /> Ethical AI · Federated Learning
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Fair & Private <br />
              <span className="text-gradient">Machine Learning</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Train unbiased AI models across distributed clients while preserving data privacy. Monitor fairness metrics in real-time with built-in explainability.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8" onClick={() => navigate("/login")}>
                Launch Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Everything you need for ethical AI</h2>
          <p className="text-muted-foreground mt-2">Built-in fairness, privacy, and transparency from the ground up</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-lg p-6 card-lift group">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-xl bg-card border border-primary/20 p-12 text-center card-glow">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Ready to build fair AI?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Start training privacy-preserving, bias-aware models with your team today.</p>
          <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8" onClick={() => navigate("/login")}>
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold text-gradient">FairFL</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 FairFL. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
