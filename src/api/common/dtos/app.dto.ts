import { Exclude, Expose } from "class-transformer";

@Exclude()
export class App {
    @Expose()
    id: string;

    @Expose()
    displayName: string;
}

@Exclude()
export class AppProtected extends App {
    @Expose()
    apiKey: string

    @Expose()
    createdAt: string

    @Expose()
    updatedAt: string
}