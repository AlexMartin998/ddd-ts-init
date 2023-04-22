import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';
import { Controller } from './Controller';

type CoursePutRequest = Request & {
	body: {
		id: string;
		name: string;
		duration: string;
	};
};

interface CoursePutControllerBody {
	id: string;
	name: string;
	duration: string;
}

export class CoursePutController implements Controller {
	constructor(private readonly courseCreator: CourseCreator) {}

	async run(req: CoursePutRequest, res: Response): Promise<void> {
		try {
			const { id, name, duration } = req.body as CoursePutControllerBody;

			await this.courseCreator.run(id, name, duration);

			res.status(httpStatus.CREATED).send();
		} catch (error) {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
		}
	}
}
