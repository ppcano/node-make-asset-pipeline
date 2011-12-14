
# Asset middleware

Decrease dev/testing period rebuilding on demand assets (with make commands) which has been updated. 

Each time a GET request for an asset ( specified on the monitor options ) is received:  
 - the make command for the specific asset ( convention naming ) is executed, and after the execution the asset is retrieved.
 - On production, make commands are not executed and only retrieves the specific asset.

## Set up express server 

```js
  app.use( require('node-make-asset-pipeline')({asset: 'assets', monitors: [ { name: 'ember', watch: 'packages/ember.js/packages' } ]}) );
```

## Create makefile 

In order to work, each command must output a file with the same name as the command

Makefile


  ember:

    cd ./packages/ember.js; \
      rake clean; \
      rake 

    cp -pr ./packages/ember.js/dist/ember.js assets/ember.js


## asset_folder
  ember.js  

### Install
  npm node-make-asset-pipeline
