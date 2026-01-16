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
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-surface rounded-xl shadow-sm border border-border p-6 text-center hover:shadow-md transition"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-primary font-playfair mb-2">
            {feature.title}
          </h3>
          <p className="text-textSecondary text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
