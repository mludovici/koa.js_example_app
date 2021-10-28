const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-body')

const app = new Koa()
const router = new KoaRouter()
app.use(router.routes()).use(router.allowedMethods())

app.use(json())
app.use(bodyParser())

app.context.user = 'Marc'
const things = ['My family', 'programming', 'music', 'reading', 'cooking']
render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'layout',
	viewExt: 'html',
	cache: false,
	debug: false,
})

//List of things
async function index(ctx) {
	await ctx.render('index', {
		title: 'Things I love:',
		things: things,
	})
}

//List of things
async function showAdd(ctx) {
	await ctx.render('add')
}

//Routes
router.get('/', index)
router.get('/add', showAdd)
router.post('/add', (ctx) => {
	const body = ctx.request.body
	things.push(body.thing)
	ctx.redirect('/')
})
router.get('/test', (ctx) => (ctx.body = `Hello ${ctx.user}`))
router.get('/test2/:name', (ctx) => (ctx.body = `Hello ${ctx.params.name}`))

// Index
// app.use(async (ctx) => (ctx.body = 'Hello world!'))
router.get('/test', (ctx) => (ctx.body = 'Hello Test'))
app.listen(3000, () => console.log('Server started..'))
