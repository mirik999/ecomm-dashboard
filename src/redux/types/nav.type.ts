export type NavType = {
  id: number
  name: string
  path: string
  accessRoles: string[]
  editableRoles?: string[]
  visible: boolean
  subPaths?: string[]
}
