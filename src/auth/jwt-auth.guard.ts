import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){                  //is a built in passport guard that verifies jwt tokens
    canActivate(context: ExecutionContext) {                         //ExecutionContext gives access to request data
        return super.canActivate(context)
    }
    
    handleRequest(err: any, user:any, infor:any ) {
        if(err || !user){
            throw err || new UnauthorizedException()
        }
        return user
    } 
}

// this JwtAuthGuard is a custom JWT Auth Guard used to protect routes 

// canActive is a method from Nestjs Guard System. it is the part of the lifecycle that determines whether or 
//not a request is allowed to proceed to the route handler(controller)

// ExecutionContext is a wrapper arround the current lifecycle in nestjs. it gives you an access to everything happening in the current HTTP call, such as
// the request object(req), the response object(res), etc
// when a request comes to the nest js app, nest js wrapp it inside an ExecutionContext object and ExecutionContext is passed to the to the guards, interceptors, and other hooks

// super.canActivate(context) extracts the jwt token from the request header


//handleRequest is a built in passport method that gets called after the token is verified. like was the token valid? was the user found? should the request continue or blocked?

