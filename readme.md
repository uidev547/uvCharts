uvCharts-next
==============

The next version of uvCharts, powered by [ES2015/2016](http://www.ecma-international.org/ecma-262/6.0/) and built on d3 [v4 series](https://github.com/d3).

### Design Goals
- Composability
- Animations/Transitions
- Interactivity
- Robustness
- Ease of use

### Early Developer Notes
Since this is a development branch for the next version, things might break, change quickly. Here are a few thoughts and notes from the team:

- Staying inline with ES2015/ES2016 roadmap, we are using Fly as our build system instead of Gulp, Grunt, Brunch or Broccoli.
- Babel is being used to transpile the sources to ES5 compatible version.
- Mocha and Chai are being used for testing and assertions.
- There is a good chance that we leverage a stripped down version of d3 to remove the dependency on d3 too.

### Setting up the Developer Environment
- Install `node v4.x.x` from [here](https://nodejs.org/en/download/)
- Install these NPM packages globally: `flyjs`, `eslint`, `babel`, `mocha`
```
npm install -g flyjs eslint babel mocha
```
- Checkout this branch `uvCharts-next` after forking the main repository at `Imaginea/uvCharts`
- Execute `npm install` to install node dependencies
- Checkout tasks available `fly -l`.
- Running the default task using the command `fly` will watch source directory and build artifacts in `build/` directory.

#### Build targets

| Target        | Description                                               |
|---------------|-----------------------------------------------------------|
| fly build     | Build artifacts from source in `src` directory            |
| fly lint      | Lint `src` files based on rules configured in eslintrc    |
| fly           | Build artifacts and also watch `src` directory for changes|
| npm test      | Runs tests on built artifacts                             |

### Development Environment
- We support Node 4+ environments for development purpose.

### Styleguide
- eslintrc and editorconfig are checked in to this branch and are configured. So please adhere to them before committing code.
