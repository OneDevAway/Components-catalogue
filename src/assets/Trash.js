function TrashIcon({size}) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size ? size:"1.5em"}
        height={size ? size:"1.5em"}
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M216 48h-40v-8a24 24 0 00-24-24h-48a24 24 0 00-24 24v8H40a8 8 0 000 16h8v144a16 16 0 0016 16h128a16 16 0 0016-16V64h8a8 8 0 000-16M96 40a8 8 0 018-8h48a8 8 0 018 8v8H96zm96 168H64V64h128zm-80-104v64a8 8 0 01-16 0v-64a8 8 0 0116 0m48 0v64a8 8 0 01-16 0v-64a8 8 0 0116 0"
        ></path>
      </svg>
    );
  }
  
  export default TrashIcon;