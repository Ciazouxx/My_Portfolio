import { Gamepad2, Camera, Music, BookOpen, Palette, Dumbbell } from "lucide-react";

const hobbies = [
  {
    name: "Gaming",
    description: "Exploring virtual worlds and competitive gaming",
    icon: Gamepad2,
    color: "primary",
  },
  // {
  //   name: "Photography",
  //   description: "Capturing moments and creative compositions",
  //   icon: Camera,
  //   color: "secondary",
  // },
  {
    name: "Music",
    description: "Listening to various genres and playing instruments",
    icon: Music,
    color: "accent",
  },
  {
    name: "Reading",
    description: "Tech books, novels, and continuous learning",
    icon: BookOpen,
    color: "primary",
  },
  // {
  //   name: "Digital Art",
  //   description: "Creating designs and digital illustrations",
  //   icon: Palette,
  //   color: "secondary",
  // },
  // {
  //   name: "Fitness",
  //   description: "Staying active through workouts and sports",
  //   icon: Dumbbell,
  //   color: "accent",
  // },
];

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary neon-text-cyan">MY</span>{" "}
            <span className="text-foreground">HOBBIES</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
          <p className="font-body text-muted-foreground mt-6 max-w-2xl mx-auto">
            Beyond coding and technology, I enjoy various activities that help me
            stay creative and balanced.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <div
              key={hobby.name}
              className="group glass-card p-6 border-transparent hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:neon-border-cyan"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-${hobby.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <hobby.icon className={`w-8 h-8 text-${hobby.color}`} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {hobby.name}
              </h3>
              <p className="font-body text-muted-foreground">
                {hobby.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
