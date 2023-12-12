/* eslint-disable react/prop-types */
import "./progressCircle.css";

const Circle = ({ percentage, strokeWidth, size, color }) => {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export default function ProgressCircle({
  percentage,
  isPlaying,
  size,
  color,
  imagen,
}) {
  return (
    <div className="progress-circle flex">
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={"0.4rem"} size={size} color="#3b4f73" />
          <Circle
            strokeWidth={"0.6rem"}
            size={size}
            color={color}
            percentage={percentage}
          />
        </g>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#fff"></circle>
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#fff"></circle>
          </clipPath>
        </defs>
        <image
          className={isPlaying ? "active" : ""}
          x={30}
          y={30}
          width={2 * (size / 2 - 30)}
          height={2 * (size / 2 - 30)}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
          clipPath={"url(#myCircle)"}
        />
        <image
          className={isPlaying ? "active" : ""}
          x={100}
          y={100}
          width={2 * (size / 2 - 100)}
          height={2 * (size / 2 - 100)}
          href={imagen}
          clipPath={"url(#myInnerCircle)"}
        />
      </svg>
    </div>
  );
}
