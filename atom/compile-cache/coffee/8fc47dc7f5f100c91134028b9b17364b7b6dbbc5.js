(function() {
  var basename, exec, filenameMap, grammarMap, platform, plugin;

  basename = require('path').basename;

  exec = require('child_process').exec;

  platform = require('process').platform;

  grammarMap = require('./grammar-map');

  filenameMap = require('./filename-map');

  plugin = module.exports = {
    config: {
      grammars: {
        type: 'object',
        properties: {}
      },
      filenames: {
        type: 'object',
        properties: {}
      }
    },
    exec: exec,
    activate: function() {
      return atom.commands.add('atom-text-editor', {
        'dash:shortcut': (function(_this) {
          return function() {
            return _this.shortcut(true);
          };
        })(this),
        'dash:shortcut-alt': (function(_this) {
          return function() {
            return _this.shortcut(false);
          };
        })(this),
        'dash:context-menu': (function(_this) {
          return function() {
            return _this.shortcut(true);
          };
        })(this)
      });
    },
    shortcut: function(sensitive) {
      var currentScope, cursor, displayBufferRange, editor, range, scopes, selection, text;
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }
      selection = editor.getLastSelection().getText();
      if (selection) {
        return plugin.search(selection, sensitive);
      }
      cursor = editor.getLastCursor();
      scopes = cursor.getScopeDescriptor().getScopesArray();
      currentScope = scopes[scopes.length - 1];
      if (scopes.length < 2 || /^(?:comment|string|meta|markup)(?:\.|$)/.test(currentScope)) {
        return plugin.search(editor.getWordUnderCursor(), sensitive);
      }
      displayBufferRange = editor.displayBuffer.bufferRangeForScopeAtPosition(currentScope, cursor.getScreenPosition());
      if (displayBufferRange) {
        range = editor.displayBuffer.bufferRangeForScreenRange(displayBufferRange);
        text = editor.getTextInBufferRange(range);
      } else {
        text = editor.getWordUnderCursor();
      }
      return plugin.search(text, sensitive);
    },
    search: function(string, sensitive, cb) {
      var activeEditor, cmd, language, path;
      activeEditor = atom.workspace.getActiveTextEditor();
      if (sensitive && activeEditor) {
        path = activeEditor.getPath();
        language = activeEditor.getGrammar().name;
      }
      cmd = this.getCommand(string, path, language);
      return plugin.exec(cmd, cb);
    },
    getCommand: function(string, path, language) {
      if (platform === 'win32') {
        return 'cmd.exe /c start "" "' + this.getDashURI(string, path, language) + '"';
      }
      if (platform === 'linux') {
        return this.getZealCommand(string, path, language);
      }
      return 'open -g "' + this.getDashURI(string, path, language) + '"';
    },
    getKeywordString: function(path, language) {
      var filename, filenameConfig, grammarConfig, keys;
      keys = [];
      if (path) {
        filename = basename(path).toLowerCase();
        filenameConfig = atom.config.get('dash.filenames') || {};
        keys = keys.concat(filenameConfig[filename] || filenameMap[filename] || []);
      }
      if (language) {
        grammarConfig = atom.config.get('dash.grammars') || {};
        keys = keys.concat(grammarConfig[language] || grammarMap[language] || []);
      }
      if (keys.length) {
        return keys.map(encodeURIComponent).join(',');
      }
    },
    getDashURI: function(string, path, language) {
      var keywords, link;
      link = 'dash-plugin://query=' + encodeURIComponent(string);
      keywords = this.getKeywordString(path, language);
      if (keywords) {
        link += '&keys=' + keywords;
      }
      return link;
    },
    getZealCommand: function(string, path, language) {
      var keywords, query;
      query = string;
      keywords = this.getKeywordString(path, language);
      if (keywords) {
        query = keywords + ':' + query;
      }
      return 'zeal --query "' + query + '"';
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvZGFzaC9saWIvZGFzaC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseURBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLE1BQVIsQ0FBZSxDQUFDLFFBQTNCLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxJQURoQyxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxTQUFSLENBQWtCLENBQUMsUUFGOUIsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUhiLENBQUE7O0FBQUEsRUFJQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBSmQsQ0FBQTs7QUFBQSxFQU1BLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxHQUdQO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFVBQUEsRUFBWSxFQURaO09BREY7QUFBQSxNQUdBLFNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFVBQUEsRUFBWSxFQURaO09BSkY7S0FERjtBQUFBLElBU0EsSUFBQSxFQUFNLElBVE47QUFBQSxJQVdBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDO0FBQUEsUUFDcEMsZUFBQSxFQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBTSxLQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBTjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRG1CO0FB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

//# sourceURL=/Users/nate/.atom/packages/dash/lib/dash.coffee
