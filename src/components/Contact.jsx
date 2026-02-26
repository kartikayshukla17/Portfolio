import { motion } from "framer-motion";
import { ContactProvider, useContact } from "../context/ContactContext";
import ConfirmationModal from "./ConfirmationModal";

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
    <section className="py-12 lg:py-20 px-4 bg-slate-100/50 dark:bg-primary/5" id="contact">
      <div className="mx-auto max-w-md md:max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-start">

          {/* Left Column: Contact Details */}
          <motion.div
            className="rounded-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-background-dark p-6 md:p-8 shadow-2xl dark:shadow-primary/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">contact_support</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight lg:text-5xl">Get In Touch</h2>
            </div>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
              Have a project in mind or just want to say hi?
            </p>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Remote / Global</p>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <span className="material-symbols-outlined text-primary text-xl">mail</span>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">kartikayshukla17@gmail.com</p>
            </div>

            <div className="pt-6">
              <div className="flex gap-4">
                <a href="https://github.com/kartikayshukla17" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-background-dark transition-all">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/kartikay-shukla-27357a243/" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A66C2]/10 dark:bg-[#0A66C2]/20 px-4 py-3 text-sm font-bold text-[#0A66C2] dark:text-[#4799E8] hover:bg-[#0A66C2] hover:text-white transition-all">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div
            className="rounded-2xl border border-slate-200 dark:border-primary/10 bg-white dark:bg-background-dark p-8 shadow-2xl dark:shadow-primary/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-500">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-primary/5 p-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-500">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-primary/5 p-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-500">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="w-full rounded-lg border border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-primary/5 p-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-500">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-lg border border-slate-200 dark:border-primary/20 bg-slate-50 dark:bg-primary/5 p-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-8 py-4 font-bold text-background-dark hover:brightness-110 transition-all neon-glow flex items-center justify-center gap-2"
              >
                Send Message
                <span className="material-symbols-outlined">send</span>
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
