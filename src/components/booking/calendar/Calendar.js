import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";
import "../../../App.css";

const Calendar = ({
  setShowCalendar,
  setStartDate,
  setEndDate,
  setTempStartDate,
  setTempEndDate,
  tempStartDate,
  tempEndDate,
  setCheckInDate,
  setCheckOutDate,
  setTempCheckInDate,
  setTempCheckOutDate,
  tempCheckInDate,
  tempCheckOutDate,
}) => {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const onChange = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
    setTempCheckInDate(getMonthName(start));
    if (end?.toString() !== start?.toString())
      setTempCheckOutDate(getMonthName(end));
    else setTempCheckOutDate("");
  };

  const getMonthName = (date) => {
    if (date) {
      const monthIndex = new Date(date).getMonth();
      const startMonthName = months[monthIndex];
      return startMonthName + " " + new Date(date).getDate().toString();
    } else return "";
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const confirmCalendarDate = () => {
    setCheckInDate(tempCheckInDate);
    setCheckOutDate(tempCheckOutDate);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    closeCalendar();
  };

  return (
    <div className="calendar__container">
      <div className="booking__button-close" onClick={closeCalendar} />
      <div className="calendar__header">Choose Dates</div>
      <div>
        <DatePicker
          onChange={onChange}
          startDate={tempStartDate}
          endDate={tempEndDate}
          minDate={new Date()}
          showDisabledMonthNavigation
          selectsRange
          inline
        />
      </div>
      {tempCheckInDate && (
        <div className="calendar__footer">
          <div className="calendar__selected-dates">
            {tempCheckInDate && (
              <div>
                Check In<span>{tempCheckInDate}</span>
              </div>
            )}
            {tempCheckOutDate && (
              <div>
                Check Out<span>{tempCheckOutDate}</span>
              </div>
            )}
            <button
              disabled={!tempCheckOutDate}
              type="button"
              className="btn calendar__button"
              onClick={confirmCalendarDate}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
