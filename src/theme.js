import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f9e900',
    },
  },
  typography: {
    useNextVariants: true,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
