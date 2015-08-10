/** Util.js
  * 
  * This file defines many useful utilities
  */

var child_process = Meteor.npmRequire('child_process');

Util = {
    /**
     * execCmd
     * Execute a command line command
     *
     * @param{String} cmd The command to run
     * @return{Object} The returning object, same as Async.runSync
     */
    execCmd: function(cmd) {
        return Async.runSync(function(done) {
            child_process.exec(cmd, function(err, stdout, stderr) {
                done(err, {
                    stdout: stdout,
                    stderr: stderr
                });
            });
        });
    },
    /**
     * escapeCmdStr
     * Escape a string so that it can go into command line safely
     *
     * @param{String} str Input string
     * @return{String} The escaped string
     */
    escapeCmdStr: function(str) {
        //Source: http://stackoverflow.com/questions/1779858/how-do-i-escape-a-string-for-a-shell-command-in-node
        //1. Replace all single quote with '\''
        //2. Add single quote for both ends
        return '\'' + str.replace(/\'/g, "'\\''") + '\'';
    }
};
