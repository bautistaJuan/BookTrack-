"use client";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { BenefitsSection } from "./BenefitosSection";
import { Footer } from "../Footer";
import { motion } from "framer-motion";

const Welcome = () => {
    return (
        <div className="min-h-screen w-full">
            <HeroSection />

            {/* Features Section with Header */}
            <section className="relative py-20 px-4">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent" />

                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-4"
                    >
                        <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                            ✨ Funcionalidades
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-text-primary leading-snug max-w-3xl"
                    >
                        Descubrí qué podés hacer con{" "}
                        <span className="gradient-text">Reader-Tracker</span>
                    </motion.h2>

                    <FeaturesSection />
                </div>
            </section>

            <BenefitsSection />

            <Footer />
        </div>
    );
};

export default Welcome;
