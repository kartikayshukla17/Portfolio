import { motion } from "framer-motion";
import { ContactProvider, useContact } from "../context/ContactContext";
import ConfirmationModal from "./ConfirmationModal";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

function ContactForm() {
  const { form, setForm, openModal } = useContact();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    openModal();
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 bg-background-light dark:bg-background-dark overflow-hidden" id="contact">
      <div className="absolute bottom-0 right-0 w-full h-[400px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <span className="text-secondary font-display font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">05. Connection</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-foreground mb-3">
            Get in <span className="text-primary font-black italic">Touch.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body max-w-lg mx-auto text-sm">
            Have a project in mind? Establish a connection below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

          {/* Left Column: Contact Details */}
          <motion.div
            className="lg:col-span-5 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-panel aura-border p-8 rounded-2xl relative overflow-hidden group h-full">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl font-display font-bold mb-8 text-foreground relative z-10">Contact Details</h3>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-1">Location</p>
                    <p className="font-body font-medium text-foreground">Remote / Global</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <span className="material-symbols-outlined text-secondary text-xl">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-1">Email</p>
                    <a href="mailto:kartikayshukla17@gmail.com" className="font-body font-medium text-foreground hover:text-secondary transition-colors">kartikayshukla17@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border/50 relative z-10">
                <p className="text-xs font-display uppercase tracking-wider text-slate-500 mb-4">External Networks</p>
                <div className="flex gap-4">
                  <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border hover:border-primary hover:text-primary transition-all group/social">
                    <GitHubIcon className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                  <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border hover:border-secondary hover:text-secondary transition-all group/social">
                    <LinkedInIcon className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div
            className="lg:col-span-7 glass-panel aura-border p-8 rounded-2xl relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full rounded-xl border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background outline-none transition-all"
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
                    className="w-full rounded-xl border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-background outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-display uppercase tracking-wider text-slate-500">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full rounded-xl border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-background outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-display uppercase tracking-wider text-slate-500">Transmission Log</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your vision..."
                  className="w-full rounded-xl border border-border bg-background/50 p-4 text-foreground font-body placeholder:text-slate-500 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-background outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-8 py-5 font-display font-bold text-background-dark hover:brightness-110 transition-all aura-glow flex items-center justify-center gap-3 overflow-hidden group relative mt-4"
              >
                <span className="relative z-10">Transmit Signal</span>
                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      <ConfirmationModal />
    </section>
  );
}

export default function Contact() {
  return (
    <ContactProvider>
      <ContactForm />
    </ContactProvider>
  );
}
