(function() {
  var Utility;

  Utility = require('../lib/utility');

  describe("Utility", function() {
    return describe("::saveFile", function() {
      var makeEditor;
      makeEditor = function(opts) {
        var editor;
        editor = {
          save: null,
          buffer: {
            file: {
              path: opts.path
            }
          }
        };
        spyOn(editor, 'save');
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
        return editor;
      };
      it("calls save() on the active editor file", function() {
        var editor, util;
        editor = makeEditor({
          path: 'foo/bar.rb'
        });
        util = new Utility;
        util.saveFile();
        return expect(editor.save).toHaveBeenCalled();
      });
      return it("does not call save() when there is no file path", function() {
        var editor, util;
        editor = makeEditor({
          path: null
        });
        util = new Utility;
        util.saveFile();
        return expect(editor.save).not.toHaveBeenCalled();
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvdXRpbGl0eS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxPQUFBOztBQUFBLEVBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxnQkFBUixDQUFWLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsU0FBVCxFQUFvQixTQUFBLEdBQUE7V0FDbEIsUUFBQSxDQUFTLFlBQVQsRUFBdUIsU0FBQSxHQUFBO0FBQ3JCLFVBQUEsVUFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1gsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVM7QUFBQSxVQUNQLElBQUEsRUFBTSxJQURDO0FBQUEsVUFFUCxNQUFBLEVBQVE7QUFBQSxZQUFDLElBQUEsRUFBTTtBQUFBLGNBQUMsSUFBQSxFQUFNLElBQUksQ0FBQyxJQUFaO2FBQVA7V0FGRDtTQUFULENBQUE7QUFBQSxRQUlBLEtBQUEsQ0FBTSxNQUFOLEVBQWMsTUFBZCxDQUpBLENBQUE7QUFBQSxRQUtBLEtBQUEsQ0FBTSxJQUFJLENBQUMsU0FBWCxFQUFzQixxQkFBdEIsQ0FBNEMsQ0FBQyxTQUE3QyxDQUF1RCxNQUF2RCxDQUxBLENBQUE7ZUFNQSxPQVBXO01BQUEsQ0FBYixDQUFBO0FBQUEsTUFTQSxFQUFBLENBQUcsd0NBQUgsRUFBNkMsU0FBQSxHQUFBO0FBQzNDLFlBQUEsWUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLFVBQUEsQ0FBVztBQUFBLFVBQUEsSUFBQSxFQUFNLFlBQU47U0FBWCxDQUFULENBQUE7QUFBQSxRQUVBLElBQUEsR0FBTyxHQUFBLENBQUEsT0FGUCxDQUFBO0FBQUEsUUFHQSxJQUFJLENBQUMsUUFBTCxDQUFBLENBSEEsQ0FBQTtlQUtBLE1BQUEsQ0FBTyxNQUFNLENBQUMsSUFBZCxDQUFtQixDQUFDLGdCQUFwQixDQUFBLEVBTjJDO01BQUEsQ0FBN0MsQ0FUQSxDQUFBO2FBaUJBLEVBQUEsQ0FBRyxpREFBSCxFQUFzRCxTQUFBLEdBQUE7QUFDcEQsWUFBQSxZQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsVUFBQSxDQUFXO0FBQUEsVUFBQSxJQUFBLEVBQU0sSUFBTjtTQUFYLENBQVQsQ0FBQTtBQUFBLFFBRUEsSUFBQSxHQUFPLEdBQUEsQ0FBQSxPQUZQLENBQUE7QUFBQSxRQUdBLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FIQSxDQUFBO2VBS0EsTUFBQSxDQUFPLE1BQU0sQ0FBQyxJQUFkLENBQW1CLENBQUMsR0FBRyxDQUFDLGdCQUF4QixDQUFBLEVBTm9EO01BQUEsQ0FBdEQsRUFsQnFCO0lBQUEsQ0FBdkIsRUFEa0I7RUFBQSxDQUFwQixDQUZBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/utility-spec.coffee
