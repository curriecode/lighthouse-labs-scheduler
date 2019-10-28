import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining'
    }
    if (props.spots === 1) {
      return '1 spot remaining'
    }
    if (props.spots === 2) {
      return '2 spots remaining'
    }
    if (props.spots === 3) {
      return '3 spots remaining'
    }
    if (props.spots === 4) {
      return '4 spots remaining'
    }
    if (props.spots === 5) {
      return '5 spots remaining'
    }

  }
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}