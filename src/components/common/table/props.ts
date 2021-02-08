export type Props = {
  data: any[]
  allCount: number
  exclude?: string[]
  path: string,
  error: boolean,
  unSelect: boolean,
  hiddenButtons?: string[],
  getPage: (val: number) => void
  getRowCount: (val: number) => void
  getDeepSearch: (val: string) => void
  getIdAndDisable: (id: string[]) => void
  getIdAndActivate: (id: string[]) => void
  getIdsToDelete: (id: string[]) => void
};
