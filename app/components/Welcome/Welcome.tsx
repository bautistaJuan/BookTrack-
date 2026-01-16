"use client";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { BenefitsSection } from "./BenefitosSection";
import { Footer } from "../Footer";

const Welcome = () => {
    return (
        <>
            <div className="min-h-screen w-full flex flex-col justify-center items-center px-4">
                <HeroSection />

                <h2 className="text-2xl mt-8 sm:text-3xl md:text-4xl font-semibold text-center text-textPrimary leading-snug">
                    Descubrí qué podés hacer con <span className="text-primary font-bold">Reader-Tracker</span>
                </h2>

                <FeaturesSection />

                <BenefitsSection />
            </div>

            <Footer />
        </>
    );
};

export default Welcome;
