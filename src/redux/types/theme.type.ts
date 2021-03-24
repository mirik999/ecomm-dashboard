export type Theme = {
  fontSize: {
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
  colors: {
    color?: string;
    background?: string;
    secondBackground?: string;
    thirdBackground?: string;
    border?: string;
    main?: string;
    success?: string;
    warning?: string;
    error?: string;
  };
};
