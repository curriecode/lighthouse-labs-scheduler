
import { useEffect, useReducer } from "react";
import axios from "axios"
import reducer from "reducers/application";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    //gets data from all apis, called on render
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((res) => {

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

  function bookInterview(id, interview, creating) {
    //creates interview object for new interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        //returns interview object when request is done and info has updated for creating or editing
        let appointment = JSON.parse(res.config.data)
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        //sutype is set to determine if interview is created or edited to update spots remaing accordingly
        let subType = creating ? "booking" : "editing"
        dispatch({ type: SET_INTERVIEW, value: { appointments: appointments, subType: subType } })
      })
      .catch((err) => {
        throw err;
      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, value: { appointments: appointments, subType: "cancelled" } });
      })
      .catch((err) => {
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
