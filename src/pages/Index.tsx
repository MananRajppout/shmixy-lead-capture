import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Mic, Code2, CheckCircle2 } from "lucide-react";

const blockedDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "yahoo.co.uk",
  "icloud.com",
  "me.com",
  "msn.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "gmx.net",
  "ymail.com",
  "zoho.com",
  "mail.com",
  "yandex.com",
  "yandex.ru",
  "fastmail.com",
]);

function isBusinessEmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!basic.test(trimmed)) return false;
  const domain = trimmed.split("@")[1];
  if (!domain) return false;
  // Strip subdomains like sub.gmail.com
  const parts = domain.split(".");
  const base = parts.slice(-2).join(".");
  return !blockedDomains.has(base);
}

const Index = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const businessValid = useMemo(() => isBusinessEmail(email), [email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessValid) {
      toast({
        title: "Please use a business email",
        description: "Free email providers are not allowed.",
        variant: "destructive" as any,
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        _subject: "New Shmixy Lead",
        name,
        company,
        email,
        message,
        source: window.location.href,
        user_agent: navigator.userAgent,
      };

      const res = await fetch("https://formsubmit.co/ajax/igindi18@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
      toast({
        title: "Thanks!",
        description: "Your request was sent successfully.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive" as any,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="font-bold text-xl tracking-tight">Shmixy</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Solutions</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient opacity-20" aria-hidden />
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center py-20">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Meet Your New Team Member: AI. Always On. Always Selling. Always Supporting.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-prose">
                Boost sales, wow customers, and never miss a beat — with AI tailored to your essential needs.
              </p>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary opacity-90" /><span>Smarter Sales</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary opacity-90" /><span>Better Customer Support</span></li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-primary opacity-90" /><span>Real Results — Fast</span></li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg">
                  <a href="#contact" aria-label="Schedule a meeting with Shmixy">Schedule a meeting</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">Explore solutions</a>
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                See what success can look like in just 60 days.
              </p>
            </div>
            <div className="relative">
              <img
                src="/og-shmixy.jpg"
                loading="lazy"
                alt="Shmixy hero illustration – AI and code lines with gradient glow"
                className="rounded-lg shadow-elevated border border-border"
              />
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <article className="rounded-lg border border-border p-6 bg-card shadow-sm transition-transform hover:-translate-y-0.5">
              <Mic />
              <h3 className="mt-4 font-semibold text-lg">AI Voice Agents</h3>
              <p className="mt-2 text-sm text-muted-foreground">24/7 agents that answer calls, qualify leads, book appointments, and support customers in natural voice.</p>
            </article>
            <article className="rounded-lg border border-border p-6 bg-card shadow-sm transition-transform hover:-translate-y-0.5">
              <Bot />
              <h3 className="mt-4 font-semibold text-lg">Process Automation</h3>
              <p className="mt-2 text-sm text-muted-foreground">Intelligent workflows that handle repetitive work, integrate your tools, and keep teams in sync.</p>
            </article>
            <article className="rounded-lg border border-border p-6 bg-card shadow-sm transition-transform hover:-translate-y-0.5">
              <Code2 />
              <h3 className="mt-4 font-semibold text-lg">Websites & Apps</h3>
              <p className="mt-2 text-sm text-muted-foreground">High-quality, fast websites and applications engineered for conversions, reliability, and scale.</p>
            </article>
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-muted/30">
          <div className="container mx-auto py-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Get a Free Consultation</h2>
              <p className="mt-2 text-muted-foreground">
                Tell us about your goals. Business emails only; free providers like Gmail/Outlook are blocked.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required placeholder="Acme Inc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Business email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                  />
                  {email && !businessValid && (
                    <p className="text-sm text-destructive">Please use your business email address.</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">What can we automate or build for you?</Label>
                  <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Describe your processes, tools, and desired outcome..." />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Button type="submit" size="lg" variant="hero" disabled={loading || !businessValid}>
                    {loading ? "Sending..." : "Request consultation"}
                  </Button>
                  
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container mx-auto py-6 text-sm text-muted-foreground flex flex-col md:flex-row gap-2 items-center justify-between">
          <span>© {new Date().getFullYear()} Shmixy</span>
          <a href="#contact" className="hover:text-foreground">Get a free consultation</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
