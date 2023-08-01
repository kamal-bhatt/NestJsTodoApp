import { AuthGuard } from '@nestjs/passport/dist';

export class AccessTokenJwtGuard extends AuthGuard ('accesstokenjwt'){
    constructor(){
        super()
    }
}