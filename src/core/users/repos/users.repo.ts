import { Inject, Injectable } from "@nestjs/common";
import { DrizzleType } from "../../drizzle/drizzle.type";
import { DB } from "../../drizzle/constants";
import { eq } from "drizzle-orm";
import { NewUser, User, users } from "../../schema";

@Injectable()
export class UsersRepo {

    constructor(
        @Inject(DB)
        private db : DrizzleType
    ) {}

    async findById(id: string) {
        return this.db.query.users.findFirst({
            where: eq(users.id, id)
        });
    }

    async findByNotimail(notimail: string) {
        return this.db.query.users.findFirst({
            where: eq(users.notimail, notimail)
        });
    }

    async create(record: NewUser) {
        const [ newRecord ] = await this
            .db
            .insert(users)
            .values(record)
            .returning({ id: users.id });
        return newRecord.id;
    }

    async update(id: string, record: Partial<User>) {
        await this.db
            .update(users)
            .set(record)
            .where(eq(users.id, id));
    }
}