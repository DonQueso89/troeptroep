import Typography from "typography"
import altonTheme from "typography-theme-alton"

altonTheme.baseFontSize = '14px'
const typography = new Typography(altonTheme)


export const { scale, rhythm, options } = typography
export default typography