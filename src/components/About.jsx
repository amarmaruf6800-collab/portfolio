import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../animations";

// Data keahlian baru Anda
const skillGroups = [
    {
        category: 'Frontend',
        description: 'Interfaces that feel clear, responsive, and alive.',
        featured: ['React', 'JavaScript', 'Tailwind CSS'],
        skills: ['HTML', 'CSS', 'Vite'],
    },
    {
        category: 'Backend',
        description: 'APIs and application logic built around real use cases.',
        featured: ['Node.js', 'Laravel', 'Python'],
        skills: ['Express', 'PHP', 'FastAPI'],
    },
    {
        category: 'Database',
        description: 'Working with structured data and application persistence.',
        featured: ['MySQL', 'MariaDB', 'TiDB'],
        skills: [],
    },
    {
        category: 'Tools & Cloud',
        description: 'Development, deployment, and infrastructure tools.',
        featured: ['Git', 'GitHub', 'AWS'],
        skills: ['Linux', 'VPS', 'VS Code'],
    },
];

export default function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <MotionConfig reducedMotion="never">
            <section className={`about-section${isMobile ? " about-mobile-static" : ""}`} id="about">
                <div className="about-container">

                    {/* HEADER */}
                    <motion.header
                        className="about-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <div>
                            <motion.span className="about-eyebrow" variants={fadeUp}>
                                ABOUT ME
                            </motion.span>

                            <motion.h2 variants={fadeUp}>
                                Building with
                                <span>intent.</span>
                            </motion.h2>
                        </div>

                        <motion.div className="about-header-meta" variants={fadeUp}>
                            <span>BASED IN INDONESIA</span>
                            <span>FULL-STACK DEVELOPMENT</span>
                        </motion.div>
                    </motion.header>

                    {/* INTRO */}
                    <motion.div
                        className="about-intro"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        <motion.div className="about-intro-index" variants={fadeUp}>
                            01
                        </motion.div>

                        <div className="about-intro-content">
                            <motion.span className="about-label" variants={fadeUp}>
                                WHO I AM
                            </motion.span>

                            <div className="about-intro-grid">
                                <motion.div className="about-copy" variants={staggerContainer}>
                                    <motion.p className="about-lead" variants={fadeUp}>
                                        I&apos;m Amar, a junior full-stack developer
                                        focused on turning ideas into useful digital
                                        products.
                                    </motion.p>

                                    <motion.p variants={fadeUp}>
                                        I enjoy working across the interface and the
                                        system behind it — from building responsive
                                        frontend experiences to developing the backend,
                                        database, and deployment that make them work.
                                    </motion.p>

                                    <motion.p variants={fadeUp}>
                                        Most of what I learn comes from building real
                                        projects, solving problems, and continuously
                                        improving what I&apos;ve already made.
                                    </motion.p>
                                </motion.div>

                                {/* TECHNICAL VISUAL (ANIMATED & LIGHTWEIGHT) */}
                                <motion.div className="about-visual" variants={fadeUp}>

                                    {/* Background Grid yang berjalan pelan */}
                                    <motion.div
                                        className="about-visual-grid"
                                        animate={isMobile ? undefined : { backgroundPosition: ["0px 0px", "38px 38px"] }}
                                        transition={isMobile ? undefined : { duration: 3, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Orbit 1 Berputar Searah Jarum Jam */}
                                    <motion.div
                                        className="about-orbit orbit-one"
                                        // Mempertahankan style CSS "transform: translate & rotateX" bawaan agar tidak tertimpa Framer Motion
                                        style={{ x: "-50%", y: "-50%", rotateX: 62 }}
                                        animate={isMobile ? undefined : { rotateZ: [0, 360] }}
                                        transition={isMobile ? undefined : { duration: 25, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Orbit 2 Berputar Berlawanan Arah Jarum Jam */}
                                    <motion.div
                                        className="about-orbit orbit-two"
                                        style={{ x: "-50%", y: "-50%", rotateX: 62 }}
                                        animate={isMobile ? undefined : { rotateZ: [360, 0] }}
                                        transition={isMobile ? undefined : { duration: 35, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Kotak Inti Berdenyut (Breathing Effect) */}
                                    <motion.div
                                        className="about-core"
                                        style={{ x: "-50%", y: "-50%" }}
                                        animate={isMobile ? undefined : {
                                            scale: [1, 1.05, 1],
                                            boxShadow: [
                                                "0 0 40px rgba(77, 225, 200, 0.08), inset 0 0 30px rgba(77, 225, 200, 0.035)",
                                                "0 0 60px rgba(77, 225, 200, 0.2), inset 0 0 40px rgba(77, 225, 200, 0.08)",
                                                "0 0 40px rgba(77, 225, 200, 0.08), inset 0 0 30px rgba(77, 225, 200, 0.035)"
                                            ]
                                        }}
                                        transition={isMobile ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <span>AMAR</span>
                                        <small>DEV / 01</small>
                                    </motion.div>

                                    {/* Titik Satelit Berkedip Berurutan */}
                                    <motion.div
                                        className="about-point point-one"
                                        animate={isMobile ? undefined : { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                                        transition={isMobile ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                    />
                                    <motion.div
                                        className="about-point point-two"
                                        animate={isMobile ? undefined : { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                                        transition={isMobile ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    />
                                    <motion.div
                                        className="about-point point-three"
                                        animate={isMobile ? undefined : { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                                        transition={isMobile ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                    />

                                    <div className="about-coordinate coordinate-top">
                                        07°08&apos;S
                                    </div>
                                    <div className="about-coordinate coordinate-bottom">
                                        110°24&apos;E
                                    </div>

                                    {/* Label Berkedip Indikator */}
                                    <motion.span
                                        className="about-visual-label"
                                        animate={isMobile ? undefined : { opacity: [0.4, 1, 0.4] }}
                                        transition={isMobile ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        SYSTEM / ONLINE
                                    </motion.span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SKILLS */}
                    <motion.div
                        className="about-skills"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        <motion.div className="about-skills-index" variants={fadeUp}>
                            02
                        </motion.div>

                        <div className="about-skills-content">
                            <motion.span className="about-label" variants={fadeUp}>
                                WHAT I WORK WITH
                            </motion.span>

                            <motion.div className="about-skills-grid" variants={staggerContainer}>

                                {skillGroups.map((group, index) => {
                                    const allSkills = [...group.featured, ...group.skills];

                                    return (
                                        <motion.div key={group.category} className="about-skill-group" variants={fadeUp}>
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
                                        </motion.div>
                                    );
                                })}

                            </motion.div>
                        </div>
                    </motion.div>

                    {/* CURRENTLY */}
                    <motion.div
                        className="about-current"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.div className="about-current-index" variants={fadeUp}>
                            03
                        </motion.div>

                        <div className="about-current-content">
                            <motion.span className="about-label" variants={fadeUp}>
                                CURRENTLY
                            </motion.span>

                            <div className="about-current-main">
                                <motion.h3 variants={staggerContainer}>
                                    <motion.span variants={fadeUp}>Learning.</motion.span>
                                    <motion.span variants={fadeUp}>Building.</motion.span>
                                    <motion.span variants={fadeUp}>Improving.</motion.span>
                                </motion.h3>

                                <motion.div className="about-current-info" variants={fadeUp}>
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
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>
        </MotionConfig>
    );
}