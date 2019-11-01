import React, { useState, useEffect } from "react";
import { Fragment } from "react"
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"
import Appointment from "components/Appointment"
// import InterviewerList from "components/InterviewList"



export default function Application(props) {
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
        console.log("err", err)
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
        console.log("err", err)
      })
  }

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

  const apptList = getAppointmentsForDay(state, state.day).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apptList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
