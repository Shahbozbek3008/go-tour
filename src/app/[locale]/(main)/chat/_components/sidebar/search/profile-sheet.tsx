"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useToggleStore } from "../../../_store/use-toggle-store"
import ProfileMe from "../profile"

export default function ProfileSheet() {
    const { profileOpen } = useToggleStore()

    return (
        <AnimatePresence>
            {profileOpen && (
                <>
                    <motion.div
                        initial={{ x: -350, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -350, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-0 left-0 z-49 h-full"
                    >
                        <ProfileMe />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
