(function() {
  var ShellRunner, SourceInfo, TestRunner;

  TestRunner = require('../lib/test-runner');

  SourceInfo = require('../lib/source-info');

  ShellRunner = require('../lib/shell-runner');

  describe("TestRunner", function() {
    beforeEach(function() {
      spyOn(ShellRunner.prototype, 'initialize').andCallThrough();
      this.testRunnerParams = {
        write: (function(_this) {
          return function() {
            return null;
          };
        })(this),
        exit: (function(_this) {
          return function() {
            return null;
          };
        })(this),
        shellRunnerParams: (function(_this) {
          return function() {
            return null;
          };
        })(this),
        setTestInfo: (function(_this) {
          return function() {
            return null;
          };
        })(this)
      };
      spyOn(this.testRunnerParams, 'shellRunnerParams');
      spyOn(this.testRunnerParams, 'setTestInfo');
      spyOn(SourceInfo.prototype, 'activeFile').andReturn('fooTestFile');
      spyOn(SourceInfo.prototype, 'currentLine').andReturn(100);
      spyOn(SourceInfo.prototype, 'minitestRegExp').andReturn('test foo');
      spyOn(SourceInfo.prototype, 'testFileCommand').andReturn('fooTestCommand {relative_path}');
      return spyOn(SourceInfo.prototype, 'testSingleCommand').andReturn('fooTestCommand {relative_path}:{line_number}');
    });
    return describe("::run", function() {
      it("Instantiates ShellRunner with expected params", function() {
        var runner;
        runner = new TestRunner(this.testRunnerParams);
        runner.run();
        expect(ShellRunner.prototype.initialize).toHaveBeenCalledWith(runner.shellRunnerParams());
        return expect(this.testRunnerParams.setTestInfo).toHaveBeenCalledWith("fooTestCommand fooTestFile");
      });
      it("constructs a single-test command when testScope is 'single'", function() {
        var runner;
        this.testRunnerParams.testScope = "single";
        runner = new TestRunner(this.testRunnerParams);
        runner.run();
        return expect(this.testRunnerParams.setTestInfo).toHaveBeenCalledWith("fooTestCommand fooTestFile:100");
      });
      return it("constructs a single-minitest command when testScope is 'single'", function() {
        var runner;
        SourceInfo.prototype.testSingleCommand.andReturn('fooTestCommand {relative_path} -n \"/{regex}/\"');
        this.testRunnerParams.testScope = "single";
        runner = new TestRunner(this.testRunnerParams);
        runner.run();
        return expect(this.testRunnerParams.setTestInfo).toHaveBeenCalledWith("fooTestCommand fooTestFile -n \"/test foo/\"");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvdGVzdC1ydW5uZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbUNBQUE7O0FBQUEsRUFBQSxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsb0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQUZkLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxLQUFBLENBQU0sV0FBVyxDQUFDLFNBQWxCLEVBQTZCLFlBQTdCLENBQTBDLENBQUMsY0FBM0MsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxnQkFBRCxHQUNFO0FBQUEsUUFBQSxLQUFBLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQjtBQUFBLFFBQ0EsSUFBQSxFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FEbkI7QUFBQSxRQUVBLGlCQUFBLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZuQjtBQUFBLFFBR0EsV0FBQSxFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEs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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/test-runner-spec.coffee
