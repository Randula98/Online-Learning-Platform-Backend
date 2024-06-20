import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Student from '../app/models/student.model.js';
import bcrypt from 'bcrypt';

describe('Student Model', () => {
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
        await Student.deleteMany({});
    });

    it('should save a student with all required fields', async () => {
        const studentData = {
            fname: 'John',
            lname: 'Doe',
            contactNo: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const student = new Student(studentData);

        try {
            const savedStudent = await student.save();
            expect(savedStudent._id).to.exist;
            expect(savedStudent.fname).to.equal(studentData.fname);
            expect(savedStudent.lname).to.equal(studentData.lname);
            expect(savedStudent.contactNo).to.equal(studentData.contactNo);
            expect(savedStudent.email).to.equal(studentData.email);

            const isPasswordValid = await bcrypt.compare(studentData.password, savedStudent.password);
            expect(isPasswordValid).to.be.true;
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save a student without a first name', async () => {
        const studentData = {
            lname: 'Doe',
            contactNo: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const student = new Student(studentData);

        try {
            await student.save();
            expect.fail('Student was saved without a first name');
        } catch (err) {
            expect(err.message).to.include('Student validation failed');
        }
    });

    it('should not save a student without a last name', async () => {
        const studentData = {
            fname: 'John',
            contactNo: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const student = new Student(studentData);

        try {
            await student.save();
            expect.fail('Student was saved without a last name');
        } catch (err) {
            expect(err.message).to.include('Student validation failed');
        }
    });

    it('should not save a student without a contact number', async () => {
        const studentData = {
            fname: 'John',
            lname: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const student = new Student(studentData);

        try {
            await student.save();
            expect.fail('Student was saved without a contact number');
        } catch (err) {
            expect(err.message).to.include('Student validation failed');
        }
    });

    it('should not save a student without an email', async () => {
        const studentData = {
            fname: 'John',
            lname: 'Doe',
            contactNo: '1234567890',
            password: 'password123'
        };

        const student = new Student(studentData);

        try {
            await student.save();
            expect.fail('Student was saved without an email');
        } catch (err) {
            expect(err.message).to.include('Student validation failed');
        }
    });

    it('should not save a student without a password', async () => {
        const studentData = {
            fname: 'John',
            lname: 'Doe',
            contactNo: '1234567890',
            email: 'john.doe@example.com'
        };

        const student = new Student(studentData);

        try {
            await student.save();
            expect.fail('Student was saved without a password');
        } catch (err) {
            expect(err.message).to.include('Student validation failed');
        }
    });

    it('should not save a student with a duplicate email', async () => {
        const studentData = {
            fname: 'John',
            lname: 'Doe',
            contactNo: '1234567890',
            email: 'john.doe@example.com',
            password: 'password123'
        };

        const student1 = new Student(studentData);

        try {
            await student1.save();
        } catch (err) {
            expect.fail('First student save failed');
        }

        const student2 = new Student(studentData);

        try {
            await student2.save();
            expect.fail('Student with duplicate email was saved');
        } catch (err) {
            expect(err.message).to.include('duplicate key error');
        }
    });
});
