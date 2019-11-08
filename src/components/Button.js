import React from "react";
import classNames from 'classnames/bind';
import "components/Button.scss";

export default function Button(props) {
   //changes button based on class selected/props
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}>
         {props.children}
      </button>
   );
}

