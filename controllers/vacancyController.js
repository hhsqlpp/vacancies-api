const Vacancy = require('../models/Vacancy');
const shortid = require('shortid');
const slugFunc = require('slug');

class Controller {
    async getVacancies(req, res) {
        const vacancies = await Vacancy.find();

        res.json(vacancies);
    }

    async getVacancy(req, res) {
        const vacancy = await Vacancy.findOne({ slug: req.params.slug });

        if (!vacancy) {
            res.status(400).send('Не найдено');
        } else {
            res.status(200).json(vacancy);
        }
    }

    async createVacancy(req, res) {
        const { name, description, companyName, salary, workType, contacts } = req.body;

        const vacancy = new Vacancy({
            slug: `${slugFunc(name, '-')}-${shortid.generate()}`,
            name,
            description,
            companyName,
            salary,
            workType,
            contacts,
        });

        Vacancy.create(vacancy, (err, doc) => {
            if (err) throw err;
            else {
                res.json(doc);
            }
        });
    }

    async deleteVacancy(req, res) {
        const vacancy = await Vacancy.deleteOne({ _id: req.params.id });

        res.json(vacancy);
    }
}

module.exports = new Controller();
