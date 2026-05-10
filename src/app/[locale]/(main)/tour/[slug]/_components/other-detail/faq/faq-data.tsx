import { FaqItem } from "../../../_types"

export const FAQ_DATA: FaqItem[] = [
    {
        id: "preparation",
        title: "Tour preparation",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                <p>
                    Information about preparing for the tour will be listed
                    here.
                </p>
            </div>
        ),
    },
    {
        id: "cancellation",
        title: "Cancellation policy",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                <p>Cancellation terms will be described here.</p>
            </div>
        ),
    },
    {
        id: "guest-requirements",
        title: "Guest requirements",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                <p>Requirements and recommendations for the guest.</p>
            </div>
        ),
    },
    {
        id: "visas",
        title: "Visas",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                <p>Information regarding visas.</p>
            </div>
        ),
    },
    {
        id: "prepayment",
        title: "Do I need to prepay the tour in full?",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                <p>Details about the prepayment process.</p>
            </div>
        ),
    },
    {
        id: "how-to-book",
        title: "How to book",
        content: (
            <div className="text-sm text-muted-foreground leading-relaxed">
                Select the dates and click the{" "}
                <button className="text-lime-600 hover:text-lime-700 font-medium transition-colors cursor-pointer">
                    book
                </button>{" "}
                button. You can quickly and securely pay for the tour with a
                bank card. Tours with instant booking are confirmed
                automatically. In other cases, you reserve a spot in the group
                by making a prepayment, and a travel expert will approve your
                request within 24 hours. If your request is declined, we will
                instantly refund the prepayment. Before booking, you can{" "}
                <button className="text-lime-600 hover:text-lime-700 font-medium transition-colors cursor-pointer">
                    ask the tour author your questions
                </button>
                .
            </div>
        ),
    },
]
