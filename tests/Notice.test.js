import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Notice from '../app/models/notice.model.js';

describe('Notice Model', () => {
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

    it('should save a notice with all required fields', async () => {
        const noticeData = {
            topic: 'Maintenance Notice',
            description: 'The system will be down for maintenance on Saturday.'
        };

        const notice = new Notice(noticeData);

        try {
            const savedNotice = await notice.save();
            expect(savedNotice._id).to.exist;
            expect(savedNotice.topic).to.equal(noticeData.topic);
            expect(savedNotice.description).to.equal(noticeData.description);
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save a notice without a topic', async () => {
        const noticeData = {
            description: 'The system will be down for maintenance on Saturday.'
        };

        const notice = new Notice(noticeData);

        try {
            await notice.save();
            expect.fail('Notice was saved without a topic');
        } catch (err) {
            expect(err.message).to.include('Notice validation failed');
        }
    });

    it('should not save a notice without a description', async () => {
        const noticeData = {
            topic: 'Maintenance Notice'
        };

        const notice = new Notice(noticeData);

        try {
            await notice.save();
            expect.fail('Notice was saved without a description');
        } catch (err) {
            expect(err.message).to.include('Notice validation failed');
        }
    });
});
