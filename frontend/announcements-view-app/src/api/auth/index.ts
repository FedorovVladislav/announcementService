import type {ILoginResponce} from "@/types/auth/ILoginResponce.ts"
import type {ILoginRequest} from "@/types/auth/ILoginRequest.ts"
import type {AxiosPromise} from "axios";
import {AxiosSingleton} from "@/api/AxiosSingleton.ts";
import Endpoints from "@/api/EndPoints.ts";
import type {IRegistrationRequest} from "@/types/auth/IRegistrationRequest.ts";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponce> => AxiosSingleton.post(Endpoints.AUTH.LOGIN, params)
export const registration = (params: IRegistrationRequest): AxiosPromise => AxiosSingleton.post(Endpoints.AUTH.REGISTRATION, params)
export const logout = (): AxiosPromise => AxiosSingleton.get(Endpoints.AUTH.LOGOUT)