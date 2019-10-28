import React, { Fragment } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {
  const interviews = props.interviewers.map(mentor => {
    return (
      <InterviewerListItem
        key={mentor.id}
        name={mentor.name}
        avatar={mentor.avatar}
        selected={mentor.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(mentor.id)}
      />

    );
  })
  return <Fragment>
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviews}
      </ul>
    </section>
  </Fragment>
}