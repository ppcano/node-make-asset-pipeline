
# Asset middleware

This middleware is intended to be used on development in a browser environment
Each time a request for an asset is coming, the make command for the specific asset ( convention naming ) is executed

## Set up express server 

```js
var app = express.createServer(
    , require('node-make-asset-pipeline')({asset: 'assets', monitors: [ { name: 'ember', watch: 'ember/packages' } ]})
); 
```

## Create makefile 

In order to work, each command must output a file with the same name as the command

Example


  ember:

    cd ./node_modules/ember; \
      rake clean; \
      rake 

    cp -pr ./node_modules/ember/dist/ember.js assets/ember.js


## asset_folder
  ember.js  
