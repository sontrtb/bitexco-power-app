import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

function IcWallet(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <G opacity={0.8}>
        <Path
          d="M5 6.667h3.333"
          stroke="#000"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.333 8.75l-.001-.47c-.03-.418-.388-.75-.838-.778-.028-.002-.062-.002-.132-.002h-2.169C13.705 7.5 12.5 8.62 12.5 10s1.206 2.5 2.692 2.5h2.169c.07 0 .104 0 .133-.002.45-.027.808-.36.838-.777l.001-.471"
          stroke="#000"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M15 10.834a.833.833 0 100-1.667.833.833 0 000 1.667z"
          fill="#000"
        />
        <Path
          d="M10.834 3.333c3.142 0 4.714 0 5.69.977.674.674.883 1.63.947 3.19m-9.137 9.167h2.5c3.142 0 4.714 0 5.69-.977.674-.673.883-1.63.947-3.19m-9.97-9.166c-2.596.008-3.972.09-4.857.976-.977.976-.977 2.548-.977 5.69 0 3.143 0 4.714.977 5.69.544.545 1.273.786 2.356.892"
          stroke="#000"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  )
}

export default IcWallet
