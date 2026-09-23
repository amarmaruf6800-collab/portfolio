import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { fadeUp, staggerContainer } from "../animations";

const socials = [
    { name: "GITHUB", href: "https://github.com/amarmaruf6800-collab" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/amar-maruf-694634188" },
    { name: "INSTAGRAM", href: "https://www.instagram.com/amar_alg20/" },
];

export default function Contact() {
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const subject = formData.get("project-type") || "New project inquiry";
        const body = [
            `Name: ${formData.get("name")}`,
            `Email: ${formData.get("email")}`,
            `Project type: ${subject}`,
            "",
            formData.get("message"),
        ].join("\n");

        const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

        if (!endpoint) {
            setSubmitted(true);
            window.location.href = `mailto:amarmaruf6800@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            return;
        }

        setIsSending(true);
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!response.ok) throw new Error("Form submission failed");
            setSubmitted(true);
            setMessage("");
            form.reset();
        } catch {
            setSubmitted(false);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
            <section className={`contact-section${isMobile ? " contact-mobile-static" : ""}`} id="contact">
                <div className="contact-container">

                    {/* HEADER */}
                    <motion.header
                        className="contact-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={staggerContainer}
                    >
                        <motion.span className="contact-eyebrow" variants={fadeUp}>
                            LET&apos;S TALK
                        </motion.span>

                        <motion.h2 variants={fadeUp}>
                            Have a project
                            <span>in mind?</span>
                        </motion.h2>

                        <motion.span className="contact-header-note" variants={fadeUp}>
                            01 / PROJECT INQUIRY
                        </motion.span>
                    </motion.header>

                    {/* PROJECT INQUIRY */}
                    <motion.div
                        className="contact-form-layout"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={staggerContainer}
                    >
                        <motion.div className="contact-form-intro" variants={fadeUp}>
                            <span className="contact-label">START A CONVERSATION</span>
                            <p>
                                Tell me what you&apos;re building. I&apos;ll get back
                                with a thoughtful next step.
                            </p>
                            <span className="contact-form-status">
                                <i />
                                {submitted ? "MESSAGE SENT" : isSending ? "SENDING MESSAGE" : "READY TO RECEIVE"}
                            </span>
                        </motion.div>

                        <motion.form className="contact-form" onSubmit={handleSubmit} variants={fadeUp}>
                            <div className="contact-form-row">
                                <label>
                                    <span>YOUR NAME</span>
                                    <input name="name" type="text" placeholder="Amar..." autoComplete="name" required />
                                </label>

                                <label>
                                    <span>EMAIL ADDRESS</span>
                                    <input name="email" type="email" placeholder="you@email.com" autoComplete="email" required />
                                </label>
                            </div>

                            <label>
                                <span>WHAT ARE YOU BUILDING?</span>
                                <select name="project-type" defaultValue="">
                                    <option value="" disabled>Select a direction</option>
                                    <option>Website / Portfolio</option>
                                    <option>Web Application</option>
                                    <option>E-commerce System</option>
                                    <option>Something else</option>
                                </select>
                            </label>

                            <label>
                                <span>YOUR MESSAGE</span>
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder="A few details about your idea..."
                                    minLength="20"
                                    maxLength="600"
                                    required
                                />
                                <small>{message.length.toString().padStart(3, "0")} / 600</small>
                            </label>

                            <button className="contact-submit" type="submit" disabled={isSending}>
                                <span>{isSending ? "SENDING..." : "SEND INQUIRY"}</span>
                                <Send size={16} strokeWidth={1.7} />
                            </button>
                        </motion.form>
                    </motion.div>

                    {/* SOCIALS */}
                    <motion.div
                        className="contact-socials"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        <motion.span className="contact-label" variants={fadeUp}>
                            ELSEWHERE
                        </motion.span>

                        <motion.div className="contact-social-list" variants={staggerContainer}>
                            {socials.map((social, index) => {
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-social"
                                        aria-label={social.name}
                                        variants={fadeUp}
                                    >
                                        <span className="contact-social-index">
                                            0{index + 1}
                                        </span>
                                        <span>{social.name}</span>
                                        <ArrowUpRight className="contact-social-arrow" size={13} strokeWidth={1.5} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* FOOTER */}
                    <motion.footer
                        className="contact-footer"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.8 }}
                        variants={fadeUp}
                    >
                        <a href="#" className="contact-footer-brand">
                            AMAR<span>.</span>
                        </a>

                        <span className="contact-footer-copy">
                            © 2026 AMAR MARUF
                        </span>

                        <nav className="contact-footer-nav" aria-label="Footer navigation">
                            <a href="#work">WORK</a>
                            <a href="#about">ABOUT</a>
                            <a href="#contact">CONTACT</a>
                        </nav>
                    </motion.footer>

                </div>
            </section>
        </MotionConfig>
    );
}