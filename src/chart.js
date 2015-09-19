export class Chart {
  constructor(graphdef, config) {
    this.id = new Date().getTime()
    this.graphdef = graphdef
    this.config = config
  }
}