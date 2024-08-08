import {
  type Components,
  type PaletteColorOptions,
  type PaletteOptions,
  type Theme,
  Zoom,
  createTheme
} from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: 'Encode Sans',
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  allVariants: {
    letterSpacing: 1,
    textTransform: 'none'
  },
  h5: {
    fontWeight: 700
  }
};

declare module '@mui/material' {
  interface PaletteOptions {
    github: PaletteColorOptions;
    google: PaletteColorOptions;
  }
  interface ButtonPropsColorOverrides {
    github: true;
    google: true;
  }
}

const lightPalette: PaletteOptions = {
  mode: 'light',
  github: {
    main: '#333',
    contrastText: '#FFFFFF'
  },
  google: {
    main: '#4285F4',
    contrastText: '#FFFFFF'
  },
  primary: {
    main: '#1D5A49',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#5984AF',
    contrastText: '#FFFFFF'
  },
  background: {
    paper: '#F5F5F5',
    default: '#FFFFFF'
  },
  text: {
    primary: '#000000',
    secondary: '#6A7681'
  },
  success: {
    main: '#188651'
  },
  warning: {
    main: '#F0A314'
  },
  error: {
    main: '#E61919'
  },
  divider: '#0000001F'
};

const components: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: {
      sx: {
        textTransform: 'none',
        borderRadius: 10
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      variant: 'filled',
      fullWidth: true,
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: false,
      margin: 'dense'
    }
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
      sx: {
        cursor: 'pointer',
        fontWeight: 700,
        letterSpacing: 1
      }
    }
  },
  MuiFab: {
    defaultProps: {
      color: 'primary'
    }
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      TransitionComponent: Zoom
    }
  },
  MuiDialogActions: {
    defaultProps: {
      sx: {
        paddingX: 3,
        paddingY: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }
    }
  }
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: typography,
  components: components
});
