import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GenericIDResponse {

    @Expose()
    id: string

    constructor(id: string) {
        this.id = id;
    }
}