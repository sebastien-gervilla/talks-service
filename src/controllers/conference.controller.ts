// Service
import { FastifyInstance } from "fastify";
import { middlewares } from "@/middlewares";
import { Models, Requests, Responses } from "@/interfaces";
import { entities } from "@/entities";
import { stripTime } from "@/utils/date-utils";
import { FilterQuery } from "@mikro-orm/postgresql";

export const conferenceController = async (
    fastify: FastifyInstance,
) => {
    fastify.get<{
        Querystring: Requests.Conference.Get['query'];
        Reply: Responses.Conference.Get;
    }>('/conferences', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const { query } = request;

        let where: FilterQuery<entities.conference> = {};
        if (query.name)
            where.name = { $like: `%${query.name}%` };
        if (query.date)
            where.date = stripTime(query.date);
        if (query.room)
            where.room = query.room;
        if (query.speakerId)
            where.speaker = query.speakerId;

        const loadedConferences = await request.em.find(entities.conference, where, {
            populate: ['users', 'speaker'],
            fields: ['*', 'users.id'],
        });

        const conferences: Models.Conference.Get[] = [];
        for (const loadedConference of loadedConferences) {
            conferences.push({
                id: loadedConference.id,
                name: loadedConference.name,
                date: loadedConference.date,
                slot: loadedConference.slot,
                room: loadedConference.room,
                speaker: {
                    id: loadedConference.speaker.id,
                    firstName: loadedConference.speaker.firstName,
                    lastName: loadedConference.speaker.lastName,
                    biography: loadedConference.speaker.biography,
                },
                users: loadedConference.users.getItems().map(user => user.id),
            });
        }

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

        if (!body.name || !body.room || !body.slot || !body.speakerId)
            return reply.status(400).send({ type: 'missing-fields' });

        if (!isValidDate(body.date))
            return reply.status(400).send({ type: 'invalid-date' });

        if (!isValidSlot(body.slot))
            return reply.status(400).send({ type: 'invalid-slot' });

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
        conference.date = body.date;
        conference.slot = body.slot;
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
    }>('/conferences/:id', { preHandler: middlewares.authentication }, async (request, reply) => {

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

        if (!body.name || !body.room || !body.slot || !body.speakerId)
            return reply.status(400).send({ type: 'missing-fields' });

        if (!isValidDate(body.date))
            return reply.status(400).send({ type: 'invalid-date' });

        if (!isValidSlot(body.slot))
            return reply.status(400).send({ type: 'invalid-slot' });

        if (!Object.values(Models.Conference.Room).includes(body.room))
            return reply.status(400).send({ type: 'room-not-found' });

        const speaker = await request.em.findOne(entities.speaker, {
            id: body.speakerId,
        });

        if (!speaker)
            return reply.status(400).send({ type: 'speaker-not-found' });

        conference.name = body.name;
        conference.room = body.room;
        conference.date = body.date;
        conference.slot = body.slot;
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

    fastify.patch<{
        Params: {
            id: number;
        };
        Reply: Responses.Conference.Join;
    }>('/conferences/:id/join', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const user = await request.em.findOne(entities.user, {
            id: request.user.id
        });

        if (!user)
            return reply.status(404).send();

        const conference = await request.em.findOne(entities.conference, {
            id: request.params.id,
        }, {
            populate: ['users']
        });

        if (!conference)
            return reply.status(404).send();

        if (conference.users.contains(user))
            return reply.status(400).send({ type: 'already-joined' });

        if (conference.users.length >= ROOM_MAX_USERS)
            return reply.status(400).send({ type: 'room-already-full' });

        conference.users.add(user);

        await request.em.flush();

        return reply.status(204).send();
    });

    fastify.patch<{
        Params: {
            id: number;
        };
        Reply: Responses.Conference.Leave;
    }>('/conferences/:id/leave', { preHandler: middlewares.authentication }, async (request, reply) => {

        if (!request.user)
            return reply.status(401).send();

        const user = await request.em.findOne(entities.user, {
            id: request.user.id
        });

        if (!user)
            return reply.status(404).send();

        const conference = await request.em.findOne(entities.conference, {
            id: request.params.id,
        }, {
            populate: ['users']
        });

        if (!conference)
            return reply.status(404).send();

        if (!conference.users.contains(user))
            return reply.status(400).send({ type: 'not-yet-joined' });

        conference.users.remove(user);

        await request.em.flush();

        return reply.status(204).send();
    });
}

// Slot must be between 1 and 10
const isValidSlot = (slot: number) => slot > 0 && slot <= 10;

const isValidDate = (date: Date) => {
    const copy = new Date(date);

    // Strip times, for timezones
    const inputDate = new Date(copy.getFullYear(), copy.getMonth(), copy.getDate());
    return inputDate >= EVENT_START_DATE && inputDate <= EVENT_END_DATE;
};

const EVENT_START_DATE = new Date(2025, 5, 18); // June 18, 2025
const EVENT_END_DATE = new Date(2025, 5, 20);   // June 20, 2025

const ROOM_MAX_USERS = 25;