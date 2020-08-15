export type PropTypeExtractor<T> = T extends { [P in keyof T]: infer U }
  ? U
  : never;
