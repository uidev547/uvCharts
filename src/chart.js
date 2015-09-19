export class Chart {
  constructor(graphdef, config) {
    this.id = new Date().getTime()
    this.graphdef = null
    this.config = null

    this.frame = null
    this.panel = null
    this.chart = null
    this.bg = null

    this.effects = {};
    this.axes = {
      hor: { group: null, scale : null, func: null, axis : null, line : null, label : null },
      ver: { group: null, scale : null, func: null, axis : null, line : null, label : null },
      meta: { min: null, max: null }
    };

    this.labels = null;
    this.categories = null;

    this.graphdef = graphdef;
    this.config = Utils.extend({}, UVDefaults.config, config);
  }

  init() {
    return this.max()
      .min()
      .position(this.config.meta.position)
      .setDimensions()
      .setFrame()
      .setPanel()
      .setBackground()
      .setCaption()
      .setSubCaption()
      .setMetadata()
      .setHorizontalAxis()
      .setVerticalAxis()
      .setEffects()
      .setLegend()
  }

  setDimensions() {
    return this.height(self.config.dimension.height)
      .width(self.config.dimension.width)
      .top(self.config.margin.top)
      .bottom(self.config.margin.bottom)
      .left(self.config.margin.left)
      .right(self.config.margin.right)
  }
}