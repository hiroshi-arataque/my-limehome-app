import React, {useState} from "react";
import "./Style.css";
import "../../../App.css";
import imagePlaceholder from '../../../assets/limehome-placeholder.jpg';
import Calendar from '../calendar/Calendar.js';
import Widget from '../widget/Widget.js';

const Form = ({show, setShowBookingForm, hotelInfo, setShowBookingConfirmation}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [tempCheckInDate, setTempCheckInDate] = useState(null);
  const [tempCheckOutDate, setTempCheckOutDate] = useState(null);
  const [counter, setCounter] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);

  const resetFields = () => {
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setCheckInDate(null);
    setCheckOutDate(null);
    setTempCheckInDate(null);
    setTempCheckOutDate(null);
    setCounter(1);
    setShowBookingForm(false);
  };

  const calculateTotalPrice = () => {
    const unitPrice = hotelInfo?.rate;
    const dateDiff = Math.round(
      (new Date(endDate) - new Date(startDate)) /
        1000 /*milisecs */ /
        60 /*seconds */ /
        60 /*minutes */ /
        24
    ); /* hours */
    const totalPrice = unitPrice * dateDiff + (counter > 1 && 10 * counter);
    return totalPrice;
  };

  const confirmBooking = () => {
    setShowBookingConfirmation(true);
    resetFields();
  }

  return (
    <div
      className="container"
      style={show ? { display: "block" } : { display: "none" }}
    >
      <div className="booking__button-close" onClick={resetFields} />
      <div>
        <div className="site-content">
          <h1 className="site-content title">{hotelInfo?.name}</h1>
        </div>
        <img
          className="booking__image"
          src={
            hotelInfo?.photo
              ? hotelInfo?.photo
              : imagePlaceholder
          }
          alt={
            hotelInfo?.photos
              ? hotelInfo?.photo
              : imagePlaceholder
          }
        />
        <div className="site-content body">
          <div className="description__container">
            <p className="description">
              Close to the railway station and within walking distance of city
              centre, it is located in a side street. The old town with the
              city's landmark, the famous Cathedral, is only a 10-minute walk
              away. The nearest bakery, which provides fresh rolls for a good
              breakfast in the morning, is only a one-minute walk away. Shopping
              facilities as well as numerous restaurants and cafés can also be
              found in the immediate vicinity. The main railway station is only
              270m or 3 minutes on foot away.
            </p>
          </div>
          <Widget
            setShowCalendar={setShowCalendar}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCounter={setCounter}
            counter={counter}
          />
          {startDate && endDate && (
            <div className="booking__offers">
              <div className="booking__offers--price">
                Total price €{calculateTotalPrice()}
              </div>
              <div>Includes taxes & charges</div>
            </div>
          )}
          <button
            disabled={!(startDate && endDate)}
            className="btn booking__button"
            onClick={confirmBooking}
          >
            <span>Book Now</span>
          </button>
        </div>
      </div>
      {showCalendar && (
        <Calendar
          setShowCalendar={setShowCalendar}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setTempStartDate={setTempStartDate}
          setTempEndDate={setTempEndDate}
          tempStartDate={tempStartDate}
          tempEndDate={tempEndDate}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          setTempCheckInDate={setTempCheckInDate}
          setTempCheckOutDate={setTempCheckOutDate}
          tempCheckInDate={tempCheckInDate}
          tempCheckOutDate={tempCheckOutDate}
        />
      )}
    </div>
  );
};

export default Form;
