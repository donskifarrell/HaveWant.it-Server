module.exports = (server, express, sessionStore, envConf) ->
  config = this
  
  # Setup Asset Management
  eco = require("eco")
  path = require('path')
  connectAssets = require("connect-assets")(
    jsCompilers:
      eco:
        match: /\.eco$/
        compileSync: (sourcePath, source) ->
          fileName = path.basename sourcePath, '.eco'
          directoryName = (path.dirname sourcePath).replace "#{__dirname}/assets/templates", ""
          jstPath = fileName
          """
          (function() {
            this.JST || (this.JST = {});
            this.JST['#{jstPath}'] = #{eco.precompile source}
          }).call(this);
          """
  )

  assetManager = require("connect-assetmanager")
  assetHandler = require("connect-assetmanager-handlers")
  
  # Middleware Config
  server.configure ->
    server.set "views", __dirname + "./../src/views"
    server.set "view engine", "jade"
    server.use express.bodyParser()
    server.use express.cookieParser()
    server.use express.session(
      store: sessionStore
      cookie:
        maxAge: 120000

      secret: envConf.sessionSecret
    )
    server.use connectAssets
    server.use express.static(__dirname + "./../public",
      maxAge: 86400000
    )
    server.use server.router
    server.use express.logger(format: ":response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer")
    server.use (req, res, next) ->
      
      #res.locals.assetsCacheHashes = assetsMiddleware.cacheHashes;
      next()

    server.use (req, res, next) ->
      res.locals.session = req.session
      next()

    # Maybe should go in routes as it redirects.
    server.use (err, req, res, next) ->
      console.log err
      if err instanceof Error
        res.render "errors/404.jade"
      else
        res.render "errors/500.jade"

  # Error Logging Config
  server.configure "development", ->
    server.use express.errorHandler(
      dumpExceptions: true
      showStack: true
    )
    server.all "/robots.txt", (req, res) ->
      res.send "User-agent: *\nDisallow: /",
        "Content-Type": "text/plain"
    # Should be coming from config
    server.mongoose.connect "mongodb://localhost:27017/havewant"

  server.configure "production", ->
    server.use express.errorHandler()
    server.all "/robots.txt", (req, res) ->
      res.send "User-agent: *",
        "Content-Type": "text/plain"
    server.mongoose.connect "mongodb://junk/"

  config