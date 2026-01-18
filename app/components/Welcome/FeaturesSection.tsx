"use client";
import { motion } from "framer-motion";
import { features } from "./welcomeData";

export const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl p-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group relative bg-surface rounded-2xl p-8 text-center transition-all duration-300 shadow-soft hover:shadow-soft-lg border border-border-light hover:border-primary-200 overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/30 transition-all duration-500" />

          {/* Icon container */}
          <div className="relative z-10 w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">{feature.icon}</span>
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-xl font-semibold text-text-primary mb-3 group-hover:text-primary-600 transition-colors duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.div>
      ))}
    </div>
  );
};
