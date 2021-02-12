import Typography from "typography"
import altonTheme from "typography-theme-alton"

altonTheme.baseFontSize = '14px'
altonTheme.headerFontFamily = 'Special Elite, cursive'
altonTheme.bodyFontFamily = 'Special Elite, cursive'
const typography = new Typography(altonTheme)


export const { scale, rhythm, options } = typography
export default typography