export type Props = {
  data: any[];
  allCount: number;
  exclude?: string[];
  path: string;
  error: boolean;
  unSelect: boolean;
  getPage: (val: number) => void;
  getRowCount: (val: number) => void;
  getDeepSearch: (val: string) => void;
  getIdsAndDisable: (id: string[]) => void;
  getIdsAndActivate: (id: string[]) => void;
  getIdsAndDelete: (id: string[]) => void;
  getDateRange: (range: { [key: string]: Date }) => void;
};

export type PropsForView = {
  data: any[];
  allCount: number;
  height?: number;
  exclude?: string[];
};

export const options = [
  { value: 1, label: '1' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
];
