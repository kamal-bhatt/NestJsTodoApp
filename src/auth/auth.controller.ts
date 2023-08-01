import { Controller, Post, Get, Body, UseGuards,Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto'
import { RefreshTokenJwtGuard } from './guard';
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signin')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto)
    }

    @Post('signup')
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto)
    }

    @UseGuards(RefreshTokenJwtGuard)
    @Get('refresh')
    refreshToken(@Req() req:Request) {
        console.log(req.get('authorization'))
        return this.authService.refreshToken(req.user['email'],req.get('authorization').replace('Bearer','').trim())
    }
}