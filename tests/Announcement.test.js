import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Announcement from '../app/models/announcement.model.js';

describe('Announcement Model', () => {
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

    it('should save an announcement', async () => {
        const announcementData = {
            topic: 'Important Update',
            description: 'Details of the important update'
        };

        const announcement = new Announcement(announcementData);

        try {
            const savedAnnouncement = await announcement.save();
            expect(savedAnnouncement._id).to.exist;
            expect(savedAnnouncement.topic).to.equal(announcementData.topic);
            expect(savedAnnouncement.description).to.equal(announcementData.description);
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save an announcement without a topic', async () => {
        const announcementData = {
            description: 'Details of the important update'
        };

        const announcement = new Announcement(announcementData);

        try {
            await announcement.save();
            expect.fail('Announcement was saved without a topic');
        } catch (err) {
            expect(err.message).to.include('Announcement validation failed');
        }
    });

    it('should not save an announcement without a description', async () => {
        const announcementData = {
            topic: 'Important Update'
        };

        const announcement = new Announcement(announcementData);

        try {
            await announcement.save();
            expect.fail('Announcement was saved without a description');
        } catch (err) {
            expect(err.message).to.include('Announcement validation failed');
        }
    });
});
