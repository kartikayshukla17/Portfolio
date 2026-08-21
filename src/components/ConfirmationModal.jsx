import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useContact } from '../context/ContactContext';

const ConfirmationModal = () => {
    const { form, setForm, isModalOpen, closeModal, isSubmitting, setIsSubmitting, submissionStatus, setSubmissionStatus } = useContact();
    const panelRef = useRef(null);

    // Animate modal panel in on open
    useEffect(() => {
        if (!isModalOpen || !panelRef.current) return;
        gsap.fromTo(panelRef.current,
            { opacity: 0, scale: 0.98, y: 10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'expo.out' }
        );
    }, [isModalOpen]);

    useEffect(() => {
        if (!isModalOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape" && !isSubmitting) closeModal();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.__lenis?.stop?.();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
            window.__lenis?.start?.();
        };
    }, [isModalOpen, isSubmitting, closeModal]);

    // Animate success state
    useEffect(() => {
        if (submissionStatus !== 'success' || !panelRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('[data-success-content]', { opacity: 0, y: 20, scale: 0.95, duration: 1.2, ease: 'expo.out', delay: 0.1 });
            gsap.from('[data-check-icon]', { scale: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 });
            gsap.to('[data-check-ripple]', { scale: 2.5, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 });
        }, panelRef);
        return () => ctx.revert();
    }, [submissionStatus]);

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

            if (response.status === 200) {
                setSubmissionStatus("success");
            } else {
                setSubmissionStatus("error");
            }
        } catch {
            setSubmissionStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm p-0 sm:items-center sm:p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !isSubmitting) closeModal(); }}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-border/50 bg-background p-6 sm:p-10 shadow-sm pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
                <button
                    type="button"
                    onClick={() => { if (!isSubmitting) closeModal(); }}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                    <span className="material-symbols-outlined" aria-hidden="true">close</span>
                </button>
                {submissionStatus === "success" ? (
                    <div data-success-content className="text-center py-10">
                        <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center">
                            <div
                                data-check-icon
                                className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm"
                            >
                                <span className="material-symbols-outlined text-4xl">check</span>
                            </div>
                            <div
                                data-check-ripple
                                className="absolute inset-0 rounded-full border-2 border-accent opacity-60"
                            />
                        </div>
                        <h3 id="confirm-title" className="mb-3 text-3xl font-display font-semibold tracking-tight text-foreground">Sent.</h3>
                        <p className="mb-10 text-muted-foreground font-body text-base">Got it, {form.name}. I'll reply.</p>
                        <button
                            onClick={() => { closeModal(); setSubmissionStatus(null); setForm({ name: '', email: '', subject: '', message: '' }); }}
                            className="inline-flex min-h-11 items-center justify-center text-accent font-body font-medium text-base hover:underline underline-offset-4 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 id="confirm-title" className="mb-6 pr-10 text-2xl font-bold font-display">Review Your Message</h3>
                        <div className="space-y-4 mb-8">
                            <div>
                                <label htmlFor="confirm-name" className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                                <input id="confirm-name" type="text" name="name" value={form.name} onChange={handleEdit} className="w-full min-h-11 border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                            </div>
                            <div>
                                <label htmlFor="confirm-email" className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                                <input id="confirm-email" type="email" name="email" value={form.email} onChange={handleEdit} className="w-full min-h-11 border-b border-slate-200 dark:border-slate-700 bg-transparent py-2 outline-none focus:border-accent transition-colors text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
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
                                Oops. Couldn't send. Try again in a minute.
                            </div>
                        )}

                        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4">
                            <button onClick={closeModal} disabled={isSubmitting} className="flex-1 min-h-12 rounded-full border border-border py-4 font-body font-medium text-muted-foreground hover:bg-muted/10 transition-colors duration-300">
                                Cancel
                            </button>
                            <button onClick={submitToWeb3Forms} disabled={isSubmitting} className="flex flex-[2] min-h-12 items-center justify-center gap-3 rounded-full bg-foreground py-4 font-body font-medium text-[16px] text-background transition-opacity duration-300 hover:opacity-85 disabled:opacity-50">
                                {isSubmitting ? "Sending..." : "Confirm & Send"}
                                {!isSubmitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmationModal;
