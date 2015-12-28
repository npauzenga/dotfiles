(function() {
  var BufferedProcess, ShellRunner,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  BufferedProcess = require('./buffered-process');

  module.exports = ShellRunner = (function() {
    ShellRunner.prototype.processor = BufferedProcess;

    function ShellRunner(params) {
      this.stderr = __bind(this.stderr, this);
      this.stdout = __bind(this.stdout, this);
      this.initialize(params);
    }

    ShellRunner.prototype.initialize = function(params) {
      this.params = params || (function() {
        throw "Missing ::params argument";
      })();
      this.write = params.write || (function() {
        throw "Missing ::write parameter";
      })();
      this.exit = params.exit || (function() {
        throw "Missing ::exit parameter";
      })();
      this.command = params.command || (function() {
        throw "Missing ::command parameter";
      })();
      return this.currentShell = params.currentShell || (function() {
        throw "Missing ::currentShell parameter";
      })();
    };

    ShellRunner.prototype.run = function() {
      return this.process = this.newProcess(this.fullCommand());
    };

    ShellRunner.prototype.fullCommand = function() {
      return this._joinAnd("cd " + (this.escape(this.params.cwd())), "" + (this.params.command()) + "; exit\n");
    };

    ShellRunner.prototype.escape = function(str) {
      var ch, charsToEscape, out, _i, _len;
      charsToEscape = "\\ \t\"'$()[]<>&|*;~`#";
      out = '';
      for (_i = 0, _len = str.length; _i < _len; _i++) {
        ch = str[_i];
        if (charsToEscape.indexOf(ch) >= 0) {
          out += '\\' + ch;
        } else {
          out += ch;
        }
      }
      return out;
    };

    ShellRunner.prototype.kill = function() {
      if (this.process != null) {
        return this.process.kill('SIGKILL');
      }
    };

    ShellRunner.prototype.stdout = function(output) {
      return this.params.write(output);
    };

    ShellRunner.prototype.stderr = function(output) {
      return this.params.write(output);
    };

    ShellRunner.prototype.newProcess = function(testCommand) {
      var args, command, options, outputCharacters, params, process;
      command = this.currentShell;
      args = ['-l', '-c', testCommand];
      options = {
        cwd: this.params.cwd
      };
      console.log("ruby-test: Running test: command=", command, ", args=", args, ", cwd=", this.params.cwd());
      params = {
        command: command,
        args: args,
        options: options,
        stdout: this.stdout,
        stderr: this.stderr,
        exit: this.exit
      };
      outputCharacters = true;
      process = new this.processor(params, outputCharacters);
      return process;
    };

    ShellRunner.prototype._joinAnd = function() {
      var commands, joiner;
      commands = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      joiner = /fish/.test(this.currentShell) ? '; and ' : ' && ';
      return commands.join(joiner);
    };

    return ShellRunner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9zaGVsbC1ydW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7c0JBQUE7O0FBQUEsRUFBQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxvQkFBUixDQUFsQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDUTtBQUNKLDBCQUFBLFNBQUEsR0FBVyxlQUFYLENBQUE7O0FBRWEsSUFBQSxxQkFBQyxNQUFELEdBQUE7QUFDWCw2Q0FBQSxDQUFBO0FBQUEsNkNBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxNQUFaLENBQUEsQ0FEVztJQUFBLENBRmI7O0FBQUEsMEJBS0EsVUFBQSxHQUFZLFNBQUMsTUFBRCxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQUE7QUFBVSxjQUFNLDJCQUFOO1VBQXBCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTSxDQUFDLEtBQVA7QUFBZ0IsY0FBTSwyQkFBTjtVQUR6QixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLE1BQU0sQ0FBQyxJQUFQO0FBQWUsY0FBTSwwQkFBTjtVQUZ2QixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsT0FBRCxHQUFXLE1BQU0sQ0FBQyxPQUFQO0FBQWtCLGNBQU0sNkJBQU47VUFIN0IsQ0FBQTthQUlBLElBQUMsQ0FBQSxZQUFELEdBQWdCLE1BQU0sQ0FBQyxZQUFQO0FBQXVCLGNBQU0sa0NBQU47V0FMN0I7SUFBQSxDQUxaLENBQUE7O0FBQUEsMEJBWUEsR0FBQSxHQUFLLFNBQUEsR0FBQTthQUNILElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJ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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/shell-runner.coffee
