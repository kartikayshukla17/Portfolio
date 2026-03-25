import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContact } from '../context/ContactContext';

const ConfirmationModal = () => {
    const { form, setForm, isModalOpen, closeModal, isSubmitting, setIsSubmitting, submissionStatus, setSubmissionStatus } = useContact();

    if (!isModalOpen) return null;

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submitToWeb3Forms = async () => {
        setIsSubmitting(true);
        setSubmissionStatus(null);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY",
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: form.message
                })
            });

            const json = await response.json();
            if (response.status === 200) {
                setSubmissionStatus("success");
            } else {
                setSubmissionStatus("error");
            }
        } catch (error) {
            setSubmissionStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <motion.div
                    className="relative w-full max-w-lg rounded-2xl border border-border/50 bg-background p-10 shadow-sm"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ opacity: 0, scale: 0.98, y: 10, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                >
                    {submissionStatus === "success" ? (
                        <motion.div
                          className="text-center py-10"
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }}
                        >
                            <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
                                <motion.div
                                  className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.3 } }}
                                >
                                    <span className="material-symbols-outlined text-4xl">check</span>
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-accent"
                                    initial={{ scale: 1, opacity: 0.6 }}
                                    animate={{ scale: 2.5, opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                />
                            </div>
                            <h3 className="mb-3 text-3xl font-display font-semibold tracking-tight text-foreground">Message Delivered.</h3>
                            <p className="mb-10 text-muted-foreground font-body text-base">Thanks for reaching out, {form.name}. I'll get back to you shortly.</p>
                            <button
                                onClick={() => { closeModal(); setSubmissionStatus(null); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                className="text-accent font-body font-medium text-base hover:underline underline-offset-4 transition-all duration-300"
                            >
                                Close
                            </button>
                        </motion.div>
                    ) : (
                        <>
                            <h3 className="mb-6 text-2xl font-bold font-display">Review Your Message</h3>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                                    <input type="text" name="name" value={form.name} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
                                    <input type="text" name="subject" value={form.subject} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Message</label>
                                    <textarea name="message" value={form.message} onChange={handleEdit} rows="3" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent p-3 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500 mt-2 resize-none" />
                                </div>
                            </div>

                            {submissionStatus === "error" && (
                                <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                                    Oops! Something went wrong. Please check your Web3Forms Access Key or try again later.
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button onClick={closeModal} disabled={isSubmitting} className="flex-1 rounded-full border border-border py-4 font-body font-medium text-muted-foreground hover:bg-muted/10 transition-colors duration-300">
                                    Cancel
                                </button>
                                <button onClick={submitToWeb3Forms} disabled={isSubmitting} className="flex flex-[2] items-center justify-center gap-3 rounded-full bg-foreground py-4 font-body font-medium text-[16px] text-background transition-opacity duration-300 hover:opacity-85 disabled:opacity-50">
                                    {isSubmitting ? "Sending..." : "Confirm & Send"}
                                    {!isSubmitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                                </button>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;
