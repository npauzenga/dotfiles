(function() {
  var ResizeHandle, RubyTestView;

  ResizeHandle = require('../lib/resize-handle');

  RubyTestView = require('../lib/ruby-test-view');

  describe("ResizeHandle", function() {
    var activationPromise;
    activationPromise = null;
    beforeEach(function() {
      this.view = new RubyTestView;
      return this.resize = new ResizeHandle(this.view);
    });
    return describe("when the resize handle is double clicked", function() {
      beforeEach(function() {
        this.view.showPanel();
        this.panelBody = this.view.find('.panel-body');
        return this.panelBody.height(10);
      });
      return it("sets the height of the panel to be the height of the content", function() {
        this.view.results.text("line1\nline2\nline3\nline4");
        this.view.find('.ruby-test-resize-handle').trigger('dblclick');
        expect(this.panelBody.height()).toBeGreaterThan(10);
        this.panelBody.height(1000);
        this.view.find('.ruby-test-resize-handle').trigger('dblclick');
        return expect(this.view.height()).toBeLessThan(1000);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L3NwZWMvcmVzaXplLWhhbmRsZS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQkFBQTs7QUFBQSxFQUFBLFlBQUEsR0FBZSxPQUFBLENBQVEsc0JBQVIsQ0FBZixDQUFBOztBQUFBLEVBQ0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSx1QkFBUixDQURmLENBQUE7O0FBQUEsRUFHQSxRQUFBLENBQVMsY0FBVCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsUUFBQSxpQkFBQTtBQUFBLElBQUEsaUJBQUEsR0FBb0IsSUFBcEIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxHQUFBLENBQUEsWUFBUixDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBYyxJQUFBLFlBQUEsQ0FBYSxJQUFDLENBQUEsSUFBZCxFQUZMO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsMENBQVQsRUFBcUQsU0FBQSxHQUFBO0FBQ25ELE1BQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFFBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFOLENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLGFBQVgsQ0FEYixDQUFBO2VBRUEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQWtCLEVBQWxCLEVBSFM7TUFBQSxDQUFYLENBQUEsQ0FBQTthQUtBLEVBQUEsQ0FBRyw4REFBSCxFQUFtRSxTQUFBLEdBQUE7QUFDakUsUUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFkLENBQW1CLDRCQUFuQixDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLDBCQUFYLENBQXNDLENBQUMsT0FBdkMsQ0FBK0MsVUFBL0MsQ0FEQSxDQUFBO0FBQUEsUUFFQSxNQUFBLENBQU8sSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQUEsQ0FBUCxDQUEyQixDQUFDLGVBQTVCLENBQTRDLEVBQTVDLENBRkEsQ0FBQTtBQUFBLFFBR0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLENBQWtCLElBQWxCLENBSEEsQ0FBQTtBQUFBLFFBSUEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLENBQVcsMEJBQVgsQ0FBc0MsQ0FBQyxPQUF2QyxDQUErQyxVQUEvQyxDQUpBLENBQUE7ZUFLQSxNQUFBLENBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLENBQUEsQ0FBUCxDQUFzQixDQUFDLFlBQXZCLENBQW9DLElBQXBDLEVBTmlFO01BQUEsQ0FBbkUsRUFObUQ7SUFBQSxDQUFyRCxFQVB1QjtFQUFBLENBQXpCLENBSEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/nate/.atom/packages/ruby-test/spec/resize-handle-spec.coffee
