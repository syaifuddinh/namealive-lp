import { APIReq } from "@/types/api";
import { objectToUrlParams } from "./string";

export const protectedapi = async <T extends Record<string, string|number|boolean> | BodyInit | null | undefined>(url: string, method: string, data?: T) => {
    let apiUrl: string = url
    const headers = await import('next/headers')
    const cookies = headers.cookies
    const stored = await cookies();
    const token = String(stored.get("token")?.value)
    const params: APIReq<string> = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({})
    }
    if(method.toLowerCase() === "post" || method.toLowerCase() === "put") 
        params.body = JSON.stringify(data)
    else if(method.toLowerCase() === "get") {
        if(typeof data === "object") {
            apiUrl += objectToUrlParams((data) as Record<string, string|number|boolean> )
        }
    } 
        
    const response = await fetch(apiUrl, params);

    const fetched = await response.json();
    
    if (!response.ok) {
        throw new Error(fetched ? fetched?.message : fetched);
    }

    return fetched
}

