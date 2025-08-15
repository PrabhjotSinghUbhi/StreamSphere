import React from "react";
import HeaderTwo from "../HeaderTwo/HeaderTwo";

function PrivacyPolicyPage() {
    return (
        <div>
            <div className="h-screen overflow-y-scroll scrollbar-hide bg-[#121212] text-white">
                <HeaderTwo />
                <section className="relative mx-auto max-w-3xl px-4 py-20">
                    <div className="mb-16 text-center">
                        <h1 className="mb-3 text-sm text-[#ae7aff]">Privacy Policy</h1>
                        <h2 className="mb-4 text-4xl font-bold">Your Privacy Matters at Stream Sphere</h2>
                        <h3 className="text-gray-300">
                            At Stream Sphere, we are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you use our platform.
                        </h3>
                    </div>
                    <div className="mb-8">
                        <p className="mb-4 text-gray-300">
                            We value your trust and strive to be transparent about our data practices. Stream Sphere only collects information necessary to provide you with a seamless streaming experience, improve our services, and keep your account secure.
                        </p>
                        <p className="mb-4 text-gray-300">
                            We never sell your personal information. We use industry-standard security measures to protect your data and give you control over your privacy settings.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">What information do we collect?</h3>
                        <ul className="list-disc pl-4 text-gray-300">
                            <li>Account information (such as username, email, and password)</li>
                            <li>Profile details you choose to share</li>
                            <li>Usage data (such as videos watched, playlists created, and interactions)</li>
                            <li>Device and browser information</li>
                            <li>Cookies and similar technologies (see below)</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">How do we use your information?</h3>
                        <ul className="list-disc pl-4 text-gray-300">
                            <li>To create and manage your Stream Sphere account</li>
                            <li>To personalize your experience and recommend content</li>
                            <li>To improve our platform and develop new features</li>
                            <li>To communicate with you about updates, security, and support</li>
                            <li>To comply with legal obligations and prevent misuse</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">Do we use cookies and other tracking technologies?</h3>
                        <p className="mb-4 text-gray-300">
                            Yes, Stream Sphere uses cookies and similar technologies to enhance your experience, remember your preferences, and analyze usage. You can manage your cookie settings in your browser at any time.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">How long do we keep your information?</h3>
                        <p className="mb-4 text-gray-300">
                            We retain your information only as long as necessary to provide our services and fulfill legal requirements. You can request deletion of your account and data at any time.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">How do we keep your information safe?</h3>
                        <p className="mb-4 text-gray-300">
                            Stream Sphere uses encryption, secure servers, and regular security audits to protect your data from unauthorized access, disclosure, or loss.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">What are your privacy rights?</h3>
                        <ul className="list-disc pl-4 text-gray-300">
                            <li>Access and update your personal information</li>
                            <li>Request deletion of your account and data</li>
                            <li>Manage your privacy and notification settings</li>
                            <li>Contact us with any privacy concerns</li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">How can you contact us about this policy?</h3>
                        <p className="mb-4 text-gray-300">
                            If you have questions or concerns about our privacy practices, please contact us:
                        </p>
                        <ol className="list-decimal pl-4 text-gray-300">
                            <li>Email: support@streamsphere.com</li>
                            <li>Contact form: Available in your account dashboard</li>
                            <li>Mail: Stream Sphere, 123 Privacy Lane, Web City, 00000</li>
                        </ol>
                    </div>
                </section>
                <footer className="px-4">
                    <div className="mx-auto flex max-w-7xl items-center justify-between py-2">
                        <div className="mr-4 w-12 shrink-0 sm:w-16">
                            <svg
                                style={{ width: "100%" }}
                                viewBox="0 0 63 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z"
                                    stroke="#E9FCFF"
                                    strokeWidth="1.38962"
                                    strokeMiterlimit="10"
                                ></path>
                                <path
                                    d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z"
                                    stroke="url(#paint0_linear_53_10115)"
                                    strokeWidth="6.99574"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                ></path>
                                <path
                                    d="M18.1915 27.6963C20.1641 27.6963 21.7285 28.7066 21.7285 30.9021C21.7285 33.0976 20.1621 34.2433 18.1915 34.2433H16.8854V37.8677H14.1733V27.6984H18.1915V27.6963Z"
                                    fill="#E9FCFF"
                                ></path>
                                <path
                                    d="M25.2053 27.6963V35.4868H28.484V37.8657H22.4932V27.6963H25.2053Z"
                                    fill="#E9FCFF"
                                ></path>
                                <path
                                    d="M35.3142 27.6963L39.4553 37.8657H36.5328L35.9162 36.1763H32.1939L31.5773 37.8657H28.6548L32.7959 27.6963H35.3101H35.3142ZM34.9143 33.5663L34.2144 31.7832C34.1582 31.6395 33.954 31.6395 33.8978 31.7832L33.1979 33.5663C33.1541 33.6767 33.2354 33.7975 33.3562 33.7975H34.756C34.8747 33.7975 34.958 33.6767 34.9143 33.5663Z"
                                    fill="#E9FCFF"
                                ></path>
                                <path
                                    d="M40.9491 27.6963L42.8592 30.5188L44.7694 27.6963H48.0355L44.2132 33.2559V37.8657H41.5011V33.2559L37.6787 27.6963H40.9449H40.9491Z"
                                    fill="#E9FCFF"
                                ></path>
                                <path
                                    d="M16.894 32.1396V29.9129C16.894 29.8212 16.9982 29.7671 17.0732 29.8191L18.6771 30.9315C18.7417 30.9773 18.7417 31.0731 18.6771 31.1189L17.0732 32.2313C16.9982 32.2834 16.894 32.2313 16.894 32.1375V32.1396Z"
                                    fill="#232323"
                                ></path>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_53_10115"
                                        x1="2.23416"
                                        y1="20.3361"
                                        x2="26.863"
                                        y2="44.9649"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#007EF8"></stop>
                                        <stop offset="1" stopColor="#FF4A9A"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <p className="text-sm">©2025 Stream Sphere. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;
