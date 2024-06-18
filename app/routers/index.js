import AnnoucementRouter from './routes/announcement.route.js'
import AdminRouter from './routes/admin.route.js'
import StudentRouter from './routes/student.route.js'

function routers(app) {
    app.use('/announcements', AnnoucementRouter)
    app.use('/admins', AdminRouter)
    app.use('/students', StudentRouter)
}

export default routers;