import React,{memo, useEffect} from "react";
import './Style.css';
import imagePlaceholder from "../../assets/limehome-placeholder.jpg";



const Card = (props) => {
  const hotelList = props.hotelList;
  const getOrder = (order) => {
    return order.index - order.pos < 0
      ? order.numItems - Math.abs(order.index - order.pos)
      : order.index - order.pos;
  };

  const cardOrder = getOrder({
    index: props.index,
    pos: props.pos,
    numItems: props.numItems,
  });

  const orderStyle = {
    order: cardOrder,
  };

  useEffect(() => {
    if (cardOrder === 0) {
        const list = hotelList.map((hotel, index) => {
            return {
                ...hotel,
                active: (props.index === index && cardOrder === 0) ? true : false,
            }
        });
        props.setMarkers(list);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardOrder]);

  return (
    <div style={orderStyle} className="card" key={props.index}>
      <div className="card__content">
        <img
          className="image"
          src={props.hotelInfo?.photo ? props.hotelInfo.photo : imagePlaceholder}
          alt={props.hotelInfo?.photo ? props.hotelInfo.photo : imagePlaceholder}
        />
        <div className="text text__container">
          <p className="text text__header">{props.hotelInfo?.name}</p>
          <p className="text text__description text__distance">
            {props.hotelInfo?.distanceFromCityCenter &&
              props.hotelInfo?.distanceFromCityCenter +
                " KM from the city Center"}
          </p>
          <p className="text text__rate">{"€" + (90 + props.index)}</p>
          <p className="text text__description">Designs may vary</p>
        </div>
      </div>
      <button
        className="btn card__button"
        onClick={() => {
          props.setShowBookingForm(true);
          props.setHotelInfo(props.hotelInfo);
        }}
      >
        Book
      </button>
    </div>
  );
};

export default memo(Card);