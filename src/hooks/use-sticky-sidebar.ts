import { useEffect, useRef, useState } from "react"
/**
 * Hook for "Smart Sticky" sidebar behavior.
 * The sidebar scrolls with the page until its bottom reaches the viewport bottom,
 * then it sticks to the bottom. When scrolling up, it sticks to the top.
 *
 * @param marginTop - The offset from the top of the viewport when stuck to the top.
 * @param marginBottom - The offset from the bottom of the viewport when stuck to the bottom.
 */
export const useStickySidebar = (marginTop = 96, marginBottom = 24) => {
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let lastScrollY = window.scrollY
        let currentTop = marginTop

        const updateSticky = () => {
            if (!sidebarRef.current) return

            const scrollY = window.scrollY
            const delta = scrollY - lastScrollY
            const sidebarHeight = sidebarRef.current.offsetHeight
            const viewportHeight = window.innerHeight

            if (sidebarHeight + marginTop + marginBottom <= viewportHeight) {
                currentTop = marginTop
            } else {
                // Sliding logic based on scroll delta
                currentTop -= delta

                // Calculate the boundaries
                const minTop = viewportHeight - sidebarHeight - marginBottom
                const maxTop = marginTop

                // Clamp the value
                if (currentTop < minTop) currentTop = minTop
                if (currentTop > maxTop) currentTop = maxTop
            }

            // Directly update CSS variable for maximum performance and smoothness
            sidebarRef.current.style.setProperty(
                "--sticky-top",
                `${currentTop}px`,
            )
            lastScrollY = scrollY
        }

        window.addEventListener("scroll", updateSticky, { passive: true })
        window.addEventListener("resize", updateSticky)

        // Initial update
        updateSticky()

        // Handle content changes (e.g. accordion expansions)
        const resizeObserver = new ResizeObserver(() => {
            updateSticky()
        })
        if (sidebarRef.current) {
            resizeObserver.observe(sidebarRef.current)
        }

        return () => {
            window.removeEventListener("scroll", updateSticky)
            window.removeEventListener("resize", updateSticky)
            resizeObserver.disconnect()
        }
    }, [marginTop, marginBottom])

    return { sidebarRef }
}
