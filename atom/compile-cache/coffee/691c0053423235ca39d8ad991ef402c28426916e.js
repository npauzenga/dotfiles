(function() {
  var Utility;

  module.exports = Utility = (function() {
    function Utility() {}

    Utility.prototype.saveFile = function() {
      if (this.filePath()) {
        return this.editor().save();
      }
    };

    Utility.prototype.filePath = function() {
      return this.editor() && this.editor().buffer && this.editor().buffer.file && this.editor().buffer.file.path;
    };

    Utility.prototype.editor = function() {
      return atom.workspace.getActiveTextEditor();
    };

    return Utility;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi91dGlsaXR5LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxPQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTt5QkFDSjs7QUFBQSxzQkFBQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFvQixJQUFDLENBQUEsUUFBRCxDQUFBLENBQXBCO2VBQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFTLENBQUMsSUFBVixDQUFBLEVBQUE7T0FEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSxzQkFHQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLElBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFTLENBQUMsTUFEWixJQUVFLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUZuQixJQUdFLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FKaEI7SUFBQSxDQUhWLENBQUE7O0FBQUEsc0JBU0EsTUFBQSxHQUFRLFNBQUEsR0FBQTthQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQWYsQ0FBQSxFQURNO0lBQUEsQ0FUUixDQUFBOzttQkFBQTs7TUFGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/utility.coffee
