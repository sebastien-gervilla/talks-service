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

        const speaker = new entities.speaker();
        speaker.firstName = body.firstName;
        speaker.lastName = body.lastName;
        speaker.biography = body.biography;

        return reply.status(204).send();
    });
}