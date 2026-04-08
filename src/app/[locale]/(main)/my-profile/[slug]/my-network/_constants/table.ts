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
    { length: 10 },
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

export const LIMIT = [
    {
        value: "10",
        label: "10",
    },
    {
        value: "20",
        label: "20",
    },
    {
        value: "30",
        label: "30",
    },
    {
        value: "40",
        label: "40",
    },
]
