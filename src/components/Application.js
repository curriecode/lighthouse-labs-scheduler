import React, { useState, useEffect } from "react";
import { Fragment } from "react"
import axios from "axios"

import "components/Application.scss";
import DayList from "components/DayList"
import getAppointmentsForDay from "helpers/selectors"
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Derp Derpington",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "JimJam",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });






  useEffect(() => {


    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")

    ])
      .then((res) => {
        console.log(res[0].data)
        setState(prev =>
          ({
            ...prev,
            days: res[0].data,
            appointments: res[1].data

          }));
      });

  })

  const apptList = appointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
