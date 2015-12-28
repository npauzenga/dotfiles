(function() {
  var RubyTest;

  RubyTest = require('../lib/ruby-test');

  describe("RubyTest", function() {
    var activationPromise, workspaceElement;
    activationPromise = null;
    workspaceElement = null;
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('ruby-test');
    });
    return describe("when the ruby-test:toggle event is triggered", function() {
      return it("attaches and then detaches the view", function() {
        expect(workspaceElement.querySelector('.ruby-test')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ruby-test:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          expect(workspaceElement.querySelector('.ruby-test')).toExist();
          atom.commands.dispatch(workspaceElement, 'ruby-test:toggle');
          return expect(workspaceElement.querySelector('.ruby-test')).not.toExist();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvcnVieS10ZXN0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFFBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGtCQUFSLENBQVgsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTtBQUNuQixRQUFBLG1DQUFBO0FBQUEsSUFBQSxpQkFBQSxHQUFvQixJQUFwQixDQUFBO0FBQUEsSUFDQSxnQkFBQSxHQUFtQixJQURuQixDQUFBO0FBQUEsSUFHQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsV0FBOUIsRUFGWDtJQUFBLENBQVgsQ0FIQSxDQUFBO1dBT0EsUUFBQSxDQUFTLDhDQUFULEVBQXlELFNBQUEsR0FBQTthQUN2RCxFQUFBLENBQUcscUNBQUgsRUFBMEMsU0FBQSxHQUFBO0FBQ3hDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLFlBQS9CLENBQVAsQ0FBb0QsQ0FBQyxHQUFHLENBQUMsT0FBekQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsa0JBQXpDLENBSkEsQ0FBQTtBQUFBLFFBTUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsWUFBL0IsQ0FBUCxDQUFvRCxDQUFDLE9BQXJELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGtCQUF6QyxDQURBLENBQUE7aUJBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLFlBQS9CLENBQVAsQ0FBb0QsQ0FBQyxHQUFHLENBQUMsT0FBekQsQ0FBQSxFQUhHO1FBQUEsQ0FBTCxFQVZ3QztNQUFBLENBQTFDLEVBRHVEO0lBQUEsQ0FBekQsRUFSbUI7RUFBQSxDQUFyQixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/ruby-test-spec.coffee
