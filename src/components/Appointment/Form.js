import React, { useState } from "react";
import InterviewerList from "../InterviewList";
import Button from "../Button"

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  let defaultInterviewId;
  if (!props.interview || !props.interview.interviewer) {
    defaultInterviewId = null
  } else {
    defaultInterviewId = props.interview.interviewer.id
  }
  const [interviewer, setInterviewer] = useState(defaultInterviewId);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  let placeholderText = "";

  if (props.interview && props.interview.student) {
    placeholderText = props.interview.student
  } else {
    placeholderText = "Enter Student Name"
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  const [error, setError] = useState("");


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={placeholderText}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
            data-testid="student-name-input"
          />

        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}