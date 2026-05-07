import {
  Code2,
  Database,
  Flame,
  Globe2,
  Layers,
  Server,
  ShieldCheck,
} from "lucide-react";

const stackGroups = [
  {
    title: "Frontend",
    description: "Used across the portfolio, CMBUEN, and QuizArena interfaces.",
    icon: Code2,
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Database",
    description: "Tools for authentication, data storage, and app services.",
    icon: Database,
    items: ["Firebase", "Supabase", "REST APIs", "Web3Forms"],
  },
  {
    title: "Deployment",
    description: "Hosting platforms used for the featured websites.",
    icon: Globe2,
    items: ["Vercel", "Netlify", "GitHub Pages"],
  },
  {
    title: "Project Types",
    description: "Practical builds shown in the featured project section.",
    icon: Layers,
    items: ["Portfolio Website", "Business Website", "Quiz Platform"],
  },
];

const featuredTools = [
  { name: "Firebase", icon: Flame },
  { name: "Supabase", icon: Database },
  { name: "Vercel", icon: Server },
  { name: "Netlify", icon: Globe2 },
  { name: "GitHub", icon: ShieldCheck },
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="relative py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-primary">TECH</span>{" "}
            <span>STACK</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl font-body text-muted-foreground">
            Technologies and platforms used to build, deploy, and support my featured projects.
          </p>
        </div>

        <div className="mx-auto mb-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {featuredTools.map((tool) => (
            <div
              key={tool.name}
              className="glass-card flex items-center gap-3 p-4"
            >
              <tool.icon className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-body font-semibold text-foreground">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {stackGroups.map((group) => (
            <article key={group.title} className="glass-card p-5 sm:p-6">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <group.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {group.title}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-body text-sm text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
