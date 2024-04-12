import { createContext } from "react";

export type CompositeContextType = any;

export const CompositeContext: CompositeContextType = createContext({globalContent: {}});

export default {};
