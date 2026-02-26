import React, { createContext, useState, useContext } from "react";

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error' | null

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ContactContext.Provider value={{
            form, setForm,
            isModalOpen, openModal, closeModal,
            isSubmitting, setIsSubmitting,
            submissionStatus, setSubmissionStatus
        }}>
            {children}
        </ContactContext.Provider>
    );
};
