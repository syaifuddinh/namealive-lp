import { APIReq } from "@/types/api";
import { objectToUrlParams } from "./string";

export const clientapi = async <T extends Record<string, string|number|boolean> | BodyInit | null | undefined>(url: string, method: string, data?: T) => {
    let apiUrl: string = url
    const params: APIReq<string> = {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }
    if(method.toLowerCase() === "post" || method.toLowerCase() === "put") 
        params.body = JSON.stringify(data)
    else if(method.toLowerCase() === "get") {
        if(typeof data === "object") {
            apiUrl += objectToUrlParams((data) as Record<string, string|number|boolean>)
        }
    } 
    
    const response = await fetch(apiUrl, params);

    const fetched = await response.json();
    
    if (!response.ok) {
        throw new Error(fetched ? fetched?.message : fetched);
    }

    return fetched
}

