export class Serializer{
    static parseJSON<T>(jsonString:string,fallBack:T){
        try {
            return JSON.parse(jsonString) as T
        } catch (error) {
            return fallBack
        }
    }
}