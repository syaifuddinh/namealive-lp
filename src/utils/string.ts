export function objectToUrlParams(obj: Record<string, string|number|boolean>): string {
    return Object.entries(obj)
        .map(([key, value]) => 
        encodeURIComponent(key) + '=' + encodeURIComponent(String(value))
        )
        .join('&');
}