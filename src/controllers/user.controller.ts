// Librairies
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Service
import { FastifyInstance } from "fastify";
import { middlewares } from "@/middlewares";
import { Models, Requests, Responses } from "@/interfaces";
import { entities } from "@/entities";
import { environment } from '@/configuration/environment';

export const userController = async (
    fastify: FastifyInstance,
) => {
    fastify.get<{
        Reply: Responses.User.GetCurrent;
    }>('/users/current', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const user = await request.em.findOne(entities.user, {
            id: request.user.id,
        });

        if (!user)
            return reply.status(401).send();

        return reply.status(200).send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    });

    fastify.post<{
        Body: Requests.User.Register['body'];
        Reply: Responses.User.Register;
    }>('/users/register', async (request, reply) => {

        const { body } = request;

        if (!body.firstName || !body.lastName || !body.email || !body.password)
            return reply.status(400).send({ type: 'missing-fields' });

        if (!isEmailValid(body.email))
            return reply.status(400).send({ type: 'invalid-email' });

        const existingUser = await request.em.findOne(entities.user, {
            email: body.email,
        });

        if (existingUser)
            return reply.status(400).send({ type: 'email-already-used' });

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = new entities.user();
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.email = body.email;
        user.password = hashedPassword;
        user.role = Models.User.Role.Member;

        await request.em.persistAndFlush(user);

        return reply.status(204).send();
    });

    fastify.post<{
        Body: Requests.User.Login['body'];
        Reply: Responses.User.Login;
    }>('/users/login', async (request, reply) => {

        const { body } = request;

        if (!body.email || !body.password)
            return reply.status(400).send({ type: 'missing-fields' });

        const user = await request.em.findOne(entities.user, {
            email: body.email,
        });

        if (!user)
            return reply.status(400).send({ type: 'invalid-identifiers' });

        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
        if (!isPasswordCorrect)
            return reply.status(404).send({ type: 'invalid-identifiers' });

        const jwtPayload: Models.User.JWTPayload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(
            jwtPayload,
            environment.jwtSecret,
        );

        return reply
            .setCookie('token', token)
            .status(204)
            .send();
    });
}

const isEmailValid = (email: string): boolean => {
    if (!email)
        return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}