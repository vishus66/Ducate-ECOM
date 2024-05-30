import { ADD_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED } from "../Constants"
export default function WishlistReducers(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_WISHLIST_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState

        case GET_WISHLIST_RED:
            return action.payload.reverse()

        case DELETE_WISHLIST_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}