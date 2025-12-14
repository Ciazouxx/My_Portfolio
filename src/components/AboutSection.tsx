import { Code, Database, Globe, Cpu } from "lucide-react";
import OptimizedImage from "./ui/image";
import profile from "@/assets/profile.jpg";

const skills = [
  { name: "Web Development", icon: Globe, color: "primary" },
  { name: "Programming", icon: Code, color: "secondary" },
  // { name: "Database Management", icon: Database, color: "accent" },
  // { name: "IT Systems", icon: Cpu, color: "primary" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-secondary neon-text-magenta">ABOUT</span>{" "}
            <span className="text-foreground">ME</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}

          <div className="relative group">
            <div className="aspect-square max-w-md mx-auto glass-card p-4 animate-border-glow">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                <OptimizedImage
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                  priority
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              I am a passionate Bachelor of Science in Information Technology
              student dedicated to learning and mastering the latest
              technologies. My journey in IT has equipped me with skills in web
              development and programming.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              I believe in continuous learning and applying theoretical
              knowledge to real-world projects. My goal is to become a skilled
              IT professional who can contribute to innovative technological
              solutions.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`glass-card p-4 border-${skill.color}/30 hover:border-${skill.color} transition-all duration-300 group cursor-default`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <skill.icon
                    className={`w-8 h-8 mb-2 text-${skill.color} group-hover:animate-pulse`}
                  />
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
