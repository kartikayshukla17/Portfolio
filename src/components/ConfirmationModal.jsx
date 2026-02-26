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
                    className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-primary/20 bg-white dark:bg-[#0f172a] p-8 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                >
                    {submissionStatus === "success" ? (
                        <div className="text-center py-8">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
                            <p className="mb-8 text-slate-500 dark:text-slate-400">Thanks for reaching out, {form.name}. I'll get back to you shortly.</p>
                            <button
                                onClick={() => { closeModal(); setSubmissionStatus(null); setForm({ name: '', email: '', subject: '', message: '' }) }}
                                className="w-full rounded-lg bg-primary px-6 py-3 font-bold text-background-dark hover:brightness-110 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="mb-6 text-2xl font-bold">Review Your Message</h3>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                                    <input type="text" name="name" value={form.name} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-primary transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-primary transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
                                    <input type="text" name="subject" value={form.subject} onChange={handleEdit} className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-primary transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Message</label>
                                    <textarea name="message" value={form.message} onChange={handleEdit} rows="3" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent p-3 outline-none focus:border-primary transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500 mt-2 resize-none" />
                                </div>
                            </div>

                            {submissionStatus === "error" && (
                                <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                                    Oops! Something went wrong. Please check your Web3Forms Access Key or try again later.
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button onClick={closeModal} disabled={isSubmitting} className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 py-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={submitToWeb3Forms} disabled={isSubmitting} className="flex flex-[2] items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-background-dark hover:brightness-110 neon-glow transition-all disabled:opacity-50">
                                    {isSubmitting ? "Sending..." : "Confirm & Send"}
                                    {!isSubmitting && <span className="material-symbols-outlined text-sm">send</span>}
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
