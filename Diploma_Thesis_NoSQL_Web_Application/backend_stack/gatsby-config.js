module.exports = {
    developMiddleware: app => {
      app.use(
        "/documents",
        proxy({
          target: "http://localhost:3000",          
        })
      )
    },
  }