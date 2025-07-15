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
}