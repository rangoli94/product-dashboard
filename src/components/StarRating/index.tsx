import React from "react";

interface StarRatingProps {
  rating: number;        // e.g. 4.3
  totalStars?: number;   // default: 5
  size?: number;         // star size
  color?: string;        // filled star color
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  color = "#f5c518"
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const starStyle = {
    width: size,
    height: size,
    marginRight: 4,
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} viewBox="0 0 24 24" fill={color} style={starStyle}>
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
          1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 
          9.306l8.332-1.151z" />
        </svg>
      ))}

      {/* Half Star */}
      {halfStar && (
        <svg viewBox="0 0 24 24" style={starStyle}>
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor={color} />
              <stop offset="50%" stopColor="#ccc" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-grad)"
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
            1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 
            9.306l8.332-1.151z"
          />
        </svg>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} viewBox="0 0 24 24" fill="#ccc" style={starStyle}>
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 
          1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 
          9.306l8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
