import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames/bind';

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected

  })
  return (
    <li
      className={interviewClass}
      onClick={() => props.setInterviewer(props.name)}>

      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

// InterviewerListItem
// Our InterviewerListItem takes in the following props:

// id: number - the id of the interviewer
// name: string - the name of the interviewer
// avatar: url - a url to an image of the interviewer
// selected: boolean - to determine if an interview is selected or not
// setInterviewer: function - sets the interviewer upon selection