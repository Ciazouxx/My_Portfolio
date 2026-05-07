import { Code, Globe } from "lucide-react";

const skills = [
  { name: "Web Development", icon: Globe, color: "primary" },
  { name: "Programming", icon: Code, color: "secondary" },
];

const colorConfig: { [key: string]: { border: string; text: string } } = {
  primary: {
    border: "border-primary/30 hover:border-primary",
    text: "text-primary",
  },
  secondary: {
    border: "border-secondary/30 hover:border-secondary",
    text: "text-secondary",
  },
  accent: {
    border: "border-accent/30 hover:border-accent",
    text: "text-accent",
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">ABOUT</span>{" "}
            <span className="text-foreground">ME</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
          {/* Profile Image */}

          <div className="relative group">
            <div className="aspect-square w-full max-w-sm mx-auto rounded-lg border border-border bg-card p-3 shadow-sm md:max-w-md">
              <div className="w-full h-full rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src="/src/images/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-5 sm:space-y-6">
            <p className="font-body text-base text-muted-foreground leading-relaxed sm:text-lg">
              I am a passionate Bachelor of Science in Information Technology
              student dedicated to learning and mastering the latest
              technologies. My journey in IT has equipped me with skills in web
              development and programming.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed sm:text-lg">
              I believe in continuous learning and applying theoretical
              knowledge to real-world projects. My goal is to become a skilled
              IT professional who can contribute to innovative technological
              solutions.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:pt-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="glass-card p-4 transition-colors duration-200 group cursor-default"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <skill.icon className={`w-8 h-8 mb-2 text-${skill.color}`} />
                  <p className="font-body font-semibold text-foreground">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
