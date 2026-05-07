import { ExternalLink } from "lucide-react";
import cmbuenPreview from "@/images/projects/cmbuen-home.png";
import quizArenaPreview from "@/images/projects/quizarena-home.png";

const projects = [
  {
    title: "CMBUEN Construction Services",
    description:
      "A responsive construction company website for presenting services, projects, and quote requests.",
    image: cmbuenPreview,
    url: "https://cmbuen.netlify.app/",
    tags: ["React", "Responsive Design", "Business Website"],
  },
  {
    title: "QuizArena",
    description:
      "A classroom quiz platform focused on student participation, teacher hosting, and progress feedback.",
    image: quizArenaPreview,
    url: "https://quiz-arena-pi.vercel.app/",
    tags: ["React", "Quiz Platform", "Education"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-primary">MY</span>{" "}
            <span>PROJECTS</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl font-body text-muted-foreground">
            Projects I built.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="glass-card mb-8 grid overflow-hidden last:mb-0 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className={`block border-b border-border lg:border-b-0 ${
                  index % 2 === 0 ? "lg:border-r" : "lg:order-2 lg:border-l"
                }`}
                aria-label={`Open ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} website preview`}
                  className="h-full min-h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <div className="flex flex-col justify-center p-5 sm:p-6 lg:p-8">
                <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                  Featured Website
                </p>
                <h3 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mb-5 font-body leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-body text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
