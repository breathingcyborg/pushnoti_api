import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAppDTO } from "./create-app.dto";
import { AppsRepo } from "./apps.repo";
import { generateRandomString } from "../utils/strings";
import { APP_API_KEY_LENGTH, APP_ID_LENGTH } from "./constants";

@Injectable()
export class AppsService {
    constructor(
        private readonly appsRepo : AppsRepo
    ) {}

    async getUserAppById(userId: string, appId: string) {
        const app = await this.appsRepo.findById(appId);
        if (!app) {
            return null;
        }
        if (app.userId != userId) {
            return null;
        }
        return app;
    }

    async getUserApps(userId: string) {
        return this.appsRepo.findByUserId(userId);
    }

    async createApp(dto: CreateAppDTO, userId: string) {
        const id = await this.generateIdAndKeyAndInsert(dto, userId);
        return id;
    }

    async editUsersApp(appId: string, userId: string, dto: CreateAppDTO) {
        const app = await this.appsRepo.findById(appId);
        if (!app) {
            throw new BadRequestException('app not found');
        }
        if (app.userId != userId) {
            throw new UnauthorizedException();
        }
        await this.appsRepo.update(appId, dto);
    }

    private async generateIdAndKeyAndInsert(dto: CreateAppDTO, userId: string) : Promise<string> {
        const displayName = dto.displayName;
        const id = generateRandomString(APP_ID_LENGTH);
        const apiKey = generateRandomString(APP_API_KEY_LENGTH);
        
        try {
            const appId = await this.appsRepo.insert({
                id,
                displayName,
                apiKey,
                userId,
            });
            return appId;
        } catch (e) {
            if (e.code === '23505') {
                return this.generateIdAndKeyAndInsert(dto, userId);
            }
            throw e;
        }
    }
}