import {HTTP_METHODS} from "@/constants/ServiceConstants";

export type HttpMethods = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];
