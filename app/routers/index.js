import AnnoucementRouter from './routes/announcement.route.js'

function routers(app) {
    app.use('/announcements', AnnoucementRouter)
}

export default routers;