"use client"

import Link from "next/link"
import { route } from "nextjs-routes"
import { Suspense } from "react"

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body suppressHydrationWarning>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

                    *, *::before, *::after {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }

                    .nf-wrapper {
                        position: relative;
                        overflow: hidden;
                        background-color: #f4f6fb;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .nf-content {
                        position: relative;
                        z-index: 10;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        padding: 2rem 1.5rem;
                        max-width: 540px;
                    }

                    .nf-code {
                        font-size: clamp(6rem, 18vw, 12rem);
                        font-weight: 900;
                        line-height: 1;
                        letter-spacing: -0.04em;
                        background: linear-gradient(
                            160deg,
                            rgba(20, 30, 80, 0.95) 0%,
                            rgba(41, 98, 255, 0.75) 50%,
                            rgba(0, 140, 220, 0.6) 100%
                        );
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        user-select: none;
                    }

                    .nf-divider {
                        width: 48px;
                        height: 3px;
                        border-radius: 2px;
                        background: linear-gradient(90deg, #2962FF, #00BCE6);
                        margin: 1.75rem 0;
                        opacity: 0.7;
                    }

                    .nf-title {
                        font-size: clamp(1.25rem, 3.5vw, 1.75rem);
                        font-weight: 600;
                        color: rgba(15, 23, 60, 0.9);
                        letter-spacing: -0.01em;
                        line-height: 1.3;
                    }

                    .nf-desc {
                        font-size: clamp(0.875rem, 2vw, 1rem);
                        color: rgba(15, 23, 60, 0.5);
                        line-height: 1.6;
                        margin-top: 0.75rem;
                        max-width: 380px;
                    }

                    .nf-link {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-top: 2.25rem;
                        padding: 0.75rem 1.75rem;
                        border-radius: 10px;
                        background: #2962FF;
                        color: #fff;
                        font-size: 0.9rem;
                        font-weight: 600;
                        text-decoration: none;
                        letter-spacing: 0.01em;
                        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 0 0 0 rgba(41, 98, 255, 0),
                                    0 2px 8px rgba(41, 98, 255, 0.2);
                    }

                    .nf-link:hover {
                        background: #1c4fd6;
                        transform: translateY(-1px);
                        box-shadow: 0 0 20px rgba(41, 98, 255, 0.12),
                                    0 4px 16px rgba(41, 98, 255, 0.3);
                    }

                    .nf-link:active {
                        transform: translateY(0);
                    }

                    .nf-link svg {
                        transition: transform 0.25s ease;
                    }

                    .nf-link:hover svg {
                        transform: translateX(-2px);
                    }

                    /* Subtle vignette overlay */
                    .nf-vignette {
                        position: absolute;
                        inset: 0;
                        z-index: 5;
                        pointer-events: none;
                        background: radial-gradient(
                            ellipse at center,
                            transparent 40%,
                            rgba(200, 210, 230, 0.4) 100%
                        );
                    }
                `}</style>

                <Suspense>
                    <div className="nf-wrapper">
                        <div className="nf-vignette" />

                        <div className="nf-content">
                            <h1 className="nf-code">404</h1>

                            <div className="nf-divider" />

                            <h2 className="nf-title">Page Not Found</h2>
                            <p className="nf-desc">
                                The page you're looking for doesn't exist or has
                                been moved. Let's get you back on track.
                            </p>

                            <Link
                                className="nf-link"
                                href={route({ pathname: "/" })}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back Home
                            </Link>
                        </div>
                    </div>
                </Suspense>
            </body>
        </html>
    )
}
