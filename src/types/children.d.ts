import { PropsWithChildren } from "react";

type WithChildren<T = {}> = PropsWithChildren<T>;
type WithoutChildren<T = {}> = T & {
  children?: never;
};
