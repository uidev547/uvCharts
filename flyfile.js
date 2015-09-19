export function* build() {
  yield this.clear('build')
  yield this
    .source('src/**/*.js')
    .babel({ stage: 0, sourceMap: true })
    .concat('uvcharts.js')
    .target('build')
    
  yield this
    .source('build/uvcharts.js')
    .uglify()
    .concat('uvcharts.min.js')
    .target('build')
}