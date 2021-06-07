export class Data<CollectionResponse>{
    data:CollectionResponse;
    codigo:number;
    mensaje:string;
}

export class CollectionResponse<T> {
    data: T[] = [];
    lastPage:number;
    page: number;
    perPage:number;
    total: number;
    
    constructor() {
    }
}
