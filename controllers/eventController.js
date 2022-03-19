const Event = require('../models/Event');
const slugFunc = require('slug');
const generateId = require('shortid');

class Controller {
    async getEvents(req, res) {
        const events = await Event.find();

        res.json(events);
    }

    async getEvent(req, res) {
        const event = await Event.findOne({ slug: req.params.slug });

        res.json(event);
    }

    async addEvent(req, res) {
        const { name } = req.body;

        const event = new Event({
            ...req.body,
            slug: `${slugFunc(name)}-${generateId()}`,
        });

        Event.create(event, (err, doc) => {
            if (err) throw err;
            else {
                res.json(doc);
            }
        });
    }

    async changeEvent(req, res) {
        const eventId = req.params.id;

        if (candidate) {
            const changedEvent = await Event.findByIdAndUpdate(
                { _id: eventId },
                { ...req.body },
                (err, doc) => {
                    if (err) throw err;
                    else {
                        res.json({ changedEvent, message: 'Event is changed' });
                    }
                },
            );
        }
    }
}

module.exports = new Controller();
