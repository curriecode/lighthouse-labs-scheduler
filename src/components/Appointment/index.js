import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Status from "components/Appointment/Status"
import Form from './Form';
import Confirm from "./Confirm"
import Error from "./Error"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  function save(name, interviewer) {
    //determines if creating or editing so spots remaining is updated correctly
    let creating = mode === CREATE ? true : false

    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview, creating)
      //when interview is sucessfully booked transitions to show component to show the booked interview
      .then(() => transition(SHOW))
      .catch((err) => {
        transition(ERROR_SAVE, true)
      });
  }

  function cancel(name, interviewer) {
    transition(DELETING, true)
    const interview = {
      student: name,
      interviewer
    };
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  //calls transition function to find current state and transition components
  return (
    <article
      className="appointment"
      data-testid="appointment"
    >
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {
        mode === ERROR_SAVE && <Error onClose={() => transition(EMPTY)} />
      }

      {
        mode === ERROR_DELETE && <Error onClose={() => transition(EMPTY)} />
      }

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
            onEdit={() => transition(EDIT)}

          />)}
      {
        mode === EDIT && (
          <Form onCancel={() => back()}
            interviewers={props.interviewers}
            interview={props.interview}
            onSave={save}
          />)}

      {
        mode === SAVING && (
          <Status message={"Saving"}
          />)}
      {
        mode === DELETING && (
          <Status message={"Deleting"}
          />)}

      {
        mode === CONFIRM && (
          <Confirm
            message={"Are you sure you want to delete this appointment?"}
            onCancel={() => back()}
            onConfirm={cancel}
          />)}
    </article>
  );
}

