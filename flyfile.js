const files = {

}

const paths = {
  src: 'src/**/*.js',
  build: 'build' 
}

export function* clean() {
  yield this
    .clear(paths.build)
}

export function* concat() {
  yield this
    .source(paths.src)
    .babel({ stage: 0, sourceMap: true })
    .concat('uvcharts.js')
    .target(paths.build)
}

export function* minify() {
  yield this
    .source(`${paths.build}/uvcharts.js`)
    .uglify()
    .concat('uvcharts.min.js')
    .target(paths.build)
}

export default function* build() {
  yield this
    .start(['clean', 'concat', 'minify'])
}