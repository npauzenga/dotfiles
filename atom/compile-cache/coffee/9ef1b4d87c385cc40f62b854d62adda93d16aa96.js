(function() {
  var SourceInfo, Utility, fs;

  fs = require('fs');

  Utility = require('./utility');

  module.exports = SourceInfo = (function() {
    function SourceInfo() {}

    SourceInfo.prototype.frameworkLookup = {
      test: 'test',
      spec: 'rspec',
      rspec: 'rspec',
      feature: 'cucumber',
      minitest: 'minitest'
    };

    SourceInfo.prototype.regExpForTestStyle = {
      unit: /def\s(.*?)$/,
      spec: /(?:"|')(.*?)(?:"|')/
    };

    SourceInfo.prototype.currentShell = function() {
      return atom.config.get('ruby-test.shell') || 'bash';
    };

    SourceInfo.prototype.projectPath = function() {
      return atom.project.getPaths()[0];
    };

    SourceInfo.prototype.testFileCommand = function() {
      return atom.config.get("ruby-test." + (this.testFramework()) + "FileCommand");
    };

    SourceInfo.prototype.testAllCommand = function() {
      var configName;
      configName = "ruby-test." + (this.testFramework()) + "AllCommand";
      return atom.config.get("ruby-test." + (this.testFramework()) + "AllCommand");
    };

    SourceInfo.prototype.testSingleCommand = function() {
      return atom.config.get("ruby-test." + (this.testFramework()) + "SingleCommand");
    };

    SourceInfo.prototype.activeFile = function() {
      var fp;
      return this._activeFile || (this._activeFile = (fp = this.filePath()) && atom.project.relativize(fp));
    };

    SourceInfo.prototype.currentLine = function() {
      var cursor, editor;
      return this._currentLine || (this._currentLine = !this._currentLine ? (editor = atom.workspace.getActiveTextEditor(), cursor = editor && editor.getLastCursor(), cursor ? cursor.getBufferRow() + 1 : null) : void 0);
    };

    SourceInfo.prototype.minitestRegExp = function() {
      var file;
      if (this._minitestRegExp !== void 0) {
        return this._minitestRegExp;
      }
      file = this.fileAnalysis();
      return this._minitestRegExp = this.extractMinitestRegExp(file.testHeaderLine, file.testStyle);
    };

    SourceInfo.prototype.extractMinitestRegExp = function(testHeaderLine, testStyle) {
      var match;
      match = (testHeaderLine != null) && testHeaderLine.match(this.regExpForTestStyle[testStyle]) || null;
      if (match) {
        return match[1];
      } else {
        return "";
      }
    };

    SourceInfo.prototype.isMiniTest = function() {
      if (this._isMiniTest !== void 0) {
        return this._isMiniTest;
      }
      return this.fileAnalysis().isMiniTest;
    };

    SourceInfo.prototype.fileAnalysis = function() {
      var editor, i, minitestClassRegExp, minitestMethodRegExp, rspecRequireRegExp, sourceLine, specRegExp;
      if (this._fileAnalysis !== void 0) {
        return this._fileAnalysis;
      }
      this._fileAnalysis = {
        testHeaderLine: null,
        isSpec: false,
        isUnit: false,
        isRSpec: false,
        isMiniTest: false
      };
      editor = atom.workspace.getActiveTextEditor();
      i = this.currentLine() - 1;
      specRegExp = new RegExp(/\b(should|test|it)\s+['""'](.*)['""']\s+do\b/);
      rspecRequireRegExp = new RegExp(/^require(\s+)['"](rails|spec)_helper['"]$/);
      minitestClassRegExp = new RegExp(/class\s(.*)<(\s?|\s+)Minitest::Test/);
      minitestMethodRegExp = new RegExp(/^(\s+)def\s(.*)$/);
      while (i >= 0) {
        sourceLine = editor.lineTextForBufferRow(i);
        if (!this._fileAnalysis.testHeaderLine) {
          if (specRegExp.test(sourceLine)) {
            this._fileAnalysis.isSpec = true;
            this._fileAnalysis.testHeaderLine = sourceLine;
          } else if (minitestMethodRegExp.test(sourceLine)) {
            this._fileAnalysis.isUnit = true;
            this._fileAnalysis.testStyle = 'unit';
            this._fileAnalysis.testHeaderLine = sourceLine;
          }
        } else if (rspecRequireRegExp.test(sourceLine)) {
          this._fileAnalysis.isRSpec = true;
          this._fileAnalysis.isSpec = true;
          this._fileAnalysis.testStyle = 'spec';
          break;
        } else if (this._fileAnalysis.isUnit && minitestClassRegExp.test(sourceLine)) {
          this._fileAnalysis.isMiniTest = true;
          return this._fileAnalysis;
        }
        i--;
      }
      if (!this._fileAnalysis.isRSpec && this._fileAnalysis.isSpec) {
        this._fileAnalysis.isMiniTest = true;
      }
      return this._fileAnalysis;
    };

    SourceInfo.prototype.testFramework = function() {
      var t;
      return this._testFramework || (this._testFramework = !this._testFramework ? ((t = this.fileType()) && this.frameworkLookup[t]) || (fs.existsSync(this.projectPath() + '/.rspec') && 'rspec') || this.projectType() : void 0);
    };

    SourceInfo.prototype.fileType = function() {
      var matches;
      return this._fileType || (this._fileType = this._fileType === void 0 ? !this.activeFile() ? null : (matches = this.activeFile().match(/_(test|spec)\.rb$/)) ? matches[1] === 'test' && atom.config.get("ruby-test.testFramework") ? atom.config.get("ruby-test.testFramework") : matches[1] === 'spec' && atom.config.get("ruby-test.specFramework") ? atom.config.get("ruby-test.specFramework") : this.isMiniTest() ? 'minitest' : matches[1] === 'spec' ? 'rspec' : 'test' : (matches = this.activeFile().match(/\.(feature)$/)) ? matches[1] : void 0 : void 0);
    };

    SourceInfo.prototype.projectType = function() {
      if (fs.existsSync(this.projectPath() + '/test')) {
        return atom.config.get("ruby-test.testFramework") || 'test';
      } else if (fs.existsSync(this.projectPath() + '/spec')) {
        return atom.config.get("ruby-test.specFramework") || 'rspec';
      } else if (fs.existsSync(this.projectPath() + '/features')) {
        return 'cucumber';
      } else {
        return null;
      }
    };

    SourceInfo.prototype.filePath = function() {
      var util;
      util = new Utility;
      return util.filePath();
    };

    return SourceInfo;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9zb3VyY2UtaW5mby5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUJBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSLENBRFYsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRVE7NEJBQ0o7O0FBQUEseUJBQUEsZUFBQSxHQUNFO0FBQUEsTUFBQSxJQUFBLEVBQVMsTUFBVDtBQUFBLE1BQ0EsSUFBQSxFQUFTLE9BRFQ7QUFBQSxNQUVBLEtBQUEsRUFBUyxPQUZUO0FBQUEsTUFHQSxPQUFBLEVBQVMsVUFIVDtBQUFBLE1BSUEsUUFBQSxFQUFVLFVBSlY7S0FERixDQUFBOztBQUFBLHlCQU9BLGtCQUFBLEdBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxhQUFOO0FBQUEsTUFDQSxJQUFBLEVBQU0scUJBRE47S0FSRixDQUFBOztBQUFBLHlCQVdBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsaUJBQWhCLENBQUEsSUFBc0MsT0FEMUI7SUFBQSxDQVhkLENBQUE7O0FBQUEseUJBY0EsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBYixDQUFBLENBQXdCLENBQUEsQ0FBQSxFQURiO0lBQUEsQ0FkYixDQUFBOztBQUFBLHlCQWlCQSxlQUFBLEdBQWlCLFNBQUEsR0FBQTthQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFpQixZQUFBLEdBQVcsQ0FBQyxJQUFDLENBQUEsYUFBRCxDQUFBLENBQUQsQ0FBWCxHQUE2QixhQUE5QyxFQURl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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/source-info.coffee
