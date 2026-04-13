import { MyOrdersFilter } from "./filter"

export const ComponentIndex = () => {
    return (
        <div className="flex items-start gap-8">
            <div className="sticky top-24">
                <MyOrdersFilter />
            </div>
            <div className="flex-1 min-w-0 w-full">
                <p>my orders</p>
            </div>
        </div>
    )
}
