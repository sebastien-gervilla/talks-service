import { environment } from '@/configuration/environment';
import { Models } from '@/interfaces';
import { preHandlerMetaHookHandler } from 'fastify/types/hooks';
import jwt from 'jsonwebtoken';

export const authentication: preHandlerMetaHookHandler = (request, reply, done) => {
    const token = request.cookies.token;

    if (!token)
        return reply.status(401);

    try {
        request.user = jwt.verify(
            token,
            environment.jwtSecret,
        ) as Models.User.JWTPayload;

        done();
    } catch (error) {
        return reply.status(401);
    }
};