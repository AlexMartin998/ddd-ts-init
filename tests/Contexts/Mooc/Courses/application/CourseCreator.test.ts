import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object/Uuid';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';

describe('CourseCreator', () => {
	let repository: CourseRepositoryMock;

	beforeEach(() => {
		repository = new CourseRepositoryMock();
	});

	it('should create a valid course', async () => {
		const creator = new CourseCreator(repository);
		const id = new Uuid('0766c602-d4d4-48b6-9d50-d3253123275e');
		const name = 'name';
		const duration = '5 hours';
		const expectedCourse = new Course({ id, name, duration });

		// Aqui lo Instancia el Caso de uso, q luego es comparado con el mock
		await creator.run({ id: id.value, name, duration });

		// los errores son mas explicitos: Como es el Caso de Uso quien instancia el Course con lo q le pasamos, y al armar el test asi, se compara lo q instancia el caso de uso y el expected error, de esta manera se dan errores mas descriptivos y no un boolean
		repository.assertSaveHaveBeenCalledWith(expectedCourse);
	});
});
