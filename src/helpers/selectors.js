
export function getAppointmentsForDay(state, day) {
  let result = [];

  const filteredDays = state.days.filter(dayobj => dayobj.name === day)

  if (filteredDays.length === 0) {
    return result;
  }
  filteredDays[0].appointments.map((item) => {
    if (state.appointments[item]) {
      result.push(state.appointments[item])
    }
  })

  return result

};