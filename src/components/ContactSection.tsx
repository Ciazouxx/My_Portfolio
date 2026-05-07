import { Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

const contactDetails = [
  {
    label: "Email",
    value: "joevinyllpalabrica@gmail.com",
    icon: Mail,
    href: "mailto:joevinyllpalabrica@gmail.com",
  },
  {
    label: "Phone",
    value: "+63 995 177 1754",
    icon: Phone,
    href: "tel:+639951771754",
  },
  {
    label: "Location",
    value: "Davao City, Philippines",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Davao%20City%2C%20Philippines",
  },
  {
    label: "GitHub",
    value: "https://github.com/Ciazouxx",
    icon: Github,
    href: "https://github.com/Ciazouxx",
  },
];

const ContactSection = () => {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Please complete all fields before sending.");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("Email API is not configured yet. Please add the Web3Forms access key.");
      return;
    }

    setIsSending(true);
    setStatus("Sending your message...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `Portfolio message from ${name}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Email service rejected the request.");
      }

      setStatus("Message sent successfully. Thank you!");
      form.reset();
    } catch {
      setStatus("Message could not be sent. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    detail.href.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="glass-card flex items-start gap-4 border-primary/20 p-4 sm:items-center sm:p-5"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <detail.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-sm text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="font-body font-semibold text-foreground break-all">
                      {detail.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            className="glass-card border-primary/20 p-5 sm:p-6 md:p-8"
            onSubmit={handleSubmit}
          >
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>
            <div className="space-y-5">
              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-lg border border-border bg-background/70 px-4 py-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-lg border border-border bg-background/70 px-4 py-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="font-body text-sm font-semibold text-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  required
                  className="mt-2 w-full rounded-lg border border-border bg-background/70 px-4 py-3 font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
                {isSending ? "Sending..." : "Send Message"}
              </button>
              {status && (
                <p
                  className="text-center font-body text-sm text-muted-foreground"
                  role="status"
                  aria-live="polite"
                >
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
