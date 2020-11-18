import theme from 'theme'

const MapIcon = ({ category, inactive, onClick, selected = false }) => {
  const width = selected ? "38px" : "30px";
  const height = selected ? "50px" : "40px";
  const filter = selected ? "url(#f1)" : "";
  const { palette } = theme;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <defs>
        <filter id="f1">
          <feDropShadow dx="1" dy="1" stdDeviation="1.25" />
        </filter>
      </defs>
      <g>
        {category === -1 && // pantry and meals
          <>
            <path
              d="M15.0005 39.8626C19.7997 34.5676 28.5612 22.5925 29.925 15.856C30.1351 13.8533 29.9053 11.8299 29.251 9.91747C28.5968 8.00505 27.5324 6.24525 26.1264 4.75134C24.7204 3.2578 23.004 2.06318 21.0877 1.24474C19.1713 0.426302 17.0979 0.0025994 15.0005 0V6.36445V20.6983V39.8626Z"
              fill={inactive ? palette.inactive.main : palette.secondary.main}
              filter={filter}
            />
            <path
              d="M15 39.8626C10.2008 34.5676 1.43929 22.5925 0.0754433 15.856C-0.13426 13.8533 0.0951757 11.8303 0.749435 9.91747C1.4037 8.00505 2.46808 6.24525 3.8741 4.75134C5.28012 3.2578 6.99644 2.06318 8.91279 1.24474C10.8291 0.426302 12.9026 0.0025994 15 0V6.36445V20.6983V39.8626Z"
              fill={inactive ? palette.inactive.main : palette.primary.main}
            />
          </>
        }
        {category === 0 && // pantry
          <path
            d="M0,14.44C0,22.41,15,40,15,40s15-17.59,15-25.56C30,6.46,23.28,0,15,0C6.72,0,0,6.46,0,14.44z"
            fill={inactive ? palette.inactive.main : palette.primary.main}
            filter={filter}
          />
        }
        {category === 1 && // meals
          <path
            d="M15,40c0,0-15-17.59-15-25.56C0,6.46,6.72,0,15,0c8.28,0,15,6.46,15,14.44C30,22.41,15,40,15,40z"
            fill={inactive ? palette.inactive.main : palette.secondary.main}
            filter={filter}
          />
        }
        <circle cx="15" cy="15" r="7" fill={palette.primary.contrast} />
      </g>
    </svg>
  );
};

export default MapIcon;
