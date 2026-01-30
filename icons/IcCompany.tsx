import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IcCompany(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M15 12.5h-1.666v1.667H15m0-5h-1.666v1.666H15m1.667 5H10v-1.666h1.667V12.5H10v-1.667h1.667V9.167H10V7.5h6.667M8.334 5.833H6.667V4.167h1.667m0 5H6.667V7.5h1.667m0 5H6.667v-1.667h1.667m0 5H6.667v-1.666h1.667M5 5.833H3.334V4.167H5m0 5H3.334V7.5H5m0 5H3.334v-1.667H5m0 5H3.334v-1.666H5m5-8.334V2.5H1.667v15h16.667V5.833H10z"
        fill="#000"
        opacity={0.8}
      />
    </Svg>
  )
}

export default IcCompany
