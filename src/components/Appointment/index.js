import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import useVisualMode from "hooks/useVisualMode"
import Status from "components/Appointment/Status"
import Form from './Form';



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // props.interviewer = [];
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
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
          />
        )
      }
      {
        mode === SAVING && (
          <Status message={"Saving"} />
        )
      }
    </article>
  )
}