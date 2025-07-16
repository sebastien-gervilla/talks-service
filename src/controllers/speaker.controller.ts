// Service
import { FastifyInstance } from "fastify";
import { middlewares } from "@/middlewares";
import { Models, Requests, Responses } from "@/interfaces";
import { entities } from "@/entities";

export const speakerController = async (
    fastify: FastifyInstance,
) => {
    fastify.get<{
        Reply: Responses.Speaker.Get;
    }>('/speakers', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const speakers = await request.em.findAll(entities.speaker);

        return reply.status(200).send(speakers);
    });

    fastify.post<{
        Body: Requests.Speaker.Post['body'];
        Reply: Responses.Speaker.Post;
    }>('/speakers', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { body } = request;

        if (!body.firstName || !body.lastName || !body.biography)
            return reply.status(400).send({ type: 'missing-fields' });

        const speaker = new entities.speaker();
        speaker.firstName = body.firstName;
        speaker.lastName = body.lastName;
        speaker.biography = body.biography;

        await request.em.persistAndFlush(speaker);

        return reply.status(204).send();
    });

    fastify.put<{
        Params: {
            id: number;
        };
        Body: Requests.Speaker.Put['body'];
        Reply: Responses.Speaker.Put;
    }>('/speakers/:id', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { params, body } = request;

        const speaker = await request.em.findOne(entities.speaker, {
            id: params.id,
        });

        if (!speaker)
            return reply.status(404).send();

        if (!body.firstName || !body.lastName || !body.biography)
            return reply.status(400).send({ type: 'missing-fields' });

        speaker.firstName = body.firstName;
        speaker.lastName = body.lastName;
        speaker.biography = body.biography;

        await request.em.flush();

        return reply.status(204).send();
    });

    fastify.delete<{
        Params: {
            id: number;
        };
        Reply: Responses.Speaker.Delete;
    }>('/speakers/:id', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { params } = request;

        const speaker = await request.em.findOne(entities.speaker, {
            id: params.id,
        });

        if (!speaker)
            return reply.status(404).send();

        await request.em.removeAndFlush(speaker);

        return reply.status(204).send();
    });
}