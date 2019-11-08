// import React from "react";

export default function reducer(state, action) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const SET_SPOTS = "SET_SPOTS";


  const setSpots = (state, action) => {
    let days = state.days
    let mod;
    if (action.value.subType === "booking") {
      mod = -1
    } else if (action.value.subType === "editing") {
      mod = 0
    } else {
      mod = +1
    }
    let spotsChanged = days.map((day) => {
      if (state.day === day.name) {
        let remainingSpots = day.spots + mod;
        day.spots = remainingSpots
        return { ...day }
      } else {
        return day;
      }
    })
    return { ...state, days: spotsChanged };
  }


  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW:

      const beforeState = { ...state, appointments: action.value.appointments }
      const days = setSpots(beforeState, action)
      return { ...beforeState, ...days }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
// export const SET_DAY = "SET_DAY";
// export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// export const SET_INTERVIEW = "SET_INTERVIEW";