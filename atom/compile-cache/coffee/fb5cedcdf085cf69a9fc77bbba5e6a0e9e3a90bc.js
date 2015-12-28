(function() {
  var $, ResizeHandle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('atom-space-pen-views').$;

  module.exports = ResizeHandle = (function() {
    function ResizeHandle(view) {
      this.resizeStopped = __bind(this.resizeStopped, this);
      this.resizeStarted = __bind(this.resizeStarted, this);
      this.resizeTreeView = __bind(this.resizeTreeView, this);
      this.resizeToFitContent = __bind(this.resizeToFitContent, this);
      this.view = view;
      this.view.on('dblclick', '.ruby-test-resize-handle', this.resizeToFitContent);
      this.view.on('mousedown', '.ruby-test-resize-handle', this.resizeStarted);
      this.panelBody = this.view.find('.panel-body');
      this.resultsEl = this.view.results;
    }

    ResizeHandle.prototype.resizeToFitContent = function() {
      this.panelBody.height(1);
      return this.panelBody.height(Math.max(this.resultsEl.outerHeight(), 40));
    };

    ResizeHandle.prototype.resizeTreeView = function(_arg) {
      var statusBarHeight, testBarHeight, workspaceHeight;
      workspaceHeight = $('.workspace').outerHeight();
      statusBarHeight = $('.status-bar').outerHeight();
      testBarHeight = $('.ruby-test .panel-heading').outerHeight();
      return this.panelBody.height(workspaceHeight - _arg.pageY - statusBarHeight - testBarHeight - 28);
    };

    ResizeHandle.prototype.resizeStarted = function() {
      $(document.body).on('mousemove', this.resizeTreeView);
      return $(document.body).on('mouseup', this.resizeStopped);
    };

    ResizeHandle.prototype.resizeStopped = function() {
      $(document.body).off('mousemove', this.resizeTreeView);
      return $(document.body).off('mouseup', this.resizeStopped);
    };

    return ResizeHandle;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9yZXNpemUtaGFuZGxlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxlQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxzQkFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ1E7QUFDUyxJQUFBLHNCQUFDLElBQUQsR0FBQTtBQUNYLDJEQUFBLENBQUE7QUFBQSwyREFBQSxDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLHFFQUFBLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBUixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLEVBQU4sQ0FBUyxVQUFULEVBQXFCLDBCQUFyQixFQUFpRCxJQUFDLENBQUEsa0JBQWxELENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLElBQUksQ0FBQyxFQUFOLENBQVMsV0FBVCxFQUFzQiwwQkFBdEIsRUFBa0QsSUFBQyxDQUFBLGFBQW5ELENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxhQUFYLENBSGIsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsSUFBSSxDQUFDLE9BSm5CLENBRFc7SUFBQSxDQUFiOztBQUFBLDJCQU9BLGtCQUFBLEdBQW9CLFNBQUEsR0FBQTtBQUNsQixNQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxDQUFrQixDQUFsQixDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsQ0FBa0IsSUFBSSxDQUFDLEdBQUwsQ0FBUyxJQUFDLENBQUEsU0FBUyxDQUFDLFdBQVgsQ0FBQSxDQUFULEVBQW1DLEVBQW5DLENBQWxCLEVBRmtCO0lBQUEsQ0FQcEIsQ0FBQTs7QUFBQSwyQkFXQSxjQUFBLEdBQWdCLFNBQUMsSUFBRCxHQUFBO0FBQ2QsVUFBQSwrQ0FBQTtBQUFBLE1BQUEsZUFBQSxHQUFrQixDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFsQixDQUFBO0FBQUEsTUFDQSxlQUFBLEdBQWtCLENBQUEsQ0FBRSxhQUFGLENBQWdCLENBQUMsV0FBakIsQ0FBQSxDQURsQixDQUFBO0FBQUEsTUFFQSxhQUFBLEdBQWdCLENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLFdBQS9CLENBQUEsQ0FGaEIsQ0FBQTthQUdBLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxDQUFrQixlQUFBLEdBQWtCLElBQUksQ0FBQyxLQUF2QixHQUErQixlQUEvQixHQUFpRCxhQUFqRCxHQUFpRSxFQUFuRixFQUpjO0lBQUEsQ0FYaEIsQ0FBQTs7QUFBQSwyQkFpQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFYLENBQWdCLENBQUMsRUFBakIsQ0FBb0IsV0FBcEIsRUFBaUMsSUFBQyxDQUFBLGNBQWxDLENBQUEsQ0FBQTthQUNBLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBWCxDQUFnQixDQUFDLEVBQWpCLENBQW9CLFNBQXBCLEVBQStCLElBQUMsQ0FBQSxhQUFoQyxFQUZhO0lBQUEsQ0FqQmYsQ0FBQTs7QUFBQSwyQkFxQkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLE1BQUEsQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFYLENBQWdCLENBQUMsR0FBakIsQ0FBcUIsV0FBckIsRUFBa0MsSUFBQyxDQUFBLGNBQW5DLENBQUEsQ0FBQTthQUNBLENBQUEsQ0FBRSxRQUFRLENBQUMsSUFBWCxDQUFnQixDQUFDLEdBQWpCLENBQXFCLFNBQXJCLEVBQWdDLElBQUMsQ0FBQSxhQUFqQyxFQUZhO0lBQUEsQ0FyQmYsQ0FBQTs7d0JBQUE7O01BSkosQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/resize-handle.coffee
