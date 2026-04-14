"use client"

import Link from "next/link"
import { route } from "nextjs-routes"
import { Suspense } from "react"

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body suppressHydrationWarning style={{ fontFamily: "sans-serif" }}>
                <Suspense>
                    <div
                        style={{
                            backgroundColor: "black",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: "12.5rem",
                                    margin: 0,
                                }}
                            >
                                404
                            </h1>
                            <h2
                                style={{
                                    fontSize: "3.8rem",
                                    color: "#B7BAC2",
                                    paddingTop: "2.5rem",
                                    margin: 0,
                                }}
                            >
                                Page Not Found
                            </h2>
                            <p style={{ paddingTop: "1.25rem", margin: 0 }}>
                                It seems the page you’re looking for doesn’t
                                exist. Let’s get you back on track
                            </p>
                            <Link
                                style={{
                                    marginTop: "2.5rem",
                                    borderRadius: "8px",
                                    backgroundColor: "#2962FF",
                                    color: "white",
                                    textDecorationLine: "none",
                                    padding: "0.625rem 1.5rem",
                                }}
                                className="no-underline"
                                href={route({ pathname: "/" })}
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                </Suspense>
            </body>
        </html>
    )
}
