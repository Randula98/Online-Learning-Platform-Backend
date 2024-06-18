import AnnoucementRouter from './routes/announcement.route.js'
import AdminRouter from './routes/admin.route.js'
import StudentRouter from './routes/student.route.js'
import CourseRouter from './routes/course.route.js'
import NoticeRouter from './routes/notice.route.js'
import ContentRouter from './routes/content.route.js'

function routers(app) {
    app.use('/announcements', AnnoucementRouter)
    app.use('/admins', AdminRouter)
    app.use('/students', StudentRouter)
    app.use('/courses', CourseRouter)
    app.use('/notices', NoticeRouter)
    app.use('/contents', ContentRouter)
}

export default routers;