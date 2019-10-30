
export function getAppointmentsForDay(state, day) {
  let result = [];

  const filteredDays = state.days.filter(dayobj => dayobj.name === day)

  if (filteredDays.length === 0) {
    return result;
  }

  filteredDays[0].appointments.map((id) => {
    if (state.appointments[id]) {
      result.push(state.appointments[id])
    }
  })

  return result
};

export function getInterview(state, interview) {
  if (!state.interviewers || !interview) {
    return null
  }

  return { "interviewer": state.interviewers[interview.interviewer], "student": interview.student } // return the full interviewer object
}

export function getInterviewersForDay(state, day) {

  let result = [];

  const filteredDays = state.days.filter(dayobj => dayobj.name === day)

  if (filteredDays.length === 0) {
    return result;
  }

  filteredDays[0].appointments.map((id) => {
    if (state.appointments[id]) {
      result.push(state.interviewers[id])
    }
  })

  return result
};