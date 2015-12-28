(function() {
  var dash;

  dash = require('../lib/dash');

  describe("dash", function() {
    return it("should open dash", function() {
      return waitsForPromise(function() {
        return atom.workspace.open('test.hs').then(function(editor) {
          var view;
          view = atom.views.getView(editor);
          editor.setCursorBufferPosition({
            row: 1,
            column: 6
          });
          return new Promise(function(resolve, reject) {
            dash.exec = function(cmd) {
              expect(cmd).toEqual('open -g "dash-plugin://query=.SetFlags"');
              return resolve();
            };
            return dash.shortcut(true);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvZGFzaC9zcGVjL2Rhc2gtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsSUFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsYUFBUixDQUFQLENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsTUFBVCxFQUFpQixTQUFBLEdBQUE7V0FDZixFQUFBLENBQUcsa0JBQUgsRUFBdUIsU0FBQSxHQUFBO2FBQ3JCLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLFNBQXBCLENBQThCLENBQUMsSUFBL0IsQ0FBb0MsU0FBQyxNQUFELEdBQUE7QUFDbEMsY0FBQSxJQUFBO0FBQUEsVUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLE1BQW5CLENBQVAsQ0FBQTtBQUFBLFVBRUEsTUFBTSxDQUFDLHVCQUFQLENBQStCO0FBQUEsWUFBRSxHQUFBLEVBQUssQ0FBUDtBQUFBLFlBQVUsTUFBQSxFQUFRLENBQWxCO1dBQS9CLENBRkEsQ0FBQTtpQkFJSSxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWLEdBQUE7QUFDVixZQUFBLElBQUksQ0FBQyxJQUFMLEdBQVksU0FBQyxHQUFELEdBQUE7QUFDVixjQUFBLE1BQUEsQ0FBTyxHQUFQLENBQVcsQ0FBQyxPQUFaLENBQW9CLHlDQUFwQixDQUFBLENBQUE7cUJBQ0EsT0FBQSxDQUFBLEVBRlU7WUFBQSxDQUFaLENBQUE7bUJBSUEsSUFBSSxDQUFDLFFBQUwsQ0FBYyxJQUFkLEVBTFU7VUFBQSxDQUFSLEVBTDhCO1FBQUEsQ0FBcEMsRUFEYztNQUFBLENBQWhCLEVBRHFCO0lBQUEsQ0FBdkIsRUFEZTtFQUFBLENBQWpCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/nate/.atom/packages/dash/spec/dash-spec.coffee
