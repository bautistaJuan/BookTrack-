"use client";
import { motion } from "framer-motion";
import { FilterCardProps } from "../../types/types";
import { filters } from "@utils/utils";

export default function FiltersCard({ selectFilter, currentFilter }: FilterCardProps) {
    return (
        <div className="flex sm:flex-col items-center justify-center gap-2">
            {filters.map((f, index) => {
                const isActive = currentFilter === f.value;
                const Icon = f.icon;

                return (
                    <motion.button
                        key={f.value}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectFilter(f.value)}
                        className={`
                            relative flex items-center gap-3 px-4 py-3 rounded-xl w-full sm:w-[140px]
                            font-medium text-sm transition-all duration-300
                            ${isActive
                                ? "text-white shadow-soft-md"
                                : "text-text-secondary hover:text-text-primary hover:bg-surface"
                            }
                        `}
                    >
                        {/* Active background gradient */}
                        {isActive && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 gradient-primary rounded-xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}

                        {/* Icon */}
                        <div className={`relative z-10 ${isActive ? "text-white" : "text-text-muted"}`}>
                            <Icon size={20} />
                        </div>

                        {/* Label */}
                        <span className="relative z-10 hidden sm:inline">
                            {f.label}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}
