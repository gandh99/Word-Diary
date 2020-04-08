import { createMuiTheme } from '@material-ui/core/styles';

const style = getComputedStyle(document.documentElement)

export default createMuiTheme({
    palette: {
        primary: {
            main: style.getPropertyValue('--primary-background-color').trim(),
            dark: style.getPropertyValue('--primary-background-color-dark').trim(),
            light: style.getPropertyValue('--primary-background-color-light').trim()
        },
        text: {
            tertiary: style.getPropertyValue('--tertiary-text-color').trim()
        }
    }
})