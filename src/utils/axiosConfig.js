import axios from "axios";
import {baseUrl} from "../datas";

export const axiosRequest = axios.create({
    baseURL:baseUrl
});