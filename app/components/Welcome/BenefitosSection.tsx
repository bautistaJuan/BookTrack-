import { motion } from "framer-motion";
import { benefits } from "./welcomeData";

export const BenefitsSection = () => {
    return (
        <section className="max-w-3xl mx-auto mt-16 px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center font-playfair text-primary mb-8">
                Beneficios de la lectura para tu mente
            </h2>
            <ul className="space-y-6">
                {benefits.map(([icon, title, desc], i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex gap-4 items-start"
                    >
                        <span className="text-2xl">{icon}</span>
                        <div>
                            <h4 className="text-lg font-semibold text-primary">{title}</h4>
                            <p className="text-sm text-textSecondary">{desc}</p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
};
