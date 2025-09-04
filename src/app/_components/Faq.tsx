"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept all major credit cards, debit cards, UPI, and digital wallets like PayPal and Google Pay.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Delivery usually takes 3-7 business days depending on your location. You can track your order in your account dashboard.",
    },
    {
        question: "Can I return or exchange an item?",
        answer:
            "Yes! We offer hassle-free returns and exchanges within 14 days of purchase. Please check our return policy for details.",
    },
    {
        question: "Do you ship internationally?",
        answer:
            "Yes, we ship to multiple countries worldwide. Shipping charges and delivery times may vary based on location.",
    },
    {
        question: "Is my payment information secure?",
        answer:
            "Absolutely! We use end-to-end encryption and trusted payment gateways to keep your transactions safe.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center text-white-800 mb-8">
                Frequently Asked <span className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]  bg-clip-text text-transparent" >Questions</span>
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 font-white rounded-xl shadow-sm"
                    >
                        <button
                            className="w-full flex justify-between items-center p-4 text-left text-white font-medium  rounded-xl transition"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <ChevronDown
                                className={`h-5 w-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="p-4 text-gray-600 border-t bg-gray-50 rounded-b-xl">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
