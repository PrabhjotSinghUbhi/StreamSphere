import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router";

function HeaderTwo() {
    return (
        <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
            <nav className="mx-auto flex max-w-7xl items-center py-2">
                <div className="mr-4 w-12 shrink-0 sm:w-16">
                    <Logo scale={300} />
                </div>
                <button className="group  peer ml-auto flex w-6 shrink-0 flex-wrap gap-y-1.5 md:hidden">
                    <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                    <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
                    <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
                </button>
                <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col justify-between border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 md:static md:ml-4 md:max-w-full md:shrink md:translate-x-0 md:flex-row md:border-none">
                    <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 md:hidden">
                        <span className="inline-block w-12">
                            <svg
                                style={{ width: "100%" }}
                                viewBox="0 0 63 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z"
                                    stroke="#E9FCFF"
                                    stroke-width="1.38962"
                                    stroke-miterlimit="10"
                                ></path>
                                <path
                                    d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z"
                                    stroke="url(#paint0_linear_53_10115)"
                                    stroke-width="6.99574"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
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
                                        <stop stop-color="#007EF8"></stop>
                                        <stop
                                            offset="1"
                                            stop-color="#FF4A9A"
                                        ></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <button className="inline-block w-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="my-4 mx-4 flex w-full flex-wrap gap-2 px-4 md:my-0 md:w-auto md:px-0">
                        <li className="w-full md:w-auto">
                            <NavLink
                                to={"/home"}
                                className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none"
                            >
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="w-full md:w-auto">
                            <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                                <span>Products</span>
                            </button>
                        </li>
                        <li className="w-full md:w-auto">
                            <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                                <span>Resources</span>
                            </button>
                        </li>
                        <li className="w-full md:w-auto">
                            <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black md:border-none">
                                <span>Pricing</span>
                            </button>
                        </li>
                    </ul>
                    <div className="mb-8 mt-auto flex flex-wrap gap-4 px-4 md:mb-0 md:mt-0 md:items-center md:px-0">
                        <button className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] md:w-auto md:bg-transparent">
                            Log in
                        </button>
                        <button className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] md:w-auto">
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderTwo;
