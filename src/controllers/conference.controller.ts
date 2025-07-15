// Service
import { FastifyInstance } from "fastify";
import { middlewares } from "@/middlewares";
import { Models, Requests, Responses } from "@/interfaces";
import { entities } from "@/entities";

export const conferenceController = async (
    fastify: FastifyInstance,
) => {
    fastify.get<{
        Reply: Responses.Conference.Get;
    }>('/conferences', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const conferences = await request.em.findAll(entities.conference);

        return reply.status(200).send(conferences);
    });
}