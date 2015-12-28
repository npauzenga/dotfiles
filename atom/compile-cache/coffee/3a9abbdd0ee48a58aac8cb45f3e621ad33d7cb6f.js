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
            return _this.shortcut(true, false);
          };
        })(this),
        'dash:shortcut-background': (function(_this) {
          return function() {
            return _this.shortcut(true, true);
          };
        })(this),
        'dash:shortcut-alt': (function(_this) {
          return function() {
            return _this.shortcut(false, false);
          };
        })(this),
        'dash:shortcut-alt-background': (function(_this) {
          return function() {
            return _this.shortcut(false, true);
          };
        })(this),
        'dash:context-menu': (function(_this) {
          return function() {
            return _this.shortcut(true, false);
          };
        })(this)
      });
    },
    shortcut: function(sensitive, background) {
      var currentScope, cursor, editor, range, scopes, selection, text;
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return;
      }
      selection = editor.getLastSelection().getText();
      if (selection) {
        return plugin.search(selection, sensitive, background);
      }
      cursor = editor.getLastCursor();
      scopes = cursor.getScopeDescriptor().getScopesArray();
      currentScope = scopes[scopes.length - 1];
      if (scopes.length < 2 || /^(?:comment|string|meta|markup)(?:\.|$)/.test(currentScope)) {
        return plugin.search(editor.getWordUnderCursor(), sensitive, background);
      }
      range = editor.bufferRangeForScopeAtCursor(currentScope);
      if (range) {
        text = editor.getTextInBufferRange(range);
      } else {
        text = editor.getWordUnderCursor();
      }
      return plugin.search(text, sensitive, background);
    },
    search: function(string, sensitive, background, cb) {
      var activeEditor, cmd, language, path;
      activeEditor = atom.workspace.getActiveTextEditor();
      if (sensitive && activeEditor) {
        path = activeEditor.getPath();
        language = activeEditor.getGrammar().name;
      }
      cmd = this.getCommand(string, path, language, background);
      return plugin.exec(cmd, cb);
    },
    getCommand: function(string, path, language, background) {
      if (platform === 'win32') {
        return 'cmd.exe /c start "" "' + this.getDashURI(string, path, language, background) + '"';
      }
      if (platform === 'linux') {
        return this.getZealCommand(string, path, language, background);
      }
      return 'open -g "' + this.getDashURI(string, path, language, background) + '"';
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
    getDashURI: function(string, path, language, background) {
      var keywords, link;
      link = 'dash-plugin://query=' + encodeURIComponent(string);
      keywords = this.getKeywordString(path, language);
      if (keywords) {
        link += '&keys=' + keywords;
      }
      if (background) {
        link += '&prevent_activation=true';
      }
      return link;
    },
    getZealCommand: function(string, path, language, background) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL25hdGUvLmF0b20vcGFja2FnZXMvZGFzaC9saWIvZGFzaC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseURBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLE1BQVIsQ0FBZSxDQUFDLFFBQTNCLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxJQURoQyxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFXLE9BQUEsQ0FBUSxTQUFSLENBQWtCLENBQUMsUUFGOUIsQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUhiLENBQUE7O0FBQUEsRUFJQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBSmQsQ0FBQTs7QUFBQSxFQU1BLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxHQUdQO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFVBQUEsRUFBWSxFQURaO09BREY7QUFBQSxNQUdBLFNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFVBQUEsRUFBWSxFQURaO09BSkY7S0FERjtBQUFBLElBU0EsSUFBQSxFQUFNLElBVE47QUFBQSxJQVdBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0Isa0JBQWxCLEVBQXNDO0FBQUEsUUFDcEMsZUFBQSxFQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBTSxLQUFDLENBQUEsUUFBRCxDQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBTjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJ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

//# sourceURL=/Users/nate/.atom/packages/dash/lib/dash.coffee
