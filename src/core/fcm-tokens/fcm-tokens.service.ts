import { Injectable } from "@nestjs/common";
import { FCMTokensRepo } from "./fcm-tokens.repo";
import { UpdateFCMTokenDto } from "./update-fcm-token.dto";

@Injectable()
export class FCMTokensService {
    constructor(
        private readonly tokensRepo : FCMTokensRepo
    ) {}
    
    async createOrUpdate(dto: UpdateFCMTokenDto, userId: string) {
        const token = dto.token;

        const dbToken = await this.tokensRepo.findByToken(token);
        if (!dbToken) {
            await this.tokensRepo.create({
                token,
                userId,
            });
            return;
        }

        await this.tokensRepo.update(token, {
            userId,
            updatedAt: new Date(),
        });
        return; 
    }

    async findFreshTokens(userId: string) {
        return this.tokensRepo.findByUserId(userId);
    }
}