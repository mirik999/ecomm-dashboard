export type Props = {
  data: any[]
  allCount: number
  exclude?: string[]
  path: string,
  error: boolean,
  unSelect: boolean,
  getPage: (val: number) => void
  getRowCount: (val: number) => void
  getDeepSearch: (val: string) => void
  getIdsAndDisable: (id: string[]) => void
  getIdsAndActivate: (id: string[]) => void
  getIdsAndDelete: (id: string[]) => void
};
