uvCharts-next
==============

The next version of uvCharts, powered by ES2015/2016 and built on d3 v4 series.

### Early Developer Notes
Since this is a development branch for the next version, things might break, change quickly. Here are a few thoughts and notes from the team:

- Staying inline with ES2015/ES2016 roadmap, we are using Fly as our build system instead of Gulp, Grunt, Brunch or Broccoli.
- Fly-babel is being used to transpile the sources to ES5 compatible version.
- Mocha and Chai will be used for testing the library, for now, they aren't setup for this project.
- There is a good chance that we leverage a stripped down version of d3 to remove the dependency on d3 too.
