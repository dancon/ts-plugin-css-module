/**
 * @fileoverview
 * @author houquan | houquan@bytedance.com
 * @version 1.0.0 | 2020-03-15 | houquan      // initial version
 */

const less = require('less')

console.log(less)


function xx (filename, currentDirectory, options, environment, callback) {
  var fullFilename;
  var isAbsoluteFilename = this.isPathAbsolute(filename);
  var filenamesTried = [];
  var self = this;
  var prefix = filename.slice(0, 1);
  var explicit = prefix === '.' || prefix === '/';
  var result = null;
  var isNodeModule = false;
  var npmPrefix = 'npm://';
  options = options || {};
  var paths = isAbsoluteFilename ? [''] : [currentDirectory];
  if (options.paths) {
      paths.push.apply(paths, options.paths);
  }
  if (!isAbsoluteFilename && paths.indexOf('.') === -1) {
      paths.push('.');
  }
  var prefixes = options.prefixes || [''];
  var fileParts = this.extractUrlParts(filename);
  if (options.syncImport) {
      getFileData(returnData, returnData);
      if (callback) {
          callback(result.error, result);
      }
      else {
          return result;
      }
  }
  else {
      // promise is guaranteed to be asyncronous
      // which helps as it allows the file handle
      // to be closed before it continues with the next file
      return new Promise(getFileData);
  }
  function returnData(data) {
      if (!data.filename) {
          result = { error: data };
      }
      else {
          result = data;
      }
  }
  function getFileData(fulfill, reject) {
      (function tryPathIndex(i) {
          if (i < paths.length) {
              (function tryPrefix(j) {
                  if (j < prefixes.length) {
                      isNodeModule = false;
                      fullFilename = fileParts.rawPath + prefixes[j] + fileParts.filename;
                      if (paths[i]) {
                          fullFilename = path.join(paths[i], fullFilename);
                      }
                      if (!explicit && paths[i] === '.') {
                          try {
                              fullFilename = require.resolve(fullFilename);
                              isNodeModule = true;
                          }
                          catch (e) {
                              filenamesTried.push(npmPrefix + fullFilename);
                              tryWithExtension();
                          }
                      }
                      else {
                          tryWithExtension();
                      }
                      function tryWithExtension() {
                          var extFilename = options.ext ? self.tryAppendExtension(fullFilename, options.ext) : fullFilename;
                          if (extFilename !== fullFilename && !explicit && paths[i] === '.') {
                              try {
                                  fullFilename = require.resolve(extFilename);
                                  isNodeModule = true;
                              }
                              catch (e) {
                                  filenamesTried.push(npmPrefix + extFilename);
                                  fullFilename = extFilename;
                              }
                          }
                          else {
                              fullFilename = extFilename;
                          }
                      }
                      var readFileArgs = [fullFilename];
                      if (!options.rawBuffer) {
                          readFileArgs.push('utf-8');
                      }
                      if (options.syncImport) {
                          try {
                              var data = fs$1.readFileSync.apply(this, readFileArgs);
                              fulfill({ contents: data, filename: fullFilename });
                          }
                          catch (e) {
                              filenamesTried.push(isNodeModule ? npmPrefix + fullFilename : fullFilename);
                              return tryPrefix(j + 1);
                          }
                      }
                      else {
                          readFileArgs.push(function (e, data) {
                              if (e) {
                                  filenamesTried.push(isNodeModule ? npmPrefix + fullFilename : fullFilename);
                                  return tryPrefix(j + 1);
                              }
                              fulfill({ contents: data, filename: fullFilename });
                          });
                          fs$1.readFile.apply(this, readFileArgs);
                      }
                  }
                  else {
                      tryPathIndex(i + 1);
                  }
              })(0);
          }
          else {
              reject({ type: 'File', message: "'" + filename + "' wasn't found. Tried - " + filenamesTried.join(',') });
          }
      }(0));
  }
}
