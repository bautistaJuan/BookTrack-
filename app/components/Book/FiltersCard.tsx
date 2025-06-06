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
        <div className="flex sm:flex-col sm:w-fit items-center justify-center gap-3">
            {filters.map((f) =>
            (
                <motion.div
                    key={f.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    style={box}
                    className={`flex border items-center flex-col justify-center mb-1 cursor-pointer text-center ${currentFilter == f.value ? "text-white bg-green-500" : "text-gray-500"} hover:text-white hover:bg-green-500 transition-colors duration-200 p-2 rounded-md`}
                    onClick={() => selectFilter(f.value)}
                >
                    <f.icon />
                    {f.label}
                </motion.div>
            )
            )}
        </div>
    );
}

