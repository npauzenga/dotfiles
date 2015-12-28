(function() {
  var RubyTestView;

  RubyTestView = require('./ruby-test-view');

  module.exports = {
    config: {
      minitestAllCommand: {
        title: "Minitest command: Run all tests",
        type: 'string',
        "default": "ruby -I test test"
      },
      minitestFileCommand: {
        title: "Minitest command: Run test file",
        type: 'string',
        "default": "ruby -I test {relative_path}"
      },
      minitestSingleCommand: {
        title: "Minitest command: Run current test",
        type: 'string',
        "default": "ruby {relative_path} -n \"/{regex}/\""
      },
      testAllCommand: {
        title: "Ruby Test command: Run all tests",
        type: 'string',
        "default": "ruby -I test test"
      },
      testFileCommand: {
        title: "Ruby Test command: Run test in file",
        type: 'string',
        "default": "ruby -I test {relative_path}"
      },
      testSingleCommand: {
        title: "Ruby Test command: Run test at line number",
        type: 'string',
        "default": "ruby -I test {relative_path}:{line_number}"
      },
      rspecAllCommand: {
        title: "RSpec command: run all specs",
        type: 'string',
        "default": "rspec --tty spec"
      },
      rspecFileCommand: {
        title: "RSpec command: run spec file",
        type: 'string',
        "default": "rspec --tty {relative_path}"
      },
      rspecSingleCommand: {
        title: "RSpec command: run spec at current line",
        type: 'string',
        "default": "rspec --tty {relative_path}:{line_number}"
      },
      cucumberAllCommand: {
        title: "Cucumber command: Run all features",
        type: 'string',
        "default": "cucumber --color features"
      },
      cucumberFileCommand: {
        title: "Cucumber command: Run features file",
        type: 'string',
        "default": "cucumber --color {relative_path}"
      },
      cucumberSingleCommand: {
        title: "Cucumber command: Run features at current line",
        type: 'string',
        "default": "cucumber --color {relative_path}:{line_number}"
      },
      shell: {
        type: 'string',
        "default": "bash"
      },
      specFramework: {
        type: 'string',
        "default": '',
        "enum": ['', 'rspec', 'minitest'],
        description: 'RSpec and Minitest spec files look very similar to each other, and ruby-test often can\'t tell them apart. Choose your preferred *_spec.rb framework.'
      },
      testFramework: {
        type: 'string',
        "default": '',
        "enum": ['', 'minitest', 'test'],
        description: 'Minitest test files and Test::Unit files look very similar to each other, and ruby-test often can\'t tell them apart. Choose your preferred *_test.rb framework.'
      }
    },
    rubyTestView: null,
    activate: function(state) {
      return this.rubyTestView = new RubyTestView(state.rubyTestViewState);
    },
    deactivate: function() {
      return this.rubyTestView.destroy();
    },
    serialize: function() {
      return {
        rubyTestViewState: this.rubyTestView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9ydWJ5LXRlc3QuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGtCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsa0JBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGlDQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLG1CQUZUO09BREY7QUFBQSxNQUlBLG1CQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxpQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyw4QkFGVDtPQUxGO0FBQUEsTUFRQSxxQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sb0NBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsdUNBRlQ7T0FURjtBQUFBLE1BWUEsY0FBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sa0NBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsbUJBRlQ7T0FiRjtBQUFBLE1BZ0JBLGVBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLHFDQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLDhCQUZUO09BakJGO0FBQUEsTUFvQkEsaUJBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLDRDQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLDRDQUZUO09BckJGO0FBQUEsTUF3QkEsZUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsa0JBRlQ7T0F6QkY7QUFBQSxNQTRCQSxnQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sOEJBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsNkJBRlQ7T0E3QkY7QUFBQSxNQWdDQSxrQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8seUNBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsMkNBRlQ7T0FqQ0Y7QUFBQSxNQW9DQSxrQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sb0NBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsMkJBRlQ7T0FyQ0Y7QUFBQSxNQXdDQSxtQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8scUNBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsa0NBRlQ7T0F6Q0Y7QUFBQSxNQTRDQSxxQkFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sZ0RBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsZ0RBRlQ7T0E3Q0Y7QUFBQSxNQWdEQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsTUFEVDtPQWpERjtBQUFBLE1BbURBLGFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxFQURUO0FBQUEsUUFFQSxNQUFBLEVBQU0sQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFjLFVBQWQsQ0FGTjtBQUFBLFFBR0EsV0FBQSxFQUFhLHVKQUhiO09BcERGO0FBQUEsTUF3REEsYUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEVBRFQ7QUFBQSxRQUVBLE1BQUEsRUFBTSxDQUFDLEVBQUQsRUFBSyxVQUFMLEVBQWlCLE1BQWpCLENBRk47QUFBQSxRQUdBLFdBQUEsRUFBYSxrS0FIYjtPQXpERjtLQURGO0FBQUEsSUErREEsWUFBQSxFQUFjLElBL0RkO0FBQUEsSUFpRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLFlBQUQsR0FBb0IsSUFBQSxZQUFBLENBQWEsS0FBSyxDQUFDLGlCQUFuQixFQURaO0lBQUEsQ0FqRVY7QUFBQSxJQW9FQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQUEsRUFEVTtJQUFBLENBcEVaO0FBQUEsSUF1RUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxpQkFBQSxFQUFtQixJQUFDLENBQUEsWUFBWSxDQUFDLFNBQWQsQ0FBQSxDQUFuQjtRQURTO0lBQUEsQ0F2RVg7R0FIRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/ruby-test.coffee
