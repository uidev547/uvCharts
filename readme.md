uvCharts-next
==============

The next version of uvCharts, powered by [ES2015/2016](http://www.ecma-international.org/ecma-262/6.0/) and built on d3 [v4 series](https://github.com/d3).

### Setting up the Developer Environment
- Have `node v4.x.x` installed
- Have node packages `flyjs`, `eslint` installed globally
- Checkout this branch `uvCharts-next` after forking the main repository at `Imaginea/uvCharts`
- Execute `npm install` to install node dependencies
- Checkout tasks available `fly -l`. Running the default task using the command `fly` will watch source directory and build artifacts in `build/` directory.

### Early Developer Notes
Since this is a development branch for the next version, things might break, change quickly. Here are a few thoughts and notes from the team:

- Staying inline with ES2015/ES2016 roadmap, we are using Fly as our build system instead of Gulp, Grunt, Brunch or Broccoli.
- Fly-babel is being used to transpile the sources to ES5 compatible version.
- Mocha and Chai will be used for testing the library, for now, they aren't setup for this project.
- There is a good chance that we leverage a stripped down version of d3 to remove the dependency on d3 too.

### Design Goals
- Composability
- Animations/Transitions
- Interactivity
- Robustness
- Ease of use

### Development Environment
- We support Node 4+ environments for development purpose.

### Styleguide
- eslintrc and editorconfig are checked in to this branch and are configured. So please adhere to them before committing code.
