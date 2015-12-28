(function() {
  var Convert, ResizeHandle, RubyTestView, TestRunner, Utility, View, _,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  View = require('atom-space-pen-views').View;

  TestRunner = require('./test-runner');

  ResizeHandle = require('./resize-handle');

  Utility = require('./utility');

  Convert = require('ansi-to-html');

  module.exports = RubyTestView = (function(_super) {
    __extends(RubyTestView, _super);

    function RubyTestView() {
      this.write = __bind(this.write, this);
      this.onTestRunEnd = __bind(this.onTestRunEnd, this);
      this.setTestInfo = __bind(this.setTestInfo, this);
      return RubyTestView.__super__.constructor.apply(this, arguments);
    }

    RubyTestView.content = function() {
      return this.div({
        "class": "ruby-test inset-panel panel-bottom native-key-bindings",
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            "class": "ruby-test-resize-handle"
          });
          _this.div({
            "class": "panel-heading"
          }, function() {
            _this.span('Running tests: ');
            _this.span({
              outlet: 'header'
            });
            return _this.div({
              "class": "heading-buttons pull-right inline-block"
            }, function() {
              return _this.div({
                click: 'closePanel',
                "class": "heading-close icon-x inline-block"
              });
            });
          });
          return _this.div({
            "class": "panel-body"
          }, function() {
            _this.div({
              "class": 'ruby-test-spinner'
            }, 'Starting...');
            return _this.pre("", {
              outlet: 'results'
            });
          });
        };
      })(this));
    };

    RubyTestView.prototype.initialize = function(serializeState) {
      atom.commands.add("atom-workspace", "ruby-test:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.commands.add("atom-workspace", "ruby-test:test-file", (function(_this) {
        return function() {
          return _this.testFile();
        };
      })(this));
      atom.commands.add("atom-workspace", "ruby-test:test-single", (function(_this) {
        return function() {
          return _this.testSingle();
        };
      })(this));
      atom.commands.add("atom-workspace", "ruby-test:test-previous", (function(_this) {
        return function() {
          return _this.testPrevious();
        };
      })(this));
      atom.commands.add("atom-workspace", "ruby-test:test-all", (function(_this) {
        return function() {
          return _this.testAll();
        };
      })(this));
      atom.commands.add("atom-workspace", "ruby-test:cancel", (function(_this) {
        return function() {
          return _this.cancelTest();
        };
      })(this));
      return new ResizeHandle(this);
    };

    RubyTestView.prototype.serialize = function() {};

    RubyTestView.prototype.destroy = function() {
      this.output = '';
      return this.detach();
    };

    RubyTestView.prototype.closePanel = function() {
      if (this.hasParent()) {
        return this.detach();
      }
    };

    RubyTestView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.detach();
      } else {
        this.showPanel();
        if (!this.runner) {
          this.spinner.hide();
          return this.setTestInfo("No tests running");
        }
      }
    };

    RubyTestView.prototype.testFile = function() {
      return this.runTest();
    };

    RubyTestView.prototype.testSingle = function() {
      return this.runTest({
        testScope: "single"
      });
    };

    RubyTestView.prototype.testAll = function() {
      return this.runTest({
        testScope: "all"
      });
    };

    RubyTestView.prototype.testPrevious = function() {
      if (!this.runner) {
        return;
      }
      this.saveFile();
      this.newTestView();
      return this.runner.run();
    };

    RubyTestView.prototype.runTest = function(overrideParams) {
      var params;
      this.saveFile();
      this.newTestView();
      params = _.extend({}, this.testRunnerParams(), overrideParams || {});
      this.runner = new TestRunner(params);
      this.runner.run();
      return this.spinner.show();
    };

    RubyTestView.prototype.newTestView = function() {
      this.output = '';
      this.flush();
      return this.showPanel();
    };

    RubyTestView.prototype.testRunnerParams = function() {
      return {
        write: this.write,
        exit: this.onTestRunEnd,
        setTestInfo: this.setTestInfo
      };
    };

    RubyTestView.prototype.setTestInfo = function(infoStr) {
      return this.header.text(infoStr);
    };

    RubyTestView.prototype.onTestRunEnd = function() {
      return null;
    };

    RubyTestView.prototype.showPanel = function() {
      if (!this.hasParent()) {
        atom.workspace.addBottomPanel({
          item: this
        });
        return this.spinner = this.find('.ruby-test-spinner');
      }
    };

    RubyTestView.prototype.write = function(str) {
      var convert, converted;
      if (this.spinner) {
        this.spinner.hide();
      }
      this.output || (this.output = '');
      convert = new Convert({
        escapeXML: true
      });
      converted = convert.toHtml(str);
      this.output += converted;
      return this.flush();
    };

    RubyTestView.prototype.flush = function() {
      this.results.html(this.output);
      return this.results.parent().scrollTop(this.results.innerHeight());
    };

    RubyTestView.prototype.cancelTest = function() {
      var _ref;
      this.runner.cancel();
      if ((_ref = this.spinner) != null) {
        _ref.hide();
      }
      return this.write('\nTests canceled');
    };

    RubyTestView.prototype.saveFile = function() {
      var util;
      util = new Utility;
      return util.saveFile();
    };

    return RubyTestView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9ydWJ5LXRlc3Qtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUVBQUE7SUFBQTs7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFERCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUdBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FIZixDQUFBOztBQUFBLEVBSUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxXQUFSLENBSlYsQ0FBQTs7QUFBQSxFQUtBLE9BQUEsR0FBVSxPQUFBLENBQVEsY0FBUixDQUxWLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osbUNBQUEsQ0FBQTs7Ozs7OztLQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sd0RBQVA7QUFBQSxRQUFpRSxRQUFBLEVBQVUsQ0FBQSxDQUEzRTtPQUFMLEVBQW9GLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDbEYsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8seUJBQVA7V0FBTCxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO1dBQUwsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFlBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxpQkFBTixDQUFB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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/ruby-test-view.coffee
