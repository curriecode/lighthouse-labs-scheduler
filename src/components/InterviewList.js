import React, { Fragment } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  //shows interviewer selected for appointment
  const interviews = props.interviewers.map(mentor => {
    return (
      <InterviewerListItem
        key={mentor.id}
        name={mentor.name}
        avatar={mentor.avatar}
        selected={mentor.id === props.value}
        setInterviewer={event => props.onChange(mentor.id)}
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

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

