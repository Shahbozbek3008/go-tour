export function url(route: string, params: Record<string, string | number>) {
    const splitted = route.split("/")
    const newRouteArr = splitted.map((str) => {
        if (str.startsWith(":")) {
            const paramKey = str.slice(1)

            if (Object.keys(params).includes(paramKey)) {
                return params[paramKey]
            }
        }

        return str
    })

    return newRouteArr.join("/")
}
