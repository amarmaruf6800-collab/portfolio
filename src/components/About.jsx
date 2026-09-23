import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "../animations";

const skillGroups = [
    {
        category: "Frontend",
        description: "Interfaces that feel clear, responsive, and alive.",
        featured: ["React", "JavaScript", "Tailwind CSS"],
        skills: ["HTML", "CSS", "Vite"],
    },
    {
        category: "Backend",
        description: "APIs and application logic built around real use cases.",
        featured: ["Node.js", "Laravel", "Python"],
        skills: ["Express", "PHP", "FastAPI"],
    },
    {
        category: "Database",
        description: "Working with structured data and application persistence.",
        featured: ["MySQL", "MariaDB", "TiDB"],
        skills: [],
    },
    {
        category: "Tools & Cloud",
        description: "Development, deployment, and infrastructure tools.",
        featured: ["Git", "GitHub", "AWS"],
        skills: ["Linux", "VPS", "VS Code"],
    },
];

function Reveal({ as = "div", enabled, className, children }) {
    if (!enabled) {
        const Tag = as;
        return <Tag className={className}>{children}</Tag>;
    }

    const Component = motion[as] || motion.div;
    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={fadeUp}
        >
            {children}
        </Component>
    );
}

export default function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const update = () => setIsMobile(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return (
        <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
            <section className="about-section" id="about">
                <div className="about-container">

                    {/* HEADER */}
                    <Reveal as="header" enabled={!isMobile} className="about-header">
                        <div>
                            <span className="about-eyebrow">ABOUT ME</span>
                            <h2>
                                Building with
                                <span>intent.</span>
                            </h2>
                        </div>

                        <div className="about-header-meta">
                            <span>BASED IN INDONESIA</span>
                            <span>FULL-STACK DEVELOPMENT</span>
                        </div>
                    </Reveal>

                    {/* INTRO */}
                    <Reveal enabled={!isMobile} className="about-intro">
                        <div className="about-intro-index">01</div>

                        <div className="about-intro-content">
                            <span className="about-label">WHO I AM</span>

                            <div className="about-intro-grid">
                                <div className="about-copy">
                                    <p className="about-lead">
                                        I&apos;m Amar, a junior full-stack developer
                                        focused on turning ideas into useful digital
                                        products.
                                    </p>

                                    <p>
                                        I enjoy working across the interface and the
                                        system behind it — from building responsive
                                        frontend experiences to developing the backend,
                                        database, and deployment that make them work.
                                    </p>

                                    <p>
                                        Most of what I learn comes from building real
                                        projects, solving problems, and continuously
                                        improving what I&apos;ve already made.
                                    </p>
                                </div>

                                <div className="about-visual">
                                    <div className="about-visual-grid" />

                                    <div className="about-orbit orbit-one" />
                                    <div className="about-orbit orbit-two" />

                                    <div className="about-core">
                                        <span>AMAR</span>
                                        <small>DEV / 01</small>
                                    </div>

                                    <div className="about-point point-one" />
                                    <div className="about-point point-two" />
                                    <div className="about-point point-three" />

                                    <div className="about-coordinate coordinate-top">
                                        07°08&apos;S
                                    </div>
                                    <div className="about-coordinate coordinate-bottom">
                                        110°24&apos;E
                                    </div>

                                    <span className="about-visual-label">
                                        SYSTEM / ONLINE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* SKILLS */}
                    <Reveal enabled={!isMobile} className="about-skills">
                        <div className="about-skills-index">02</div>

                        <div className="about-skills-content">
                            <span className="about-label">WHAT I WORK WITH</span>

                            <div className="about-skills-grid">
                                {skillGroups.map((group, index) => {
                                    const allSkills = [...group.featured, ...group.skills];

                                    return (
                                        <div key={group.category} className="about-skill-group">
                                            <span className="about-skill-number">
                                                0{index + 1}
                                            </span>
                                            <h3>{group.category.toUpperCase()}</h3>
                                            <p className="about-skill-focus">
                                                {group.description}
                                            </p>
                                            <div className="about-skill-list">
                                                {allSkills.map((skill) => (
                                                    <span key={skill}>{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>

                    {/* CURRENTLY */}
                    <Reveal enabled={!isMobile} className="about-current">
                        <div className="about-current-index">03</div>

                        <div className="about-current-content">
                            <span className="about-label">CURRENTLY</span>

                            <div className="about-current-main">
                                <h3>
                                    <span>Learning.</span>
                                    <span>Building.</span>
                                    <span>Improving.</span>
                                </h3>

                                <div className="about-current-info">
                                    <p>
                                        I&apos;m currently focused on becoming a better
                                        developer by building projects, exploring new
                                        technologies, and understanding how products
                                        work beyond the interface.
                                    </p>

                                    <a href="#contact" className="about-contact-link">
                                        <span>LET&apos;S WORK TOGETHER</span>
                                        <ArrowUpRight size={15} strokeWidth={1.7} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                </div>
            </section>
        </MotionConfig>
    );
}
