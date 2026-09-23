import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";
import { customEase } from "../animations";

const baseDelay = 1.15; // Delay awal untuk animasi pertama

const fadeUpVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: (delayIndex) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            delay: baseDelay + (delayIndex * 0.16),
            ease: customEase
        }
    })
};

const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: (delayIndex) => ({
        opacity: 1,
        transition: {
            duration: 0.85,
            delay: baseDelay + (delayIndex * 0.16),
            ease: customEase
        }
    })
};

export default function Hero() {
    return (
        <section className="hero">
            {/* Wrapper 3D tidak lagi menggunakan motion opacity awal agar langsung tayang */}
            <div className="hero-background">
                <HeroVisual />
            </div>

            <motion.header
                className="hero-nav"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
            >
                <a href="/" className="hero-logo">
                    AMAR<span>.</span>
                </a>

                <nav>
                    <a href="#work">WORK</a>
                    <a href="#about">ABOUT</a>
                    <a href="#contact">CONTACT</a>
                </nav>
            </motion.header>

            <div className="hero-content">
                <motion.p
                    className="hero-eyebrow"
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    JUNIOR FULL-STACK DEVELOPER
                </motion.p>

                <h1>
                    <motion.span
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUpVariant}
                    >
                        I build digital
                    </motion.span>
                    <motion.span
                        className="hero-title-muted"
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUpVariant}
                    >
                        products that work.
                    </motion.span>
                </h1>

                <motion.p
                    className="hero-description"
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    Building practical web applications from interface
                    to production.
                </motion.p>

                <motion.a
                    href="#work"
                    className="hero-button"
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <span>EXPLORE MY WORK</span>
                    <span className="hero-button-arrow">↗</span>
                </motion.a>
            </div>

            <motion.div
                className="hero-footer"
                custom={6}
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
            >
                <span>BASED IN INDONESIA</span>

                <span>
                    SCROLL TO EXPLORE <b>↓</b>
                </span>
            </motion.div>
        </section>
    );
}