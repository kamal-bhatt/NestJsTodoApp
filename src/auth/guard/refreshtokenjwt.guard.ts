import { AuthGuard } from '@nestjs/passport/dist';

export class RefreshTokenJwtGuard extends AuthGuard ('refreshtokenjwt'){
    constructor(){
        super()
    }
}