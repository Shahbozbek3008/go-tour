export const CHECK_INFORMATION = [
    {
        id: 1,
        label: "Select your position*",
        value: "Sell Request",
    },
    {
        id: 2,
        label: "Category*",
        value: "Energy & Utilities Oil & Gas Equipment Steel",
    },
    {
        id: 3,
        label: "Product name*",
        value: "316L Stainless Steel Seamless Pipe",
    },
]

export const VISIBILITY_SETTINGS = [
    {
        value: "invite_only",
        label: "Invite only",
    },
    {
        value: "all_users",
        label: "All users",
    },
]

interface Connection {
    name: string
    email: string
    company: string
    position: string
    status: string
    connections: number
    country: string
    selected: boolean
}

export const initialConnections: Connection[] = Array.from(
    { length: 62 },
    (_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        company: i % 2 === 0 ? "Upgrow" : "GrowTech",
        position: "Top Manager",
        status: i % 3 === 0 ? "Premium" : "Basic",
        connections: Math.floor(Math.random() * 1000),
        country: [
            "United States",
            "Brazil",
            "India",
            "Australia",
            "France",
            "China",
        ][Math.floor(Math.random() * 6)],
        selected: false,
    }),
)
