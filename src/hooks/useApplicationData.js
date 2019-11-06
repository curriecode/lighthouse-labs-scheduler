
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios"

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS";


function reducer(state, action) {
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

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((res) => {
        // console.log(res[2].data);

        dispatch({
          type: SET_APPLICATION_DATA, value: {
            days: res[0].data,
            appointments: res[1].data,
            interviewers: res[2].data
          }
        })
      });
  }, [])


  const setDay = day => dispatch({ type: SET_DAY, value: day })

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("appointment id: ", appointment.id)
    return axios.put("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        console.log("put res", res)
        let appointment = JSON.parse(res.config.data)
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        dispatch({ type: SET_INTERVIEW, value: appointments })
        dispatch({ type: SET_SPOTS, value: -1 })

      })
      .catch((err) => {
        throw err;
      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    interview = null

    return axios.delete("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        dispatch({ type: SET_SPOTS, value: +1 });
        console.log("this is delete", res)

      })
      .catch((err) => {
        console.log("here")
        throw err;
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}
