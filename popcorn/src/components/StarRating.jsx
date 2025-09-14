import Star from "./Star";
import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  maxRating,
  color = "#fcc419",
  size = 48,
  className = "",
  message = [],
  defaultRating,
  onSet,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    color,
  };

  const handleRating = (rating) => {
    setRating(rating + 1);
    onSet(rating + 1);
  };
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            onRate={() => handleRating(i)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
            key={i}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxRating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  message: PropTypes.array,
  className : PropTypes.string,
  onSet : PropTypes.func
};

export default StarRating;
