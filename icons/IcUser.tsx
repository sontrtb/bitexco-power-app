import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IcUser(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.556 4.444a4.444 4.444 0 118.888 0 4.444 4.444 0 01-8.888 0zm0 6.667A5.555 5.555 0 000 16.667 3.333 3.333 0 003.333 20h13.334A3.333 3.333 0 0020 16.667a5.555 5.555 0 00-5.556-5.556H5.556z"
        fill="#fff"
      />
    </Svg>
  )
}

export default IcUser
