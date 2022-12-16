export type PartialKeys<T extends object, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
