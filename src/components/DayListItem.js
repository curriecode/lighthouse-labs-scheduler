import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  //formats spots remaining in the daylist
  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining'
    } else {
      return `${props.spots} spots remaining`;
    }
  }
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}