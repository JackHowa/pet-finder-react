export default function breedReducer(state = "", action) {
  if (action.type === "SET_BREED") {
    return action.payload;
  } else if (action.type === "SET_ANIMAL") {
    // one reducer can respond to various action types
    return "";
  } else {
    return state;
  }
}
