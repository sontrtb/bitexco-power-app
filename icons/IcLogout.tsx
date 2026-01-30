import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IcLogout(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M14.167 5.833l-1.175 1.175 2.15 2.159H6.667v1.666h8.475l-2.15 2.15 1.175 1.184L18.334 10m-15-5.833H10V2.5H3.334c-.917 0-1.667.75-1.667 1.667v11.666c0 .917.75 1.667 1.667 1.667H10v-1.667H3.334V4.167z"
        fill="red"
      />
    </Svg>
  )
}

export default IcLogout
