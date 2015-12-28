(function() {
  var $, CompositeDisposable, CoveringView, View, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('space-pen'), View = _ref.View, $ = _ref.$;

  _ = require('underscore-plus');

  CoveringView = (function(_super) {
    __extends(CoveringView, _super);

    function CoveringView() {
      return CoveringView.__super__.constructor.apply(this, arguments);
    }

    CoveringView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.coverSubs = new CompositeDisposable;
      this.overlay = this.editor.decorateMarker(this.cover(), {
        type: 'overlay',
        item: this,
        position: 'tail'
      });
      return this.coverSubs.add(this.editor.onDidDestroy((function(_this) {
        return function() {
          return _this.cleanup();
        };
      })(this)));
    };

    CoveringView.prototype.attached = function() {
      var rightPosition;
      rightPosition = this.editor.verticallyScrollable() ? this.editor.getVerticalScrollbarWidth() : 0;
      this.parent().css({
        right: rightPosition
      });
      this.css({
        'margin-top': -this.editor.getLineHeightInPixels()
      });
      return this.height(this.editor.getLineHeightInPixels());
    };

    CoveringView.prototype.cleanup = function() {
      var _ref1;
      this.coverSubs.dispose();
      if ((_ref1 = this.overlay) != null) {
        _ref1.destroy();
      }
      return this.overlay = null;
    };

    CoveringView.prototype.cover = function() {
      return null;
    };

    CoveringView.prototype.conflict = function() {
      return null;
    };

    CoveringView.prototype.isDirty = function() {
      return false;
    };

    CoveringView.prototype.detectDirty = function() {
      return null;
    };

    CoveringView.prototype.decorate = function() {
      return null;
    };

    CoveringView.prototype.getModel = function() {
      return null;
    };

    CoveringView.prototype.buffer = function() {
      return this.editor.getBuffer();
    };

    CoveringView.prototype.includesCursor = function(cursor) {
      return false;
    };

    CoveringView.prototype.deleteMarker = function(marker) {
      this.buffer()["delete"](marker.getBufferRange());
      return marker.destroy();
    };

    CoveringView.prototype.scrollTo = function(positionOrNull) {
      if (positionOrNull != null) {
        return this.editor.setCursorBufferPosition(positionOrNull);
      }
    };

    CoveringView.prototype.prependKeystroke = function(eventName, element) {
      var bindings, e, original, _i, _len, _results;
      bindings = atom.keymaps.findKeyBindings({
        command: eventName
      });
      _results = [];
      for (_i = 0, _len = bindings.length; _i < _len; _i++) {
        e = bindings[_i];
        original = element.text();
        _results.push(element.text(_.humanizeKeystroke(e.keystrokes) + (" " + original)));
      }
      return _results;
    };

    return CoveringView;

  })(View);

  module.exports = {
    CoveringView: CoveringView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvbWVyZ2UtY29uZmxpY3RzL2xpYi92aWV3L2NvdmVyaW5nLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLE9BQVksT0FBQSxDQUFRLFdBQVIsQ0FBWixFQUFDLFlBQUEsSUFBRCxFQUFPLFNBQUEsQ0FEUCxDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFLTTtBQUVKLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwyQkFBQSxVQUFBLEdBQVksU0FBRSxNQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxTQUFBLE1BQ1osQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxHQUFBLENBQUEsbUJBQWIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsTUFBTSxDQUFDLGNBQVIsQ0FBdUIsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUF2QixFQUNUO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsSUFBQSxFQUFNLElBRE47QUFBQSxRQUVBLFFBQUEsRUFBVSxNQUZWO09BRFMsQ0FEWCxDQUFBO2FBTUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLENBQWUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxZQUFSLENBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckIsQ0FBZixFQVBVO0lBQUEsQ0FBWixDQUFBOztBQUFBLDJCQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGFBQUE7QUFBQSxNQUFBLGFBQUEsR0FBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxvQkFBUixDQUFBLENBQUgsR0FDWixJQUFDLENBQUEsTUFBTSxDQUFDLHlCQUFSLENBQUEsQ0FEWSxHQUdaLENBSEosQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFTLENBQUMsR0FBVixDQUFjO0FBQUEsUUFBQSxLQUFBLEVBQU8sYUFBUDtPQUFkLENBTEEsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsWUFBQSxFQUFjLENBQUEsSUFBRSxDQUFBLE1BQU0sQ0FBQyxxQkFBUixDQUFBLENBQWY7T0FBTCxDQVBBLENBQUE7YUFRQSxJQUFDLENBQUEsTUFBRCxDQUFRLElBQUMsQ0FBQSxNQUFNLENBQUMscUJBQVIsQ0FBQSxDQUFSLEVBVFE7SUFBQSxDQVRWLENBQUE7O0FBQUEsMkJBb0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxVQUFBLEtBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsT0FBWCxDQUFBLENBQUEsQ0FBQTs7YUFFUSxDQUFFLE9BQVYsQ0FBQTtPQUZBO2FBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUpKO0lBQUEsQ0FwQlQsQ0FBQTs7QUFBQSwyQkEyQkEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQTNCUCxDQUFBOztBQUFBLDJCQThCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBOUJWLENBQUE7O0FBQUEsMkJBZ0NBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFBRyxNQUFIO0lBQUEsQ0FoQ1QsQ0FBQTs7QUFBQSwyQkFtQ0EsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQW5DYixDQUFBOztBQUFBLDJCQXNDQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBdENWLENBQUE7O0FBQUEsMkJBd0NBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0F4Q1YsQ0FBQTs7QUFBQSwyQkEwQ0EsTUFBQSxHQUFRLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixDQUFBLEVBQUg7SUFBQSxDQTFDUixDQUFBOztBQUFBLDJCQTRDQSxjQUFBLEdBQWdCLFNBQUMsTUFBRCxHQUFBO2FBQVksTUFBWjtJQUFBLENBNUNoQixDQUFBOztBQUFBLDJCQThDQSxZQUFBLEdBQWMsU0FBQyxNQUFELEdBQUE7QUFDWixNQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLFFBQUQsQ0FBVCxDQUFpQixNQUFNLENBQUMsY0FBUCxDQUFBLENBQWpCLENBQUEsQ0FBQTthQUNBLE1BQU0sQ0FBQyxPQUFQLENBQUEsRUFGWTtJQUFBLENBOUNkLENBQUE7O0FBQUEsMkJBa0RBLFFBQUEsR0FBVSxTQUFDLGNBQUQsR0FBQTtBQUNSLE1BQUEsSUFBa0Qsc0JBQWxEO2VBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyx1QkFBUixDQUFnQyxjQUFoQyxFQUFBO09BRFE7SUFBQSxDQWxEVixDQUFBOztBQUFBLDJCQXFEQSxnQkFBQSxHQUFrQixTQUFDLFNBQUQsRUFBWSxPQUFaLEdBQUE7QUFDaEIsVUFBQSx5Q0FBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBYixDQUE2QjtBQUFBLFFBQUEsT0FBQSxFQUFTLFNBQVQ7T0FBN0IsQ0FBWCxDQUFBO0FBRUE7V0FBQSwrQ0FBQTt5QkFBQTtBQUNFLFFBQUEsUUFBQSxHQUFXLE9BQU8sQ0FBQyxJQUFSLENBQUEsQ0FBWCxDQUFBO0FBQUEsc0JBQ0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxDQUFDLENBQUMsaUJBQUYsQ0FBb0IsQ0FBQyxDQUFDLFVBQXRCLENBQUEsR0FBb0MsQ0FBQyxHQUFBLEdBQUcsUUFBSixDQUFqRCxFQURBLENBREY7QUFBQTtzQkFIZ0I7SUFBQSxDQXJEbEIsQ0FBQTs7d0JBQUE7O0tBRnlCLEtBTDNCLENBQUE7O0FBQUEsRUFtRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsWUFBQSxFQUFjLFlBQWQ7R0FwRUYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/nate/.atom/packages/merge-conflicts/lib/view/covering-view.coffee