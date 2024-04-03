import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateAppDTO } from "../../core/apps/create-app.dto";
import { AppsService } from "../../core/apps/apps.service";
import { GenericIDResponse } from "../common/dtos/generic-id-response.dto";
import { FirebaseAuth } from "../auth/decorators/firebase-auth.decorator";
import { User } from "../auth/decorators/user.decorator";
import { AuthUser } from "../auth/guards/firebase-auth.guard";
import { plainToInstance } from "class-transformer";
import { AppProtected } from "../common/dtos/app.dto";
import { EditAppDTO } from "src/core/apps/edit-app.dto";

@Controller('/apps')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class AppsController {

    constructor(
        private readonly appsService : AppsService
    ) {}

    @Get('')
    @FirebaseAuth(true)
    async index(
        @User() user : AuthUser,
    ) {
        const userApps = await this.appsService.getUserApps(user.id);
        return userApps.map(app => plainToInstance(AppProtected, app));
    }

    @Get(':id')
    @FirebaseAuth(true)
    async findById(
        @Param('id') id: string,
        @User() user : AuthUser,
    ) {
        const app = await this.appsService.getUserAppById(user.id, id);
        if (!app) {
            return null;
        }
        return plainToInstance(AppProtected, app);
    }

    @Patch(':id')
    @FirebaseAuth(true)
    async edit(
        @Param('id') id: string,
        @Body() dto: EditAppDTO,
        @User() user : AuthUser,
    ) {
        await this.appsService.editUsersApp(id, user.id, dto);
    }

    @Post('')
    @FirebaseAuth(true)
    async create(
        @Body() dto: CreateAppDTO,
        @User() user : AuthUser,
    ) {
        const id = await this.appsService.createApp(dto, user.id);
        return new GenericIDResponse(id);
    }
}