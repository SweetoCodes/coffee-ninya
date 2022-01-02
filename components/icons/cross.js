export default function Cross(props) {
  return (
    <svg
      className={props.style}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4l8 8m-8 0l8-8-8 8z"
      ></path>
    </svg>
  );
}
