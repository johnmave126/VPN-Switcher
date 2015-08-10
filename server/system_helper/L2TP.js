/** L2TP.js
 *
 * This file encapsulates several common operations on L2TP
 */

var lac_conf = {
    'ppp debug': 'yes',
    'length bit': 'yes',
    'redial': 'yes',
    'redial timeout': '15',
    'require authentication': 'yes'
};

var _pppopt = [
    'ipcp-accept-local',
    'ipcp-accept-remote',
    'refuse-eap',
    'require-mschap-v2',
    'noccp',
    'noauth',
    'idle 1800',
    'mtu 1410',
    'mru 1410',
    'nodefaultroute',
    'persist',
    'usepeerdns',
    'debug',
    'lock',
    'connect-delay 5000'
];

L2TP = Object.create({}, {
    /**
     * add
     * Add a new lac server to L2TP
     *
     * @param{String} name The name of the server
     * @param{String} serverIP The IP address of the server
     */
    add: function(name, serverIP) {
        //Require Node Module child_process
        var child_process = Meteor.npmRequire('child_process');
        //Construct config
        var conf = _.extend({
            'lns': serverIP
        }, lac_conf);
        //Execute command
        //xl2tpd-control add <name> <options...>
        var result = Util.execCmd('xl2tpd-control add ' 
                + Util.escapeCmdStr(name) 
                + ' ' + objToCmdStr(conf));
        if(result.erorr) {
            //TODO: Log this failure
        }
    },
    /**
     * connect
     * Connect to an lac server
     *
     * @param{String} name The name of the server
     * @param{Array} pppopts The options to be constructed
     * @return{String} The tmp file name of this instance
     */
    connect: function(name, pppopts) {
        //Require Node module tmp to create temporary file
        var tmp = Meteor.npmRequire('tmp');
        //Create temporary file
        var tmp_result = Async.runAsync(function(done) {
            tmp.file({
                //Only readable by root
                mode: 0600,
                //Common prefix
                prefix: 'options.xl2tp.',
                //Callback cannot be stored, so we delete it manually
                keep: true
            }, function(err, path, fd) {
                //Pass the result back
                done(err, {
                    path: path,
                    fd: fd,
                });
            });
        });

        if(tmp_result.error) {
            //TODO: Log this failure
            return;
        }
        
        //Write the pppopts into the tmp file
        var fs = Meteor.npmRequire('fs');
        var fs_result = Async.runSync(function(done) {
            //Write to file
            fs.write(tmp_result.result.fd, pppopts.join('\n'), function(err, written, string) {
                if(err) {
                    done(err, {
                        written: written,
                        string: string
                    });
                }
                fs.close(tmp_result.result.fd, function(err) {
                    done(err, {
                        written: written,
                        string: string
                    });
                });
            });
        });

        if(fs_result.error) {
            //TODO: Log this failure
            console.log(fs_result.error);
        }

        //Use the tmp file as the pppopts of the connection
        //xl2tpd-control add <name> pppoptfile = <path to tmpfile>
        var cmd_result = Util.execCmd('xl2tpd-control add ' 
                + Util.escapeCmdStr(name) 
                + ' ' + objToCmdStr({
                    'pppoptfile': tmp_result.result.path
                })
        );
        if(cmd_result.erorr) {
            //TODO: Log this failure
        }

        //Now connect to the server
        //xl2tpd-control connect <name>
        cmd_result = Util.execCmd('xl2tpd-control connect ' 
                + Util.escapeCmdStr(name)); 
        
        if(cmd_result.erorr) {
            //TODO: Log this failure
        }
        return tmp_result.result.path;
    },
    /**
     * disconnect
     * Disconenct a connection
     *
     * @param{String} name The name of the server
     * @param{String} tmpfilepath The tmp pppoptsfile path
     */
    disconnect: function(name, tmpfilepath) {
        //Use the tmp file as the pppopts of the connection
        //xl2tpd-control disconnect <name>
        var cmd_result = Util.execCmd('xl2tpd-control disconnect ' 
                + Util.escapeCmdStr(name) 
        );
        if(cmd_result.erorr) {
            //TODO: Log this failure
        }

        //Delete the tmp file
        var fs = Meteor.npmRequire('fs');
        var fs_result = Async.runSync(function(done) {
            //Write to file
            fs.unlink(tmpfilepath, function(err) {
                done(err);
            });
        });

        if(fs_result.error) {
            //TODO: Log this failure
            console.log(fs_result.error);
        }
    }
});

/**
 * objToCmdStr
 * Convert an object to <key> = <value> pair
 * Used only in this file
 *
 * @param{Object} obj The object to be converted
 */
var objToCmdStr = function(obj) {
    var props = [];
    //For each property
    for(var prop in obj) {
        //TODO: we may need to sanitize the string
        props.push(prop + ' = ' + obj[prop]);
    }
    return props.join(' ');
}

