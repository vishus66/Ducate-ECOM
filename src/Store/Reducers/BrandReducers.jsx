import { ADD_BRAND_RED, DELETE_BRAND_RED, GET_BRAND_RED, UPDATE_BRAND_RED } from "../Constants"
export default function BrandReducers(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_BRAND_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState

        case GET_BRAND_RED:
            return action.payload.reverse()

        case UPDATE_BRAND_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            return state

        case DELETE_BRAND_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}