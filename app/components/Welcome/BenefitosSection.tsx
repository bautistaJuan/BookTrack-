"use client";
import { motion } from "framer-motion";
import { benefits } from "./welcomeData";

export const BenefitsSection = () => {
    return (
        <section className="relative max-w-4xl mx-auto mt-20 px-4 py-12">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-primary-300 to-primary-400" />

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
                <span className="text-text-primary">Beneficios de la lectura para </span>
                <span className="gradient-text">tu mente</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map(([icon, title, desc], i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileHover={{ scale: 1.02 }}
                        className="group flex gap-4 items-start p-5 bg-surface rounded-xl border border-border-light hover:border-primary-200 hover:shadow-soft transition-all duration-300"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <span className="text-2xl">{icon}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                                {title}
                            </h4>
                            <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
