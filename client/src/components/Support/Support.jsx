import React, { useState } from "react";
import {
    HelpCircle,
    MessageCircle,
    Book,
    Video,
    Users,
    Search,
    ChevronDown,
    Send,
    Phone,
    Mail,
    ExternalLink
} from "lucide-react";

const SupportComponent = () => {
    const [activeTab, setActiveTab] = useState("faq");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [ticketForm, setTicketForm] = useState({
        subject: "",
        category: "",
        description: "",
        priority: "medium"
    });

    const tabs = [
        { id: "faq", label: "FAQ", icon: HelpCircle },
        { id: "guides", label: "Guides", icon: Book },
        { id: "videos", label: "Video Tutorials", icon: Video },
        { id: "contact", label: "Contact Support", icon: MessageCircle }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "faq":
                return renderFAQSection();
            case "guides":
                return renderGuidesSection();
            case "videos":
                return renderVideoSection();
            case "contact":
                return renderContactSection();
            default:
                return renderFAQSection();
        }
    };

    // Example FAQ rendering
    const faqs = [
        {
            id: 1,
            question: "How do I start my first stream?",
            answer: "Go to your dashboard → 'Go Live' → configure → Start Stream."
        },
        {
            id: 2,
            question: "What are the minimum system requirements?",
            answer: "For 1080p: i5-4670K / Ryzen 1600, 8GB RAM, GTX 1060, 5Mbps upload."
        }
    ];

    const filteredFaqs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderFAQSection = () => (
        <div className="space-y-4">
            <div className="relative">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-800 border border-dark-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            {filteredFaqs.map((faq) => (
                <div
                    key={faq.id}
                    className="border border-dark-600 rounded-lg overflow-hidden"
                >
                    <button
                        onClick={() =>
                            setExpandedFaq(
                                expandedFaq === faq.id ? null : faq.id
                            )
                        }
                        className="w-full flex items-center justify-between px-4 py-3 bg-dark-700 hover:bg-dark-600 transition-colors text-left"
                    >
                        <span className="font-medium text-gray-200">
                            {faq.question}
                        </span>
                        <ChevronDown
                            size={18}
                            className={`text-gray-400 transition-transform ${
                                expandedFaq === faq.id ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {expandedFaq === faq.id && (
                        <div className="px-4 py-3 bg-dark-800 text-gray-400 text-sm">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderGuidesSection = () => (
        <div className="text-gray-300">Guides content here...</div>
    );

    const renderVideoSection = () => (
        <div className="text-gray-300">Video tutorials here...</div>
    );

    const renderContactSection = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket form */}
            <div className="bg-dark-800 border border-dark-600 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                    Submit a Ticket
                </h3>
                <form className="space-y-3">
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        rows={4}
                        placeholder="Describe your issue..."
                        className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2">
                        <Send size={16} /> Submit
                    </button>
                </form>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 flex gap-3 items-center">
                    <Mail className="text-purple-400" size={20} />
                    <div>
                        <p className="font-medium text-white">Email Support</p>
                        <p className="text-gray-400 text-sm">
                            support@streamsphere.com
                        </p>
                    </div>
                </div>
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 flex gap-3 items-center">
                    <Phone className="text-blue-400" size={20} />
                    <div>
                        <p className="font-medium text-white">Phone Support</p>
                        <p className="text-gray-400 text-sm">
                            +1 (800) 123-456
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-6 shadow-lg">
                    <div className="flex items-center gap-3">
                        <HelpCircle size={26} className="text-white" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Support Center
                            </h1>
                            <p className="text-purple-100">
                                Find answers & get help fast
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-dark-700 mb-6">
                    <nav className="flex overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                                        activeTab === tab.id
                                            ? "text-purple-400 border-purple-500"
                                            : "text-gray-400 border-transparent hover:text-gray-200"
                                    }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                {renderContent()}
            </div>
        </div>
    );
};

export default SupportComponent;
