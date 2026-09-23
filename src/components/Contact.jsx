import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { fadeUp } from "../animations";

const socials = [
    { name: "GITHUB", href: "https://github.com/amarmaruf6800-collab" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/amar-maruf-694634188" },
    { name: "INSTAGRAM", href: "https://www.instagram.com/amar_alg20/" },
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

export default function Contact() {
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const update = () => setIsMobile(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
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
                    <Reveal as="header" enabled={!isMobile} className="contact-header">
                        <span className="contact-eyebrow">LET&apos;S TALK</span>

                        <h2>
                            Have a project
                            <span>in mind?</span>
                        </h2>

                        <span className="contact-header-note">
                            01 / PROJECT INQUIRY
                        </span>
                    </Reveal>

                    {/* PROJECT INQUIRY */}
                    <Reveal enabled={!isMobile} className="contact-form-layout">
                        <div className="contact-form-intro">
                            <span className="contact-label">START A CONVERSATION</span>
                            <p>
                                Tell me what you&apos;re building. I&apos;ll get back
                                with a thoughtful next step.
                            </p>
                            <span className="contact-form-status">
                                <i />
                                {submitted ? "MESSAGE SENT" : isSending ? "SENDING MESSAGE" : "READY TO RECEIVE"}
                            </span>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
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
                        </form>
                    </Reveal>

                    {/* SOCIALS */}
                    <Reveal enabled={!isMobile} className="contact-socials">
                        <span className="contact-label">ELSEWHERE</span>

                        <div className="contact-social-list">
                            {socials.map((social, index) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-social"
                                    aria-label={social.name}
                                >
                                    <span className="contact-social-index">
                                        0{index + 1}
                                    </span>
                                    <span>{social.name}</span>
                                    <ArrowUpRight className="contact-social-arrow" size={13} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    {/* FOOTER */}
                    <Reveal as="footer" enabled={!isMobile} className="contact-footer">
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
                    </Reveal>

                </div>
            </section>
        </MotionConfig>
    );
}
