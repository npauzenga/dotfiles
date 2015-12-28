(function() {
  var ShellRunner, SourceInfo, TestRunner,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShellRunner = require('./shell-runner');

  SourceInfo = require('./source-info');

  module.exports = TestRunner = (function() {
    function TestRunner(params) {
      this.command = __bind(this.command, this);
      this.initialize(params);
    }

    TestRunner.prototype.initialize = function(params) {
      this.params = params;
      return this.testParams = new SourceInfo();
    };

    TestRunner.prototype.run = function() {
      this.shell = new ShellRunner(this.shellRunnerParams());
      this.params.setTestInfo(this.command());
      return this.shell.run();
    };

    TestRunner.prototype.shellRunnerParams = function() {
      return {
        write: this.params.write,
        exit: this.params.exit,
        command: this.command,
        cwd: this.testParams.projectPath,
        currentShell: this.testParams.currentShell()
      };
    };

    TestRunner.prototype.command = function() {
      var cmd;
      cmd = this.params.testScope === "single" ? this.testParams.testSingleCommand() : this.params.testScope === "all" ? this.testParams.testAllCommand() : this.testParams.testFileCommand();
      return cmd.replace('{relative_path}', this.testParams.activeFile()).replace('{line_number}', this.testParams.currentLine()).replace('{regex}', this.testParams.minitestRegExp());
    };

    TestRunner.prototype.cancel = function() {
      return this.shell.kill();
    };

    return TestRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi90ZXN0LXJ1bm5lci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUNBQUE7SUFBQSxrRkFBQTs7QUFBQSxFQUFBLFdBQUEsR0FBYyxPQUFBLENBQVEsZ0JBQVIsQ0FBZCxDQUFBOztBQUFBLEVBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRGIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFDUyxJQUFBLG9CQUFDLE1BQUQsR0FBQTtBQUNYLCtDQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxVQUFELENBQVksTUFBWixDQUFBLENBRFc7SUFBQSxDQUFiOztBQUFBLHlCQUdBLFVBQUEsR0FBWSxTQUFDLE1BQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFWLENBQUE7YUFDQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFVBQUEsQ0FBQSxFQUZSO0lBQUEsQ0FIWixDQUFBOztBQUFBLHlCQU9BLEdBQUEsR0FBSyxTQUFBLEdBQUE7QUFDSCxNQUFBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxXQUFBLENBQVksSUFBQyxDQUFBLGlCQUFELENBQUEsQ0FBWixDQUFiLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFvQixJQUFDLENBQUEsT0FBRCxDQUFBLENBQXBCLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxLQUFLLENBQUMsR0FBUCxDQUFBLEVBSEc7SUFBQSxDQVBMLENBQUE7O0FBQUEseUJBWUEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO2FBQ2pCO0FBQUEsUUFBQSxLQUFBLEVBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFqQjtBQUFBLFFBQ0EsSUFBQSxFQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFEakI7QUFBQSxRQUVBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FGVjtBQUFBLFFBR0EsR0FBQSxFQUFTLElBQUMsQ0FBQSxVQUFVLENBQUMsV0FIckI7QUFBQSxRQUlBLFlBQUEsRUFBYyxJQUFDLENBQUEsVUFBVSxDQUFDLFlBQVosQ0FBQSxDQUpkO1FBRGlCO0lBQUEsQ0FabkIsQ0FBQTs7QUFBQSx5QkFtQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEsR0FBQTtBQUFBLE1BQUEsR0FBQSxHQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixLQUFxQixRQUF4QixHQUNGLElBQUMsQ0FBQSxVQUFVLENBQUMsaUJBQVosQ0FBQSxDQURFLEdBRUksSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEtBQXFCLEtBQXhCLEdBQ0gsSUFBQyxDQUFBLFVBQVUsQ0FBQyxjQUFaLENBQUEsQ0FERyxHQUdILElBQUMsQ0FBQSxVQUFVLENBQUMsZUFBWixDQUFBLENBTEosQ0FBQTthQU1BLEdBQUcsQ0FBQyxPQUFKLENBQVksaUJBQVosRUFBK0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxVQUFaLENBQUEsQ0FBL0IsQ0FBd0QsQ0FDcEQsT0FESixDQUNZLGVBRFosRUFDNkIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxXQUFaLENBQUEsQ0FEN0IsQ0FDdUQsQ0FDbkQsT0FGSixDQUVZLFNBRlosRUFFdUIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxjQUFaLENBQUEsQ0FGdkIsRUFQTztJQUFBLENBbkJULENBQUE7O0FBQUEseUJBOEJBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFDTixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBQSxFQURNO0lBQUEsQ0E5QlIsQ0FBQTs7c0JBQUE7O01BTEosQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/test-runner.coffee
