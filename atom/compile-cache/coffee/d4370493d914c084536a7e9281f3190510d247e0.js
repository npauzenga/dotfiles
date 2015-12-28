(function() {
  var BufferedProcess, ChildProcess, _;

  _ = require('underscore-plus');

  ChildProcess = require('child_process');

  module.exports = BufferedProcess = (function() {
    function BufferedProcess(_arg, outputCharacters) {
      var args, cmdArgs, cmdOptions, command, exit, exitCode, options, processExited, stderr, stderrClosed, stdout, stdoutClosed, triggerExitCallback, _ref;
      _ref = _arg != null ? _arg : {}, command = _ref.command, args = _ref.args, options = _ref.options, stdout = _ref.stdout, stderr = _ref.stderr, exit = _ref.exit;
      if (outputCharacters == null) {
        outputCharacters = false;
      }
      if (options == null) {
        options = {};
      }
      if (process.platform === "win32") {
        if (args != null) {
          cmdArgs = args.map(function(arg) {
            if ((command === 'explorer.exe' || command === 'explorer') && /^\/[a-zA-Z]+,.*$/.test(arg)) {
              return arg;
            } else {
              return "\"" + (arg.replace(/"/g, '\\"')) + "\"";
            }
          });
        } else {
          cmdArgs = [];
        }
        if (/\s/.test(command)) {
          cmdArgs.unshift("\"" + command + "\"");
        } else {
          cmdArgs.unshift(command);
        }
        cmdArgs = ['/s', '/c', "\"" + (cmdArgs.join(' ')) + "\""];
        cmdOptions = _.clone(options);
        cmdOptions.windowsVerbatimArguments = true;
        this.process = ChildProcess.spawn(process.env.comspec || 'cmd.exe', cmdArgs, cmdOptions);
      } else {
        this.process = ChildProcess.spawn(command, args, options);
      }
      this.killed = false;
      stdoutClosed = true;
      stderrClosed = true;
      processExited = true;
      exitCode = 0;
      triggerExitCallback = function() {
        if (this.killed) {
          return;
        }
        if (stdoutClosed && stderrClosed && processExited) {
          return typeof exit === "function" ? exit(exitCode) : void 0;
        }
      };
      if (stdout) {
        stdoutClosed = false;
        this.bufferStream(this.process.stdout, stdout, outputCharacters, function() {
          stdoutClosed = true;
          return triggerExitCallback();
        });
      }
      if (stderr) {
        stderrClosed = false;
        this.bufferStream(this.process.stderr, stderr, outputCharacters, function() {
          stderrClosed = true;
          return triggerExitCallback();
        });
      }
      if (exit) {
        processExited = false;
        this.process.on('exit', function(code) {
          exitCode = code;
          processExited = true;
          return triggerExitCallback();
        });
      }
    }

    BufferedProcess.prototype.bufferStream = function(stream, onLines, outputCharacters, onDone) {
      var buffered;
      stream.setEncoding('utf8');
      buffered = '';
      stream.on('data', (function(_this) {
        return function(data) {
          var lastNewlineIndex;
          if (_this.killed) {
            return;
          }
          if (!outputCharacters) {
            buffered += data;
            lastNewlineIndex = buffered.lastIndexOf('\n');
            if (lastNewlineIndex !== -1) {
              onLines(buffered.substring(0, lastNewlineIndex + 1));
              return buffered = buffered.substring(lastNewlineIndex + 1);
            }
          } else {
            return onLines(data);
          }
        };
      })(this));
      return stream.on('close', (function(_this) {
        return function() {
          if (_this.killed) {
            return;
          }
          if (buffered.length > 0) {
            onLines(buffered);
          }
          return onDone();
        };
      })(this));
    };

    BufferedProcess.prototype.killOnWindows = function() {
      var args, cmd, output, parentPid, wmicProcess;
      parentPid = this.process.pid;
      cmd = 'wmic';
      args = ['process', 'where', "(ParentProcessId=" + parentPid + ")", 'get', 'processid'];
      wmicProcess = ChildProcess.spawn(cmd, args);
      wmicProcess.on('error', function() {});
      output = '';
      wmicProcess.stdout.on('data', function(data) {
        return output += data;
      });
      return wmicProcess.stdout.on('close', (function(_this) {
        return function() {
          var pid, pidsToKill, _i, _len;
          pidsToKill = output.split(/\s+/).filter(function(pid) {
            return /^\d+$/.test(pid);
          }).map(function(pid) {
            return parseInt(pid);
          }).filter(function(pid) {
            return pid !== parentPid && (0 < pid && pid < Infinity);
          });
          for (_i = 0, _len = pidsToKill.length; _i < _len; _i++) {
            pid = pidsToKill[_i];
            try {
              process.kill(pid);
            } catch (_error) {}
          }
          return _this.killProcess();
        };
      })(this));
    };

    BufferedProcess.prototype.killProcess = function() {
      var _ref;
      if ((_ref = this.process) != null) {
        _ref.kill();
      }
      return this.process = null;
    };

    BufferedProcess.prototype.kill = function() {
      if (this.killed) {
        return;
      }
      this.killed = true;
      if (process.platform === 'win32') {
        this.killOnWindows();
      } else {
        this.killProcess();
      }
      return void 0;
    };

    return BufferedProcess;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvcnVieS10ZXN0L2xpYi9idWZmZXJlZC1wcm9jZXNzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxlQUFSLENBRGYsQ0FBQTs7QUFBQSxFQWlCQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBc0JTLElBQUEseUJBQUMsSUFBRCxFQUFvRCxnQkFBcEQsR0FBQTtBQUNYLFVBQUEsaUpBQUE7QUFBQSw0QkFEWSxPQUErQyxJQUE5QyxlQUFBLFNBQVMsWUFBQSxNQUFNLGVBQUEsU0FBUyxjQUFBLFFBQVEsY0FBQSxRQUFRLFlBQUEsSUFDckQsQ0FBQTs7UUFEK0QsbUJBQWlCO09BQ2hGOztRQUFBLFVBQVc7T0FBWDtBQUVBLE1BQUEsSUFBRyxPQUFPLENBQUMsUUFBUixLQUFvQixPQUF2QjtBQUVFLFFBQUEsSUFBRyxZQUFIO0FBQ0UsVUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLEdBQUwsQ0FBUyxTQUFDLEdBQUQsR0FBQTtBQUNqQixZQUFBLElBQUcsQ0FBQSxPQUFBLEtBQVksY0FBWixJQUFBLE9BQUEsS0FBNEIsVUFBNUIsQ0FBQSxJQUE0QyxrQkFBa0IsQ0FBQyxJQUFuQixDQUF3QixHQUF4QixDQUEvQztxQkFHRSxJQUhGO2FBQUEsTUFBQTtxQkFLRyxJQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBSixDQUFZLElBQVosRUFBa0IsS0FBbEIsQ0FBRCxDQUFILEdBQTZCLEtBTGhDO2FBRGlCO1VBQUEsQ0FBVCxDQUFWLENBREY7U0FBQSxNQUFBO0FBU0UsVUFBQSxPQUFBLEdBQVUsRUFBVixDQVRGO1NBQUE7QUFVQSxR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

//# sourceURL=/Users/nate/.atom/packages/ruby-test/lib/buffered-process.coffee
