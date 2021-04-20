import React, {useReducer} from "react";
import { useSwipeable } from "react-swipeable";
import "./Style.css";
import Card from "../card/Card.js";

const initialState = { pos: 0, sliding: "false", dir: "stopSliding" };

const Slider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numItems = props.hotelList.length;
  const hotelList = props.hotelList;
  const slide = (dir) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 5);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide("next"),
    onSwipedRight: () => slide("prev"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const dynamicStyle = () => {
    return state.sliding === "true"
      ? state.dir === "next"
        ? { transform: "translateX(100%)" }
        : { transform: "translateX(-100%)" }
      : { transition: "transform 100ms" };
  };

  return (
    <div {...handlers}>
      <div className="wrapper">
        <div
          dir={state.dir}
          sliding={state.sliding}
          style={dynamicStyle()}
          className={"slider__container "}
        >
          {hotelList.map((child, index) => (
            <Card
              key={index}
              index={index}
              pos={state.pos}
              numItems={numItems}
              hotelInfo={child}
              setShowBookingForm={props.setShowBookingForm}
              setHotelInfo={props.setHotelInfo}
              hotelList={hotelList}
              setMarkers={props.setMarkers}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

function reducer(state, { type, numItems }) {
  switch (type) {
    case "reset":
      return initialState;
    case "prev":
      return {
        ...state,
        dir: "prev",
        sliding: "true",
        pos: state.pos === 0 ? numItems - 1 : state.pos - 1
      };
    case "next":
      return {
        ...state,
        dir: "next",
        sliding: "true",
        pos: state.pos === numItems - 1 ? 0 : state.pos + 1
      };
    case "stopSliding":
      return { ...state, sliding: "false" };
    default:
      return state;
  }
}

export default Slider;
