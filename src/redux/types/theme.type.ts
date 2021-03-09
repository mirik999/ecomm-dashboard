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
    white?: string;
    black?: string;
    color?: string;
    secondColor?: string;
    background?: string;
    shadow?: string;
    border?: string;
    main?: string;
    success?: string;
    successLight?: string;
    warning?: string;
    warningLight?: string;
    error?: string;
    errorLight?: string;
  };
};
