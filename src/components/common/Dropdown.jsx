import React, { useState, useRef, useEffect } from "react";
import Flag from "react-world-flags"; // Handles flag rendering by country name
import { getNames } from "country-list"; // Import country list

const Dropdown = ({ onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); // Track selected country
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleOptionSelect = (country) => {
        setSelectedOption(country); // Update selected country
        onOptionSelect(country); // Notify parent component
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeDropdown);
        return () => document.removeEventListener("mousedown", closeDropdown);
    }, []);

    // Get the list of country names from the `country-list` package
    const countryList = getNames().map((name) => ({
        name,
        code: name.toLowerCase().replace(" ", "-"), // Basic conversion for flag usage
    }));

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-black bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
            >
                {selectedOption ? (
                    <div className="flex items-center gap-2">
                        <Flag code={selectedOption.code} className="w-5 h-5" />
                        {selectedOption.name}
                    </div>
                ) : (
                    "Select a country"
                )}
                <svg
                    className={`w-2.5 h-2.5 ms-3 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700">
                        {countryList.map((country, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleOptionSelect(country)}
                                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                >
                                    <Flag code={country.code} className="w-5 h-5" />
                                    {country.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
