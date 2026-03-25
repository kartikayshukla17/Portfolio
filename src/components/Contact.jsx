import { memo, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactProvider, useContact } from "../context/ContactContext";
import ConfirmationModal from "./ConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";
import { EASE, EASE_GENTLE } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

// Magnetic hover — icon follows cursor within its bounding box
const MagneticIcon = ({ href, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: EASE_GENTLE });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: EASE_GENTLE });

    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      xTo((e.clientX - left - width / 2) * 0.35);
      yTo((e.clientY - top - height / 2) * 0.35);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center h-12 w-12 rounded-xl bg-background text-foreground border border-border hover:border-accent/30 transition-all duration-500 group/social"
    >
      {children}
    </a>
  );
};

const ContactForm = memo(function ContactForm() {
  const { form, setForm, openModal } = useContact();
  const sectionRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, [setForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    openModal();
  }, [openModal]);

  // Sequenced entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Header cascade
      tl.from("[data-contact-label]", { opacity: 0, y: 16, duration: 0.5 });
      tl.from("[data-contact-title]", { opacity: 0, y: 28, duration: 0.65 }, "-=0.3");
      tl.from("[data-contact-subtitle]", { opacity: 0, y: 14, duration: 0.5 }, "-=0.35");

      // Left panel slides in, then inner items stagger
      tl.from("[data-contact-left]", { opacity: 0, x: -40, scale: 0.97, duration: 0.7 }, "-=0.2");
      tl.from("[data-contact-detail]", { opacity: 0, x: -16, duration: 0.45, stagger: 0.1 }, "-=0.3");

      // Right panel slides in from right, then form fields cascade
      tl.from("[data-contact-right]", { opacity: 0, x: 40, scale: 0.97, duration: 0.7 }, "-=0.8");
      tl.from("[data-contact-field]", { opacity: 0, y: 20, duration: 0.45, stagger: 0.07 }, "-=0.3");
      tl.from("[data-contact-btn]", { opacity: 0, y: 16, scale: 0.95, duration: 0.5, ease: "back.out(1.4)" }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40 px-5 sm:px-8 lg:px-12 bg-transparent overflow-hidden" id="contact">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span data-contact-label className="text-accent font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">05. Connection</span>
          <h2 data-contact-title className="text-4xl sm:text-5xl font-bold font-display text-foreground mb-3">
            Get in <span className="text-muted-foreground font-normal italic">Touch.</span>
          </h2>
          <p data-contact-subtitle className="text-slate-500 dark:text-slate-400 font-body max-w-lg mx-auto text-sm">
            Need something built to scale and designed to stick? Let's make it happen.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

          {/* Left Column: Contact Details */}
          <div data-contact-left className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel aura-border p-8 rounded-2xl relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl font-display font-bold mb-8 text-foreground relative z-10">Contact Details</h3>

              <div className="flex flex-col gap-6 relative z-10">
                <div data-contact-detail className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                    <span className="material-symbols-outlined text-accent text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-1">Location</p>
                    <p className="font-body font-medium text-foreground">Remote / Global</p>
                  </div>
                </div>

                <div data-contact-detail className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                    <span className="material-symbols-outlined text-accent text-xl">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-1">Email</p>
                    <a href="mailto:kartikayshukla17@gmail.com" className="font-body font-medium text-foreground hover:text-foreground transition-colors duration-300">kartikayshukla17@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border/50 relative z-10">
                <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-4">Networks</p>
                <div className="flex gap-4">
                  <MagneticIcon href="https://github.com/kartikayshukla17">
                    <GitHubIcon className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </MagneticIcon>
                  <MagneticIcon href="https://www.linkedin.com/in/kartikay-shukla-27357a243/">
                    <LinkedInIcon className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </MagneticIcon>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div data-contact-right className="lg:col-span-7 glass-panel aura-border p-8 rounded-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div data-contact-field className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-display uppercase tracking-wider text-slate-500">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-accent focus:ring-1 focus:ring-accent focus:bg-background outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-display uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-accent focus:ring-1 focus:ring-accent focus:bg-background outline-none transition-all"
                  />
                </div>
              </div>
              <div data-contact-field className="space-y-2">
                <label htmlFor="subject" className="text-xs font-display uppercase tracking-wider text-slate-500">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full rounded-lg border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-accent focus:ring-1 focus:ring-accent focus:bg-background outline-none transition-all"
                />
              </div>
              <div data-contact-field className="space-y-2">
                <label htmlFor="message" className="text-xs font-display uppercase tracking-wider text-slate-500">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your vision..."
                  className="w-full rounded-lg border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-accent focus:ring-1 focus:ring-accent focus:bg-background outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div data-contact-btn>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-10 py-4 font-body font-medium text-[16px] text-background transition-opacity duration-300 hover:opacity-85"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <ConfirmationModal />
    </section>
  );
});

export default function Contact() {
  return (
    <ContactProvider>
      <ContactForm />
    </ContactProvider>
  );
}
