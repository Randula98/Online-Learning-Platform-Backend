import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Content from '../app/models/content.model.js';

describe('Content Model', () => {
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

    it('should save content with required fields', async () => {
        const contentData = {
            week: 'Week 1',
            topic: 'Introduction to Testing',
            fileUrl: 'http://example.com/file.pdf',
            recordingUrl: 'http://example.com/recording.mp4'
        };

        const content = new Content(contentData);

        try {
            const savedContent = await content.save();
            expect(savedContent._id).to.exist;
            expect(savedContent.week).to.equal(contentData.week);
            expect(savedContent.topic).to.equal(contentData.topic);
            expect(savedContent.fileUrl).to.equal(contentData.fileUrl);
            expect(savedContent.recordingUrl).to.equal(contentData.recordingUrl);
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should save content without optional fields', async () => {
        const contentData = {
            week: 'Week 2',
            topic: 'Advanced Testing Techniques'
        };

        const content = new Content(contentData);

        try {
            const savedContent = await content.save();
            expect(savedContent._id).to.exist;
            expect(savedContent.week).to.equal(contentData.week);
            expect(savedContent.topic).to.equal(contentData.topic);
            expect(savedContent.fileUrl).to.be.undefined;
            expect(savedContent.recordingUrl).to.be.undefined;
        } catch (err) {
            expect.fail(err);
        }
    });

    it('should not save content without a week', async () => {
        const contentData = {
            topic: 'Advanced Testing Techniques',
            fileUrl: 'http://example.com/file.pdf',
            recordingUrl: 'http://example.com/recording.mp4'
        };

        const content = new Content(contentData);

        try {
            await content.save();
            expect.fail('Content was saved without a week');
        } catch (err) {
            expect(err.message).to.include('Content validation failed');
        }
    });

    it('should not save content without a topic', async () => {
        const contentData = {
            week: 'Week 3',
            fileUrl: 'http://example.com/file.pdf',
            recordingUrl: 'http://example.com/recording.mp4'
        };

        const content = new Content(contentData);

        try {
            await content.save();
            expect.fail('Content was saved without a topic');
        } catch (err) {
            expect(err.message).to.include('Content validation failed');
        }
    });
});
