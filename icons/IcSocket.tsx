import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IcSocket(props: SvgProps) {
  return (
    <Svg
      width={12}
      height={18}
      viewBox="0 0 12 18"
      fill="none"
      {...props}
    >
      <Path
        d="M10.01 4L10 1c0-.55-.45-1-1-1S8 .45 8 1v3H4V1c0-.55-.45-1-1-1S2 .45 2 1v3h-.01C.9 4 0 4.9 0 5.99v4.66c0 .53.21 1.04.58 1.41L3.5 15v2c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-2l2.92-2.92c.37-.38.58-.89.58-1.42V5.99C12 4.89 11.11 4 10.01 4z"
        fill="#744C5A"
      />
    </Svg>
  )
}

export default IcSocket
