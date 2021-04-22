export type FontSize = {
  small: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  medium: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  hd: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  fhd: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
};

export type Theme = {
  fontSize: FontSize;
  name?: string;
  colors: {
    color?: string;
    background?: string;
    secondBackground?: string;
    thirdBackground?: string;
    border?: string;
    lightBorder?: string;
    main?: string;
    success?: string;
    warning?: string;
    error?: string;
  };
};

export type fontSizeEnum = 'small' | 'medium' | 'hd' | 'fhd';
