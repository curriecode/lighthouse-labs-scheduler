import React from "react";


export default function reducer(state, action) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      return { ...state, appointments: action.value }
    }
    case SET_SPOTS:
      let days = state.days
      let spotsChanged = days.map((day, index) => {
        if (state.day === day.name) {
          let remainingSpots = day.spots + action.value;
          day.spots = remainingSpots
          return day;
        } else {
          return day;
        }
      })
      return { ...state, days: spotsChanged };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}