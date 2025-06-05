import { motion } from "framer-motion";
import { FilterCardProps } from "../../types/types";
import { filters } from "@/app/utils/utils";
export default function FiltersCard({ selectFilter, currentFilter }: FilterCardProps) {

    const box = {
        width: 80,
        height: 80,
        borderRadius: 5,
    }
    return (
        <motion.div className="flex sm:flex-col sm:w-fit border-2 items-center justify-center gap-3">
            {filters.map((f) =>
            (
                <motion.div
                    key={f.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    style={box}
                    className={`flex border items-center flex-col justify-center mb-1 cursor-pointer text-center ${currentFilter == f.value ? "text-red-500" : "text-blue-600"}`}
                    onClick={() => selectFilter(f.value)}
                >
                    <f.icon />
                    {f.label}
                </motion.div>
            )
            )}
        </motion.div>
    );
}

