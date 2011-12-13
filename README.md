
# Asset middleware

This middleware is intended to be used on development in a browser environment
Each time a request for an asset is coming, the make command for the specific asset ( convention naming ) is executed

## Set up express server 

```js
  app.use( require('node-make-asset-pipeline')({asset: 'assets', monitors: [ { name: 'ember', watch: 'packages/ember.js/packages' } ]}) );
```

## Create makefile 

In order to work, each command must output a file with the same name as the command

Example


  ember:

    cd ./packages/ember.js; \
      rake clean; \
      rake 

    cp -pr ./packages/ember.js/dist/ember.js assets/ember.js


## asset_folder
  ember.js  
