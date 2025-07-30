export interface BaseApiResponse<T=any>{
    statusCode:number,
    message:string,
    data?:T,
    [key:string]:any
}