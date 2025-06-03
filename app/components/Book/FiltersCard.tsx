import { motion } from "framer-motion";
import { FilterCardProps } from "../../types/types";

export default function FiltersCard({ children, selectFilter }: FilterCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={box}
            className="cursor-pointer w-full"
            onClick={() => selectFilter()}
        >
            {children}
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#11ffa8",
    borderRadius: 5,
}
