(function() {
  var ShellRunner, SourceInfo,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShellRunner = require('./../lib/shell-runner');

  SourceInfo = (function() {
    function SourceInfo() {
      this.cwd = __bind(this.cwd, this);
      this.command = __bind(this.command, this);
      this.exit = __bind(this.exit, this);
      this.write = __bind(this.write, this);
    }

    SourceInfo.prototype.file = 'Hello, World!';

    SourceInfo.prototype.output = '';

    SourceInfo.prototype.currentShell = "bash";

    SourceInfo.prototype.write = function(str) {
      return this.output += str;
    };

    SourceInfo.prototype.exit = function() {
      return this.exited = true;
    };

    SourceInfo.prototype.command = function() {
      return "echo -n " + this.file;
    };

    SourceInfo.prototype.cwd = function() {
      return "/tmp";
    };

    return SourceInfo;

  })();

  describe("ShellRunner", function() {
    beforeEach(function() {
      this.params = new SourceInfo();
      return this.runner = new ShellRunner(this.params);
    });
    describe('::run', function() {
      return it("appends to writer", function() {
        this.runner.run();
        waitsFor(function() {
          return this.params.exited;
        });
        return runs(function() {
          return expect(this.params.output).toBe("Hello, World!");
        });
      });
    });
    return describe('::fullCommand', function() {
      return it("escapes cwd", function() {
        this.params.cwd = function() {
          return "/foo bar/baz";
        };
        this.params.command = function() {
          return "commandFoo";
        };
        return expect(this.runner.fullCommand()).toBe("cd /foo\\ bar/baz && commandFoo; exit\n");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvc2hlbGwtcnVubmVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLHVCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVNOzs7Ozs7S0FDSjs7QUFBQSx5QkFBQSxJQUFBLEdBQU0sZUFBTixDQUFBOztBQUFBLHlCQUNBLE1BQUEsR0FBUSxFQURSLENBQUE7O0FBQUEseUJBRUEsWUFBQSxHQUFjLE1BRmQsQ0FBQTs7QUFBQSx5QkFHQSxLQUFBLEdBQU8sU0FBQyxHQUFELEdBQUE7YUFDTCxJQUFDLENBQUEsTUFBRCxJQUFXLElBRE47SUFBQSxDQUhQLENBQUE7O0FBQUEseUJBS0EsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUNKLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FETjtJQUFBLENBTE4sQ0FBQTs7QUFBQSx5QkFPQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ04sVUFBQSxHQUFVLElBQUMsQ0FBQSxLQURMO0lBQUEsQ0FQVCxDQUFBOztBQUFBLHlCQVNBLEdBQUEsR0FBSyxTQUFBLEdBQUE7YUFDSCxPQURHO0lBQUEsQ0FUTCxDQUFBOztzQkFBQTs7TUFIRixDQUFBOztBQUFBLEVBZUEsUUFBQSxDQUFTLGFBQVQsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLFVBQUEsQ0FBQSxDQUFkLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFiLEVBRkw7SUFBQSxDQUFYLENBQUEsQ0FBQTtBQUFBLElBSUEsUUFBQSxDQUFTLE9BQVQsRUFBa0IsU0FBQSxHQUFBO2FBQ2hCLEVBQUEsQ0FBRyxtQkFBSCxFQUF3QixTQUFBLEdBQUE7QUFDdEIsUUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLFFBQUEsQ0FBUyxTQUFBLEdBQUE7aUJBQ1AsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUREO1FBQUEsQ0FBVCxDQURBLENBQUE7ZUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2lCQUNILE1BQUEsQ0FBTyxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQWYsQ0FBc0IsQ0FBQyxJQUF2QixDQUE0QixlQUE1QixFQURHO1FBQUEsQ0FBTCxFQUpzQjtNQUFBLENBQXhCLEVBRGdCO0lBQUEsQ0FBbEIsQ0FKQSxDQUFBO1dBWUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQSxHQUFBO2FBQ3hCLEVBQUEsQ0FBRyxhQUFILEVBQWtCLFNBQUEsR0FBQTtBQUNoQixRQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsR0FBUixHQUFjLFNBQUEsR0FBQTtpQkFDWixlQURZO1FBQUEsQ0FBZCxDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsR0FBa0IsU0FBQSxHQUFBO2lCQUNoQixhQURnQjtRQUFBLENBRmxCLENBQUE7ZUFJQSxNQUFBLENBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxXQUFSLENBQUEsQ0FBUCxDQUE2QixDQUFDLElBQTlCLENBQW1DLHlDQUFuQyxFQUxnQjtNQUFBLENBQWxCLEVBRHdCO0lBQUEsQ0FBMUIsRUFic0I7RUFBQSxDQUF4QixDQWZBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/shell-runner-spec.coffee
