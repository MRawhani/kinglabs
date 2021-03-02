module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          {
            provider: "github",
            owner: "mrawhani",
            
          }
        ]
      },
      preload: "src/preload.js",
    }
  }
}