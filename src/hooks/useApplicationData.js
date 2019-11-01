
import React, { useState, useEffect } from "react";
import axios from "axios"


export default function useApplicationData() {
  const [state, setState] = useState({
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
        console.log(res[2].data);
        setState(prev =>
          ({
            ...prev,
            days: res[0].data,
            appointments: res[1].data,
            interviewers: res[2].data
          }));
      });
  }, [])

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        let appointment = JSON.parse(res.config.data)
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
        console.log("res", res)
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
    console.log("interview is: ", interview)

    interview = null

    return axios.delete("http://localhost:8001/api/appointments/" + appointment.id, appointment)
      .then((res) => {
        // let appointment = JSON.parse(res.config.data)

        // const appointments = {
        //   ...state.appointments,
        //   [id]: appointment
        // };
        // setState({
        //   ...state,
        //   appointments
        // });
        console.log("res", res)
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
