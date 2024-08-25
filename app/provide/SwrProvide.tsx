import React from "react";
import { SWRConfig } from "swr";
import { defaultValues } from "../swr/config";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <SWRConfig value={defaultValues}>{children}</SWRConfig>;
};