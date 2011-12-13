var parse = require('url').parse
  , sys = require('sys')
  , exec = require('child_process').exec
  , path = require('path');

exports.version = '0.0.1';

exports = module.exports = function make(options){
  options = options || {};

  var asset = options.asset || 'assets';
  var folder = process.cwd() +'/'+asset;

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

            exec( 'make '+command, function(error, stdout, stderr ) {

              if ( !error ) {
                var filepath = folder +'/'+filename;
                res.sendfile(filepath);

              } else throw error;

            });




        } else  return next(); 


      } else  return next(); 


    } else  return next(); 

  }



};

