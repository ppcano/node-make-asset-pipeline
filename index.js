var parse = require('url').parse
  , sys = require('sys')
  , watch = require('watch')
  , exec = require('child_process').exec
  , path = require('path');

exports = module.exports = function make(options){
  options = options || {};

  var asset = options.asset || 'assets';
  var folder = process.cwd() +'/'+asset;
  var monitors = {};
  var i, cmd_name, cmd_watch;
  

  for ( i=options.monitors.length; i--; ) {

    cmd_name = options.monitors[i].name;
    cmd_watch = options.monitors[i].watch;

    var module_path = process.cwd() +'/'+ cmd_watch; 

    //console.log( module_path );


    watch.createMonitor( module_path, function (monitor) {

      monitor.isChanged = false;
      monitor.on("created", function (f, stat) {
        console.log ( '\033[32 m >>> node make watch...... \033[0m' ); 
        this.isChanged = true;
      })
      monitor.on("changed", function (f, curr, prev) {
        console.log ( '\033[32 m >>> node make watch...... \033[0m' ); 
        this.isChanged = true;
      })
      monitor.on("removed", function (f, stat) {
        console.log ( '\033[32 m >>> node make watch...... \033[0m' ); 
        this.isChanged = true;
      })

      monitors[cmd_name] = monitor;

    });  



  }
  

  if ( !path.existsSync( folder ) ) {
    throw new Error('asset folder not available at '+ folder );
  }

  return function make(req, res, next) {

    if ('GET' == req.method  ) { 

      var url = parse(req.url)
        , pathname = url.pathname;
      
      var asset_path = '/'+asset+'/';

      if ( pathname.slice(0, asset_path.length) === asset_path  ) {

        var filename =  pathname.slice( asset_path.length, pathname.length );

        var lastDot = filename.lastIndexOf('.'); 

        if ( lastDot >= 0) {

            var command = filename.slice(0, lastDot);
            var filepath = folder +'/'+filename;

            
            if ( monitors[command] ) {

              if ( monitors[command].isChanged ) {

                monitors[command].isChanged = false;
                exec( 'make '+command, function(error, stdout, stderr ) {

                  if ( !error ) {

                    res.sendfile(filepath);

                  } else throw error;

                }); 

              } else {
                    res.sendfile(filepath);
              }

            } else  return next(); 




        } else  return next(); 


      } else  return next(); 


    } else  return next(); 

  }

};

