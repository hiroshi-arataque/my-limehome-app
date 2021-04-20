import React from "react";
import "./Style.css";
import dateIcon from '../../../assets/date-icon.svg';

const Widget = ({
  checkInDate,
  checkOutDate,
  setShowCalendar,
  setCounter,
  counter,
}) => {

  const addGuests = () => {
    const newCount = counter + 1;
    if (newCount < 16) setCounter(newCount);
  };

  const removeGuests = () => {
    const newCount = counter - 1;
    if (newCount > 0) setCounter(newCount);
  };

  return (
    <div className="widget">
      <div className="booking__date">
        {!checkInDate && !checkOutDate ? (
          <span data-testid="booking__date-placeholder" onClick={() => setShowCalendar(true)}>Check-in/out</span>
        ) : (
          <div onClick={() => setShowCalendar(true)}>
            <span>{checkInDate}</span>
            <span> - </span>
            <span>{checkOutDate}</span>
          </div>
        )}

        <img src={dateIcon} className="booking__date-icon" alt="dateIcon" />
      </div>
      <div className="booking__incrementer--container">
        <div className="booking__incrementer">
          <span id="incrementer-label" className="booking__incrementer-label">
            {counter.toString() + (counter === 1 ? " GUEST" : " GUESTS")}
          </span>
          <span
            data-testid="incrementer-control-minus"
            className={
              "booking__incrementer--control booking__incrementer--control-minus" +
              (counter === 1 ? " booking__incrementer--grey" : "")
            }
            onClick={removeGuests}
          />
          <span data-testid="incrementer-control-plus" className="booking__incrementer--control" onClick={addGuests} />
        </div>
      </div>
    </div>
  );
};

export default Widget;
