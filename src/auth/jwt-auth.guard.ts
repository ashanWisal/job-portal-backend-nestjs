import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){ //is a built in passport guard that verifies jwt tokens
    canActivate(context: ExecutionContext) { //ExecutionContext gives access to request data
        return super.canActivate(context)
    }

 handleRequest(err: any, user:any, infor:any ) {
    if(err || !user){
        throw err || new UnauthorizedException()
    }
    return user
 } 
}