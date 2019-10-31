import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Status from "components/Appointment/Status"
import Form from './Form';
import Confirm from "./Confirm"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  // props.interviewer = [];
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  function cancel(name, interviewer) {
    transition(DELETING)
    const interview = {
      student: name,
      interviewer
    };
    console.log("here cancel")
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY))
  }

  return (
    <article
      className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {
        mode === CREATE && (<Form onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />)}

      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}

          />)}


      {

        mode === SAVING && (
          <Status message={"Saving"}
          />)}

      {
        mode === DELETING && (
          <Status message={"Deleting"}
          />)
      }

      {

        mode === CONFIRM && (
          <Confirm
            onCancel={() => back()}
            onConfirm={cancel}
          />)}

    </article>

  )
}

