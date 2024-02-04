import { createMuiTheme } from '@material-ui/core';
import { blueGrey, common, green, grey, red } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    redText: Palette['primary'];
    greenText: Palette['primary'];
  }

  interface PaletteOptions {
    redText: PaletteOptions['primary'];
    greenText: PaletteOptions['primary'];
  }
}

export const darkTheme: Theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 15
      }
    },
    MuiButton: {
      textPrimary: {
        color: common.white
      },
      root: {
        marginRight: 10
      }
    },
    MuiPickersDay: {
      current: {
        color: blueGrey['500'],
      }
    },
    MuiPickersYear: {
      yearSelected: {
        color: blueGrey['500'],
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey['800']
    },
    secondary: {
      main: grey['400']
    },
    redText: {
      main: red['200'],
      contrastText: red['900']
    },
    greenText: {
      main: green['200'],
      contrastText: green['900']
    },
  },
});

export const lightTheme: Theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 15
      }
    },
    MuiButton: {
      textPrimary: {
        color: common.black
      },
      root: {
        marginRight: 10
      }
    },
    MuiPickersDay: {
      current: {
        color: blueGrey['500'],
      }
    },
    MuiPickersYear: {
      yearSelected: {
        color: blueGrey['500'],
      }
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: blueGrey['200']
    },
    secondary: {
      main: grey['800']
    },
    redText: {
      main: red['800'],
      contrastText: red['100']
    },
    greenText: {
      main: green['800'],
      contrastText: green['100']
    },
  },
});
