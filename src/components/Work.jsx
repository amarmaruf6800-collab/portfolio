import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { projects } from "../projects";
import { fadeUp, staggerContainer } from "../animations";

// Varian baru untuk animasi Scanner 1x jalan
const scanVariant = {
    hidden: { top: "-25%", opacity: 0 },
    visible: {
        top: "100%",
        opacity: [0, 1, 1, 0], // Muncul perlahan, menahan, lalu hilang di bawah
        transition: {
            duration: 2.2,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.6 // Menunggu kartu selesai fadeUp dulu baru melakukan scan
        }
    }
};

function ProjectPreview({ project }) {
    return (
        <div className="work-preview">

            {/* SCANNER DIKENDALIKAN OLEH FRAMER MOTION (Bukan hover CSS lagi) */}
            <motion.div className="work-preview-scan" variants={scanVariant} />

            <div className="work-preview-grid" />
            <div className="work-preview-glow" />

            <div className="work-preview-window">
                <div className="work-window-top">
                    <span /><span /><span />
                </div>
                <div className="work-window-content">
                    <div className="work-window-label">{project.title}</div>
                    <div className="work-window-lines">
                        <span /><span /><span /><span />
                    </div>
                    <div className="work-window-blocks">
                        <div /><div /><div />
                    </div>
                </div>
            </div>

            <div className="work-preview-image">
                <img src={project.image} alt={project.title} />
                <div className="work-preview-image-overlay" />
            </div>

            <div className="work-preview-number">{project.number}</div>

            <div className="work-preview-corner top-left" />
            <div className="work-preview-corner top-right" />
            <div className="work-preview-corner bottom-left" />
            <div className="work-preview-corner bottom-right" />
        </div>
    );
}

// Tambah properti isReversed untuk membalik layout
function FeaturedProject({ project, isReversed }) {
    return (
        <motion.article
            // Tambahkan class is-reversed jika index ganjil
            className={`work-project ${isReversed ? "is-reversed" : ""}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
        >
            <div className="work-project-info">
                <div className="work-project-number">
                    {project.number}
                </div>

                <div className="work-project-main">
                    <span className="work-project-status">FEATURED PROJECT</span>

                    <h3>{project.title}</h3>
                    <p className="work-project-category">{project.category}</p>

                    <div className="work-project-role">
                        <span>ROLE: FULL-STACK DEVELOPER</span>
                    </div>

                    <p className="work-project-description">{project.description}</p>

                    <div className="work-stack">
                        {project.technologies.map((technology) => (
                            <span key={technology}>{technology}</span>
                        ))}
                    </div>

                    <div className="work-project-actions">
                        <a className="work-project-link" href={project.url} target="_blank" rel="noopener noreferrer">
                            <span>VIEW PROJECT</span>
                            <ArrowUpRight size={15} strokeWidth={1.7} />
                        </a>

                        <a className="work-project-link github-link" href="#" target="_blank" rel="noopener noreferrer">
                            <span>VIEW CODE</span>
                            <Code2 size={14} strokeWidth={1.7} />
                        </a>
                    </div>
                </div>
            </div>

            <ProjectPreview project={project} />
        </motion.article>
    );
}

function EarlyProject({ project }) {
    return (
        <motion.article className="work-early-project" variants={fadeUp}>
            <div className="work-early-number">{project.number}</div>
            <div className="work-early-main">
                <div className="work-early-heading">
                    <span className="work-project-status">EARLY WORK</span>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                </div>
                <p className="work-early-description">{project.description}</p>
                <div className="work-early-stack">
                    {project.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                    ))}
                </div>
                <div className="work-early-image">
                    <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                </div>
                <a className="work-early-link" href={project.url} target="_blank" rel="noopener noreferrer">
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight size={15} strokeWidth={1.7} />
                </a>
            </div>
        </motion.article>
    );
}

export default function Work() {
    const featuredProjects = projects.filter((project) => project.featured === true);
    const earlyProjects = projects.filter((project) => project.featured === false);

    return (
        <section className="work-section" id="work">
            <div className="work-container">

                <motion.header
                    className="work-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <div>
                        <motion.span className="work-eyebrow" variants={fadeUp}>
                            SELECTED WORK
                        </motion.span>
                        <motion.h2 variants={fadeUp}>
                            Things I&apos;ve<span>built.</span>
                        </motion.h2>
                    </div>
                    <motion.p className="work-intro" variants={fadeUp}>
                        A selection of projects I&apos;ve designed,
                        developed, and shipped — from interfaces
                        to complete systems.
                    </motion.p>
                </motion.header>

                <div className="work-list">
                    {/* Kirim isReversed = true untuk item dengan index ganjil (0 statis, 1 reverse, 2 statis) */}
                    {featuredProjects.map((project, index) => (
                        <FeaturedProject
                            key={project.number}
                            project={project}
                            isReversed={index % 2 !== 0}
                        />
                    ))}
                </div>

                <div className="work-early">
                    <motion.div
                        className="work-early-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                    >
                        <span>EARLY WORK</span>
                        <span>01 — 05</span>
                    </motion.div>

                    <motion.div
                        className="work-early-list"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                    >
                        {earlyProjects.map((project) => (
                            <EarlyProject key={project.number} project={project} />
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="work-bottom"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    variants={fadeUp}
                >
                    <span>{projects.length < 10 ? `0${projects.length}` : projects.length} PROJECTS</span>
                    <span>MORE IN DEVELOPMENT</span>
                </motion.div>

            </div>
        </section>
    );
}