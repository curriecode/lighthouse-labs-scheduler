import React from "react";

import { render, queryByAltText, waitForElement, waitForElementToBeRemoved, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import { get } from "http";


describe("Application", () => {

  //promises example
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    let appointments = getAllByTestId(container, "appointment");
    let appointment = appointments[0];
    // console.log("appointment before: ", debug(appointments))
    fireEvent.click(getByAltText(appointment, "Add"));

    appointments = getAllByTestId(container, "appointment");

    appointment = appointments[0];

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    // let appointments2 = getAllByTestId(container, "appointment");

    // console.log("appt after: ", debug(appointments2))


    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // setTimeout(() => {
    // console.log("done set timeout")
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // }, 1000)
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spots remaining")).toBeInTheDocument();
  });
});

