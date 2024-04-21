"use client"


import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Main = () => {
    const [showTypingAnimation, setShowTypingAnimation] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showGif, setShowGif] = useState(true);
    const [showImage, setShowImage] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0); // State to store the index of the selected option
    const [bodyBackground, setBodyBackground] = useState("");
    const options = ["Company", "Next Gen", "Author Details"];

    const optionContent = [
        { text: "Necxis is IT company which located in New Delhi.", imageSrc: "/Assets/necxis.png" },
        { text: "Next Generation is Our upcoming social connect app which is unique from overall.", imageSrc: "/Assets/NewGensvg1.svg" },
        { text: "I am Nithishwaran RP, you can call me RPN - FullStack Developer || Designer.", imageSrc: "/Assets/dev.png" }
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (selectedOption + 1) % options.length;
            setSelectedOption(nextIndex);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [selectedOption, options]);

    useEffect(() => {
        setShowTypingAnimation(true);
        const text = " Nithishwaran RP";

        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setTypedText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowGif(false);
        }, 10000);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!showImage) {
                setTimeout(() => {
                    setShowOptions(true);
                }, 500);
            }
        }, 10000);
        return () => clearTimeout(timeoutId);
    }, [showImage]);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const handleImageClick = () => {
        setBodyBackground("/Assets/bg3.png");
        setShowImage(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
                <div className="relative dark:drop-shadow-[0_0_0.3rem_white]">
                    <Image
                        src="/Assets/NewGensvg2.svg"
                        alt="Next.js Logo"
                        width={150}
                        height={80}
                        priority
                    />
                </div>
                <div className="w-1/4">
                    <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                        <a className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                            By{" "}
                            <AnimatePresence>
                                {showTypingAnimation && (
                                    <motion.div
                                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <strong>{typedText}</strong>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow p-4 bg-gray-50">
                <AnimatePresence>
                    {showGif && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
                            <motion.div
                                className="relative dark:drop-shadow-[0_0_0.3rem_#5271FF] "
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Image
                                    src="/newgen.gif"
                                    alt="Next.js Logo"
                                    width={280}
                                    height={80}
                                    priority
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <div className="relative dark:drop-shadow-[0_0_0.3rem_black]">
                    <div className="flex justify-center mt-8"
                        style={{ paddingTop: '300px' }}
                    >
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className={`py-4 mx-2 mt-12 px-20 rounded-full text-lg font-bold ${index === selectedOption ? 'active-option' : 'inactive-option'}`}
                                onClick={() => handleOptionClick(index)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <AnimatePresence>
                        {optionContent[selectedOption] && (
                            <motion.div
                                key={selectedOption}
                                initial={{ opacity: 0, x: 100 }} // Initial position from right (x: 100)
                                animate={{ opacity: 1, x: 0 }} // Final position (x: 0)
                                exit={{ opacity: 0, x: -100 }} // Move to the left when exiting (x: -100)
                                transition={{ duration: 0.5 }}
                                className="absolute inset-2 flex items-center justify-center backdrop-filter backdrop-blur-sm mb-12 bg-blue-100" // Added bg-red-100 for background color
                                style={{ marginBottom: '300px' }}
                            >
                                <div className="p-4 max-w-3xl flex items-center justify-between">
                                    <div className="ml-8">
                                        <Image
                                            src={optionContent[selectedOption].imageSrc}
                                            alt="Image"
                                            width={300}
                                            height={225}
                                        />
                                    </div>
                                    <div className="ml-8 text-lg font-medium">
                                        <p>{optionContent[selectedOption].text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                </div>

            </main>

            <footer className="flex justify-center items-center p-4 bg-gray-100 shadow mt-auto">
                <p>nithishnt2002@gmail.com | +91 9751448561 | Chennai</p>
            </footer>
        </div>
    );
}

export default Main;
