import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Admin from '../app/models/admin.model.js';

describe('Admin Model', () => {
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

    it('should save an admin', async () => {
        const adminData = {
            fname: 'John',
            lname: 'Doe',
            contactNo: '1234567890',
            email: 'johndoemail@email.com',
            password: 'password'
        }

        const admin = new Admin(adminData);

        try {
            const savedAdmin = await admin.save();
            expect(savedAdmin._id).to.exist;
            expect(savedAdmin.fname).to.equal(adminData.fname);
            expect(savedAdmin.lname).to.equal(adminData.lname);
            expect(savedAdmin.contactNo).to.equal(adminData.contactNo);
            expect(savedAdmin.email).to.equal(adminData.email);
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save an admin without required fields', async () => {
        const adminData = {
            lname: 'Doe',
            contactNo: '1234567890',
            email: '',
            password: 'password'
        }

        const admin = new Admin(adminData);

        try {
            await admin.save();
            expect.fail('Admin was saved without required fields');
        } catch (err) {
            expect(err.message).to.include('Admin validation failed');
        }
    });
});
