import React, { useState } from "react";
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Volume2,
    Wifi,
    ChevronRight,
    Save,
    Eye,
    EyeOff
} from "lucide-react";

const SettingsComponent = () => {
    const [activeSection, setActiveSection] = useState("profile");
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        desktop: true,
        streamAlerts: true
    });
    const [privacy, setPrivacy] = useState({
        profileVisibility: "public",
        showOnlineStatus: true,
        dataCollection: false
    });
    const [showPassword, setShowPassword] = useState(false);

    const sections = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy & Security", icon: Shield },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "language", label: "Language & Region", icon: Globe },
        { id: "audio", label: "Audio & Video", icon: Volume2 },
        { id: "network", label: "Network", icon: Wifi }
    ];

    // === Profile Section ===
    const renderProfileSection = () => (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        JS
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-background border border-border p-2 rounded-full hover:bg-muted transition-colors">
                        <User size={14} />
                    </button>
                </div>
                <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Display Name"
                            defaultValue="John Streamer"
                        />
                        <Input label="Username" defaultValue="@johnstreamer" />
                    </div>
                    <Textarea
                        label="Bio"
                        defaultValue="Gaming enthusiast and content creator streaming daily adventures!"
                    />
                </div>
            </div>

            <div className="border-t border-border pt-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                    Account Security
                </h4>
                <div className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        defaultValue="john@example.com"
                    />
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                defaultValue="password123"
                                className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // === Notifications Section ===
    const renderNotificationsSection = () => (
        <SectionWrapper title="Notification Preferences">
            {Object.entries(notifications).map(([key, value]) => (
                <ToggleRow
                    key={key}
                    label={key.replace(/([A-Z])/g, " $1").trim()}
                    value={value}
                    onToggle={() =>
                        setNotifications((prev) => ({ ...prev, [key]: !value }))
                    }
                />
            ))}
        </SectionWrapper>
    );

    // === Privacy Section ===
    const renderPrivacySection = () => (
        <SectionWrapper title="Privacy Settings">
            <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Profile Visibility
                </label>
                <select
                    value={privacy.profileVisibility}
                    onChange={(e) =>
                        setPrivacy((prev) => ({
                            ...prev,
                            profileVisibility: e.target.value
                        }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                </select>
            </div>
            {Object.entries(privacy)
                .filter(([key]) => key !== "profileVisibility")
                .map(([key, value]) => (
                    <ToggleRow
                        key={key}
                        label={key.replace(/([A-Z])/g, " $1").trim()}
                        value={value}
                        onToggle={() =>
                            setPrivacy((prev) => ({ ...prev, [key]: !value }))
                        }
                    />
                ))}
        </SectionWrapper>
    );

    // === Section Switcher ===
    const renderSection = () => {
        switch (activeSection) {
            case "profile":
                return renderProfileSection();
            case "notifications":
                return renderNotificationsSection();
            case "privacy":
                return renderPrivacySection();
            default:
                return (
                    <div className="text-center py-12 text-muted-foreground">
                        {sections.find((s) => s.id === activeSection)?.label}{" "}
                        settings coming soon...
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-card rounded-xl shadow-xl overflow-hidden border border-border">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                        <div className="flex items-center gap-3">
                            <Settings size={28} />
                            <div>
                                <h1 className="text-2xl font-bold">Settings</h1>
                                <p className="text-indigo-100">
                                    Customize your Stream Sphere experience
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row min-h-[600px]">
                        {/* Sidebar */}
                        <div className="w-full lg:w-64 bg-muted border-b lg:border-r lg:border-b-0 border-border">
                            <nav className="p-4">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() =>
                                                setActiveSection(section.id)
                                            }
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                                                activeSection === section.id
                                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                            }`}
                                        >
                                            <Icon size={20} />
                                            <span className="flex-1">
                                                {section.label}
                                            </span>
                                            <ChevronRight
                                                size={16}
                                                className={`transition-transform ${
                                                    activeSection === section.id
                                                        ? "rotate-90"
                                                        : ""
                                                }`}
                                            />
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 lg:p-8">
                            {renderSection()}

                            {/* Save Button */}
                            <div className="flex justify-end mt-10 pt-6 border-t border-border">
                                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700 transition-colors">
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// === Reusable UI Components ===
const Input = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
            {label}
        </label>
        <textarea
            {...props}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
    </div>
);

const ToggleRow = ({ label, value, onToggle }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-foreground">{label}</span>
        <button
            onClick={onToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
                value ? "bg-indigo-500" : "bg-muted"
            }`}
        >
            <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    value ? "translate-x-7" : "translate-x-1"
                }`}
            />
        </button>
    </div>
);

const SectionWrapper = ({ title, children }) => (
    <div className="space-y-6">
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

export default SettingsComponent;
