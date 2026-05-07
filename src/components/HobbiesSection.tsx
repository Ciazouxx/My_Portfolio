import { Gamepad2, Music, BookOpen } from "lucide-react";

const hobbies = [
  {
    name: "Gaming",
    description: "Exploring virtual worlds and competitive gaming",
    icon: Gamepad2,
    color: "primary",
  },
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
];

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">MY</span>{" "}
            <span className="text-foreground">HOBBIES</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          <p className="font-body text-muted-foreground mt-6 max-w-2xl mx-auto">
            Beyond coding and technology, I enjoy various activities that help me
            stay creative and balanced.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <div
              key={hobby.name}
              className="group glass-card p-6 transition-colors duration-200 hover:border-primary/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 rounded-lg bg-${hobby.color}/10 flex items-center justify-center mb-4`}
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
