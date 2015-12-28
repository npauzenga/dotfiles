(function() {
  var SourceInfo, fs,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  SourceInfo = require('../lib/source-info');

  fs = require('fs');

  describe("SourceInfo", function() {
    var editor, sourceInfo, withSetup;
    editor = null;
    sourceInfo = null;
    withSetup = function(opts) {
      var cursor, key, lines, value, _ref;
      atom.project = {
        getPaths: function() {
          return ["project_1"];
        },
        relativize: function(filePath) {
          var index, newPath, path, _i, _len, _ref;
          _ref = this.getPaths();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            path = _ref[_i];
            index = filePath.indexOf(path);
            if (index >= 0) {
              newPath = filePath.slice(index + path.length, filePath.length);
              if (newPath[0] === '/') {
                newPath = newPath.slice(1, newPath.length);
              }
              return newPath;
            }
          }
        }
      };
      editor = {
        buffer: {
          file: {
            path: "foo_test.rb"
          }
        }
      };
      cursor = {
        getBufferRow: function() {
          return 99;
        }
      };
      editor.getLastCursor = function() {
        return cursor;
      };
      editor.lineTextForBufferRow = function(line) {
        return "";
      };
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
      sourceInfo = new SourceInfo();
      if (opts.testFile) {
        editor.buffer.file.path = opts.testFile;
      }
      if (opts.projectPaths) {
        atom.project.getPaths = function() {
          return opts.projectPaths;
        };
      }
      if (opts.currentLine) {
        cursor.getBufferRow = function() {
          return opts.currentLine - 1;
        };
      }
      if (opts.fileContent) {
        lines = opts.fileContent.split("\n");
        editor.lineTextForBufferRow = function(row) {
          return lines[row];
        };
      }
      if (opts.config) {
        _ref = opts.config;
        for (key in _ref) {
          value = _ref[key];
          atom.config.set(key, value);
        }
      }
      if (opts.mockPaths) {
        return spyOn(fs, 'existsSync').andCallFake(function(path) {
          return __indexOf.call(opts.mockPaths, path) >= 0;
        });
      }
    };
    beforeEach(function() {
      editor = null;
      sourceInfo = null;
      return atom.project = null;
    });
    describe("::projectPath", function() {
      return it("is atom.project.getPaths()[0]", function() {
        withSetup({
          projectPaths: ['/home/user/project_1'],
          testFile: null
        });
        return expect(sourceInfo.projectPath()).toBe("/home/user/project_1");
      });
    });
    describe("::testFramework", function() {
      describe("RSpec detection", function() {
        it("detects RSpec based on configuration value set to 'rspec'", function() {
          withSetup({
            config: {
              "ruby-test.specFramework": "rspec"
            },
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_spec.rb',
            currentLine: 1,
            fileContent: ''
          });
          return expect(sourceInfo.testFramework()).toBe("rspec");
        });
        return it("selects RSpec for spec file if spec_helper is required", function() {
          withSetup({
            config: {
              "ruby-test.specFramework": ""
            },
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_spec.rb',
            currentLine: 5,
            fileContent: "require 'spec_helper'\n\ndescribe \"something\" do\n  it \"test something\" do\n    expect('foo').to eq 'foo'\n  end\nend"
          });
          return expect(sourceInfo.testFramework()).toBe("rspec");
        });
      });
      describe("Minitest detection", function() {
        it("is Minitest if filename matches _test.rb, and file contains specs", function() {
          withSetup({
            config: {
              "ruby-test.specFramework": ""
            },
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_test.rb',
            currentLine: 10,
            fileContent: "describe \"something\" do\n  it \"test something\" do\n    1.must_equal 1\n  end\nend"
          });
          return expect(sourceInfo.testFramework()).toBe("minitest");
        });
        it("detects Minitest based on configuration value set to 'minitest'", function() {
          withSetup({
            config: {
              "ruby-test.specFramework": "minitest"
            },
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_spec.rb',
            currentLine: 1,
            fileContent: ''
          });
          return expect(sourceInfo.testFramework()).toBe("minitest");
        });
        it("is Minitest for a _test.rb file that contains Minitest::Test", function() {
          withSetup({
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_test.rb',
            currentLine: 3,
            fileContent: "class sometest < Minitest::Test\n  def something\n    assert_equal 1, 1\n  end\nend"
          });
          return expect(sourceInfo.testFramework()).toBe("minitest");
        });
        return it("when no test file is open, detects Minitest based on configuration value set to 'minitest'", function() {
          withSetup({
            config: {
              "ruby-test.specFramework": "minitest"
            },
            projectPaths: ['/home/user/project_1'],
            testFile: null,
            currentLine: null,
            mockPaths: ['/home/user/project_1/spec'],
            fileContent: ''
          });
          return expect(sourceInfo.testFramework()).toBe("minitest");
        });
      });
      describe("Test::Unit detection", function() {
        return it("assumes Test::Unit when the filename ends with _test.rb, has a method definition, and doesn't have a reference to Minitest", function() {
          withSetup({
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/bar/foo_test.rb',
            currentLine: 3,
            fileContent: "class sometest < Whatever::Unit\n  def something\n    assert_equal 1, 1\n  end\nend"
          });
          return expect(sourceInfo.testFramework()).toBe("test");
        });
      });
      return describe("Cucumber detection", function() {
        return it("correctly detects Cucumber file", function() {
          withSetup({
            projectPaths: ['/home/user/project_1'],
            testFile: '/home/user/project_1/foo/foo.feature',
            currentLine: 1,
            mockPaths: ['/home/user/project_1/spec', '/home/user/project_1/.rspec'],
            fileContent: ""
          });
          return expect(sourceInfo.testFramework()).toBe("cucumber");
        });
      });
    });
    describe("::projectType", function() {
      it("correctly detects a test directory", function() {
        withSetup({
          projectPaths: ['/home/user/project_1'],
          testFile: null,
          mockPaths: ['/home/user/project_1/test']
        });
        return expect(sourceInfo.projectType()).toBe("test");
      });
      it("correctly detecs a spec directory", function() {
        withSetup({
          projectPaths: ['/home/user/project_1'],
          testFile: null,
          mockPaths: ['/home/user/project_1/spec']
        });
        return expect(sourceInfo.projectType()).toBe("rspec");
      });
      return it("correctly detects a cucumber directory", function() {
        withSetup({
          projectPaths: ['/home/user/project_1'],
          testFile: null,
          mockPaths: ['/home/user/project_1/features']
        });
        return expect(sourceInfo.projectType()).toBe("cucumber");
      });
    });
    describe("::testAllCommand", function() {
      return it("is the atom config for 'ruby-test.testAllCommand'", function() {
        withSetup({
          config: {
            "ruby-test.testAllCommand": "my_ruby -I test test"
          },
          projectPaths: ['/home/user/project_1'],
          testFile: null,
          mockPaths: ['/home/user/project_1/test']
        });
        return expect(sourceInfo.testAllCommand()).toBe("my_ruby -I test test");
      });
    });
    describe("::rspecAllCommand", function() {
      return it("is the atom config for 'ruby-test.rspecAllCommand' if spec directory exists", function() {
        withSetup({
          config: {
            "ruby-test.rspecAllCommand": "my_rspec spec"
          },
          projectPaths: ['/home/user/project_1'],
          testFile: null,
          mockPaths: ['/home/user/project_1/spec']
        });
        return expect(sourceInfo.testAllCommand()).toBe("my_rspec spec");
      });
    });
    describe("::rspecFileCommand", function() {
      return it("is the atom config for 'ruby-test.rspecFileCommand' if active file is _spec.rb and spec framework is rspec", function() {
        withSetup({
          config: {
            "ruby-test.specFramework": "rspec",
            "ruby-test.rspecFileCommand": "my_rspec --tty {relative_path}"
          },
          projectPaths: ['/home/user/project_1'],
          testFile: '/home/user/project_1/bar/foo_spec.rb',
          currentLine: 1,
          fileContent: ''
        });
        return expect(sourceInfo.testFileCommand()).toBe("my_rspec --tty {relative_path}");
      });
    });
    describe("::testSingleCommand", function() {
      return it("is the atom config for 'ruby-test.testSingleCommand' if active file is _test.rb and test framework is test", function() {
        withSetup({
          config: {
            "ruby-test.testFramework": "test",
            "ruby-test.testSingleCommand": "my_ruby -I test {relative_path}:{line_number}"
          },
          projectPaths: ['/home/user/project_1'],
          testFile: '/home/user/project_1/bar/foo_test.rb',
          currentLine: 1,
          fileContent: ''
        });
        return expect(sourceInfo.testSingleCommand()).toBe("my_ruby -I test {relative_path}:{line_number}");
      });
    });
    describe("::activeFile", function() {
      return it("is the project-relative path for the current file path", function() {
        withSetup({
          projectPaths: ['/home/user/project_1'],
          testFile: '/home/user/project_1/bar/foo_test.rb'
        });
        return expect(sourceInfo.activeFile()).toBe("bar/foo_test.rb");
      });
    });
    describe("::currentLine", function() {
      return it("is the cursor getBufferRow() plus 1", function() {
        withSetup({
          currentLine: 100
        });
        return expect(sourceInfo.currentLine()).toBe(100);
      });
    });
    describe("::extractMinitestRegExp", function() {
      it("correctly returns the matching regex for spec", function() {
        sourceInfo = new SourceInfo();
        return expect(sourceInfo.extractMinitestRegExp(" it \"test something\" do", "spec")).toBe("test something");
      });
      it("correctly returns the matching regex for minitest unit", function() {
        sourceInfo = new SourceInfo();
        return expect(sourceInfo.extractMinitestRegExp(" def test_something", "unit")).toBe("test_something");
      });
      return it("should return empty string if no match", function() {
        sourceInfo = new SourceInfo();
        return expect(sourceInfo.extractMinitestRegExp("test something", "spec")).toBe("");
      });
    });
    describe("::currentShell", function() {
      return it("when ruby-test.shell is null", function() {
        withSetup({
          config: {
            "ruby-test.shell": "my_bash"
          }
        });
        return expect(sourceInfo.currentShell()).toBe('my_bash');
      });
    });
    return afterEach(function() {
      return delete atom.project;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvc291cmNlLWluZm8tc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsY0FBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxvQkFBUixDQUFiLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBR0EsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLFFBQUEsNkJBQUE7QUFBQSxJQUFBLE1BQUEsR0FBUyxJQUFULENBQUE7QUFBQSxJQUNBLFVBQUEsR0FBYSxJQURiLENBQUE7QUFBQSxJQUdBLFNBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtBQUNWLFVBQUEsK0JBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxPQUFMLEdBQ0U7QUFBQSxRQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7aUJBQ1IsQ0FBQyxXQUFELEVBRFE7UUFBQSxDQUFWO0FBQUEsUUFFQSxVQUFBLEVBQVksU0FBQyxRQUFELEdBQUE7QUFDVixjQUFBLG9DQUFBO0FBQUE7QUFBQSxlQUFBLDJDQUFBOzRCQUFBO0FBQ0UsWUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsSUFBakIsQ0FBUixDQUFBO0FBQ0EsWUFBQSxJQUFHLEtBQUEsSUFBUyxDQUFaO0FBQ0UsY0FBQSxPQUFBLEdBQVUsUUFBUSxDQUFDLEtBQVQsQ0FBZSxLQUFBLEdBQVEsSUFBSSxDQUFDLE1BQTVCLEVBQW9DLFFBQVEsQ0FBQyxNQUE3QyxDQUFWLENBQUE7QUFDQSxjQUFBLElBQThDLE9BQVEsQ0FBQSxDQUFBLENBQVIsS0FBYyxHQUE1RDtBQUFBLGdCQUFBLE9BQUEsR0FBVSxPQUFPLENBQUMs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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/source-info-spec.coffee
