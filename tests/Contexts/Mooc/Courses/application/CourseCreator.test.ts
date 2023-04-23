import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/value-object/CourseDuration';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/value-object/CourseName';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/value-object/CourseNameLengthExceeded';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';

describe('CourseCreator', () => {
	let repository: CourseRepositoryMock;
	let creator: CourseCreator;

	beforeEach(() => {
		repository = new CourseRepositoryMock();
		creator = new CourseCreator(repository);
	});

	it('should create a valid course', async () => {
		const request = CreateCourseRequestMother.random();

		const course = CourseMother.fromRequest(request);

		await creator.run(request);

		repository.assertSaveHaveBeenCalledWith(course);
	});

	it('should throw error if course name length is exceeded', () => {
		const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
		const name = 'some-name'.repeat(30);
		const duration = 'some-duration';

		expect(() => {
			const course = new Course({
				id: new CourseId(id),
				name: new CourseName(name),
				duration: new CourseDuration(duration)
			});

			creator.run({ id, name, duration });

			repository.assertSaveHaveBeenCalledWith(course);
		}).toThrow(CourseNameLengthExceeded);
	});
});
