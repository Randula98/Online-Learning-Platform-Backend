import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Course from '../app/models/course.model.js';

describe('Course Model', () => {
    let mongoServer;
    let mongoUri;

    before(async () => {
        mongoServer = new MongoMemoryServer();
        await mongoServer.start();
        mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Course.deleteMany({});
    });

    it('should save a course with all required fields', async () => {
        const courseData = {
            courseName: 'Introduction to Programming',
            displayName: 'Intro to Programming',
            moduleCode: 'CS101',
            academicYear: '2023',
            academicSemester: 'Spring',
            specialization: 'Computer Science',
            courseYear: 'First Year',
            courseMonth: 'January'
        };

        const course = new Course(courseData);

        try {
            const savedCourse = await course.save();
            expect(savedCourse._id).to.exist;
            expect(savedCourse.courseName).to.equal(courseData.courseName);
            expect(savedCourse.displayName).to.equal(courseData.displayName);
            expect(savedCourse.moduleCode).to.equal(courseData.moduleCode);
            expect(savedCourse.academicYear).to.equal(courseData.academicYear);
            expect(savedCourse.academicSemester).to.equal(courseData.academicSemester);
            expect(savedCourse.specialization).to.equal(courseData.specialization);
            expect(savedCourse.courseYear).to.equal(courseData.courseYear);
            expect(savedCourse.courseMonth).to.equal(courseData.courseMonth);
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save a course without required fields', async () => {
        const courseData = {
            courseName: 'Introduction to Programming',
            displayName: 'Intro to Programming',
            moduleCode: 'CS101'
        };

        const course = new Course(courseData);

        try {
            await course.save();
            expect.fail('Course was saved without required fields');
        } catch (err) {
            expect(err.message).to.include('Course validation failed');
        }
    });
});
