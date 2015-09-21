const paths = {
    src: 'src/**/*.js',
    build: 'build'
  },
  defaultTasks = ['clean', 'concat', 'minify', 'test'],
  buildFile = 'uvcharts.js',
  minifiedBuildFile = 'uvcharts.min.js'

export function* clean() {
  yield this
    .clear(paths.build)
}

export function* test () {
  yield this
    .source("test/*test.js")
    .mocha({ reporter: "landing" })
}

export function* lint() {
  yield this
    .source(paths.src)
    .eslint()
}

export function* concat() {
  yield this
    .source(paths.src)
    .babel({ stage: 0, sourceMap: true })
    .concat(buildFile)
    .target(paths.build)
}

export function* minify() {
  yield this
    .source(`${paths.build}/${buildFile}`)
    .uglify()
    .concat(minifiedBuildFile)
    .target(paths.build)
}

export function* build() {
  yield this
    .notify({
      title: "Fly :: uvCharts-next",
      message: "Finished building artifacts",
      icon: "dev:code_badge"
    })
    .start(defaultTasks)
}

export default function* watch() {
  yield this
    .watch(paths.src, ["build"])
}
