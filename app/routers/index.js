import AnnoucementRouter from './routes/announcement.route.js'
import AdminRouter from './routes/admin.route.js'

function routers(app) {
    app.use('/announcements', AnnoucementRouter)
    app.use('/admins', AdminRouter)
}

export default routers;