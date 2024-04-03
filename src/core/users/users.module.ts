import { Module } from "@nestjs/common";
import { UsersRepo } from "./repos/users.repo";

@Module({
    providers: [ UsersRepo ],
    exports: [ UsersRepo ],
})
export class UsersModule {}