(function() {
  var $$, RubyTestView, TestRunner, _;

  _ = require('underscore-plus');

  $$ = require('atom-space-pen-views').$$;

  RubyTestView = require('../lib/ruby-test-view');

  TestRunner = require('../lib/test-runner');

  describe("RubyTestView", function() {
    var activeEditor, fileOpened, setUpActiveEditor, spyOnTestRunnerInitialize, spyOnTestRunnerRun, testRunnerInitializeParams, validateTestRunnerInitialize, validateTestRunnerRun, view;
    activeEditor = null;
    testRunnerInitializeParams = null;
    view = null;
    fileOpened = false;
    spyOnTestRunnerInitialize = function() {
      spyOn(activeEditor, 'save');
      spyOn(TestRunner.prototype, 'initialize').andCallFake(function(params) {
        return testRunnerInitializeParams = params;
      });
      return spyOn(TestRunner.prototype, 'run').andReturn(null);
    };
    validateTestRunnerInitialize = function() {
      expect(testRunnerInitializeParams).toBeDefined();
      expect(testRunnerInitializeParams).not.toBe(null);
      expect(testRunnerInitializeParams.write).toEqual(view.write);
      expect(testRunnerInitializeParams.exit).toEqual(view.onTestRunEnd);
      return expect(testRunnerInitializeParams.setTestInfo).toEqual(view.setTestInfo);
    };
    spyOnTestRunnerRun = function() {
      spyOn(activeEditor, 'save');
      spyOn(TestRunner.prototype, 'initialize').andCallThrough();
      spyOn(TestRunner.prototype, 'run').andCallThrough();
      return spyOn(TestRunner.prototype, 'command').andReturn('fooTestCommand');
    };
    validateTestRunnerRun = function() {
      expect(TestRunner.prototype.initialize).toHaveBeenCalled();
      expect(TestRunner.prototype.run).toHaveBeenCalledWith();
      return expect(activeEditor.save).toHaveBeenCalled();
    };
    setUpActiveEditor = function() {
      atom.workspace.open('/tmp/text.txt').then(function(editor) {
        activeEditor = editor;
        return fileOpened = true;
      });
      return waitsFor(function() {
        return fileOpened === true;
      });
    };
    describe("with open editor", function() {
      beforeEach(function() {
        fileOpened = false;
        testRunnerInitializeParams = null;
        view = null;
        activeEditor = null;
        return setUpActiveEditor();
      });
      describe("::testAll", function() {
        it("instantiates TestRunner with specific arguments", function() {
          spyOnTestRunnerInitialize();
          view = new RubyTestView();
          view.testAll();
          validateTestRunnerInitialize();
          return expect(testRunnerInitializeParams.testScope).toEqual('all');
        });
        return it("instantiates TestRunner and calls ::run on it", function() {
          spyOnTestRunnerRun();
          view = new RubyTestView();
          view.testAll();
          return validateTestRunnerRun();
        });
      });
      describe("::testFile", function() {
        it("instantiates TestRunner with specific arguments", function() {
          spyOnTestRunnerInitialize();
          view = new RubyTestView();
          view.testFile();
          validateTestRunnerInitialize();
          return expect(testRunnerInitializeParams.testScope).not.toBeDefined();
        });
        return it("calls ::run on the TestRunner instance", function() {
          spyOnTestRunnerRun();
          view = new RubyTestView();
          spyOn(view, 'setTestInfo').andCallThrough();
          view.testFile();
          validateTestRunnerRun();
          return expect(view.setTestInfo).toHaveBeenCalled();
        });
      });
      describe("::testSingle", function() {
        it("instantiates TestRunner with specific arguments", function() {
          spyOnTestRunnerInitialize();
          view = new RubyTestView();
          view.testSingle();
          validateTestRunnerInitialize();
          return expect(testRunnerInitializeParams.testScope).toEqual('single');
        });
        return it("instantiates TestRunner and calls ::run on it", function() {
          spyOnTestRunnerRun();
          view = new RubyTestView();
          view.testSingle();
          return validateTestRunnerRun();
        });
      });
      return describe("::testPrevious", function() {
        return it("intantiates TestRunner and calls ::run on it with specific arguments", function() {
          var previousRunner;
          spyOn(activeEditor, 'save');
          view = new RubyTestView();
          previousRunner = new TestRunner(view.testRunnerParams());
          previousRunner.command = function() {
            return "foo";
          };
          view.runner = previousRunner;
          view.testPrevious();
          expect(view.output).toBe("");
          expect(view.runner).toBe(previousRunner);
          return expect(activeEditor.save).toHaveBeenCalled();
        });
      });
    });
    describe("without open editor", function() {
      beforeEach(function() {
        fileOpened = false;
        testRunnerInitializeParams = null;
        return view = null;
      });
      return describe("::testAll", function() {
        return it("instantiates TestRunner and calls ::run on it", function() {
          spyOnTestRunnerRun();
          view = new RubyTestView();
          view.testAll();
          expect(TestRunner.prototype.initialize).toHaveBeenCalled();
          return expect(TestRunner.prototype.run).toHaveBeenCalledWith();
        });
      });
    });
    return describe("::write", function() {
      return it("appends content to results element", function() {
        view = new RubyTestView();
        view.write("foo");
        return expect(view.results.text()).toBe("foo");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvcnVieS10ZXN0LXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsK0JBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNDLEtBQU0sT0FBQSxDQUFRLHNCQUFSLEVBQU4sRUFERCxDQUFBOztBQUFBLEVBRUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSx1QkFBUixDQUZmLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLG9CQUFSLENBSGIsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLGlMQUFBO0FBQUEsSUFBQSxZQUFBLEdBQWUsSUFBZixDQUFBO0FBQUEsSUFDQSwwQkFBQSxHQUE2QixJQUQ3QixDQUFBO0FBQUEsSUFFQSxJQUFBLEdBQU8sSUFGUCxDQUFBO0FBQUEsSUFHQSxVQUFBLEdBQWEsS0FIYixDQUFBO0FBQUEsSUFLQSx5QkFBQSxHQUE0QixTQUFBLEdBQUE7QUFDMUIsTUFBQSxLQUFBLENBQU0sWUFBTixFQUFvQixNQUFwQixDQUFBLENBQUE7QUFBQSxNQUNBLEtBQUEsQ0FBTSxVQUFVLENBQUMsU0FBakIsRUFBNEIsWUFBNUIsQ0FBeUMsQ0FBQyxXQUExQyxDQUFzRCxTQUFDLE1BQUQsR0FBQTtlQUNwRCwwQkFBQSxHQUE2QixPQUR1QjtNQUFBLENBQXRELENBREEsQ0FBQTthQUdBLEtBQUEsQ0FBTSxVQUFVLENBQUMsU0FBakIsRUFBNEIsS0FBNUIsQ0FBa0MsQ0FBQyxTQUFuQyxDQUE2QyxJQUE3QyxFQUowQjtJQUFBLENBTDVCLENBQUE7QUFBQSxJQVdBLDRCQUFBLEdBQStCLFNBQUEs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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/ruby-test-view-spec.coffee
