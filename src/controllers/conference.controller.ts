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

    fastify.post<{
        Body: Requests.Conference.Post['body'];
        Reply: Responses.Conference.Post;
    }>('/conferences', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { body } = request;

        if (!body.name || !body.room || !body.startsOn || !body.endsOn || !body.speakerId)
            return reply.status(400).send({ type: 'missing-fields' });

        if (!Object.values(Models.Conference.Room).includes(body.room))
            return reply.status(400).send({ type: 'room-not-found' });

        const speaker = await request.em.findOne(entities.speaker, {
            id: body.speakerId,
        });

        if (!speaker)
            return reply.status(400).send({ type: 'speaker-not-found' });

        const conference = new entities.conference();
        conference.name = body.name;
        conference.room = body.room;
        conference.startsOn = body.startsOn;
        conference.endsOn = body.endsOn;
        conference.speaker = speaker;

        await request.em.persistAndFlush(conference);

        return reply.status(204).send();
    });

    fastify.put<{
        Params: {
            id: number;
        };
        Body: Requests.Conference.Put['body'];
        Reply: Responses.Conference.Put;
    }>('/conferences', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { params, body } = request;

        const conference = await request.em.findOne(entities.conference, {
            id: params.id,
        });

        if (!conference)
            return reply.status(404).send();

        if (!body.name || !body.room || !body.startsOn || !body.endsOn || !body.speakerId)
            return reply.status(400).send({ type: 'missing-fields' });

        if (!Object.values(Models.Conference.Room).includes(body.room))
            return reply.status(400).send({ type: 'room-not-found' });

        const speaker = await request.em.findOne(entities.speaker, {
            id: body.speakerId,
        });

        if (!speaker)
            return reply.status(400).send({ type: 'speaker-not-found' });

        conference.name = body.name;
        conference.room = body.room;
        conference.startsOn = body.startsOn;
        conference.endsOn = body.endsOn;
        conference.speaker = speaker;

        await request.em.flush();

        return reply.status(204).send();
    });

    fastify.delete<{
        Params: {
            id: number;
        };
        Reply: Responses.Conference.Delete;
    }>('/conferences/:id', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        if (request.user.role !== Models.User.Role.Administrator)
            return reply.status(403).send();

        const { params } = request;

        const conference = await request.em.findOne(entities.conference, {
            id: params.id,
        });

        if (!conference)
            return reply.status(404).send();

        await request.em.removeAndFlush(conference);

        return reply.status(204).send();
    });
}