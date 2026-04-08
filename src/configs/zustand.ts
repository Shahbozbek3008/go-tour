import {
    create as _create,
    type StateCreator,
    type StoreApi,
    type UseBoundStore,
} from "zustand"

const resetters: Array<() => void> = []

export const create = <TState>(
    createState: StateCreator<TState> | StoreApi<TState>,
): UseBoundStore<StoreApi<TState>> => {
    const slice: UseBoundStore<StoreApi<TState>> = _create(createState as never)
    const initialState = slice.getState()
    resetters.push(() => {
        slice.setState(initialState, true)
    })

    return slice
}

export const resetAllSlices = () => {
    for (const resetter of resetters) {
        resetter()
    }
}
