
# Live Chat for Support


## Project setup

```
npm install
```

  

### Compiles and hot-reloads for development

```
npm run serve
```

  

### Compiles and minifies for production

```
npm run build
```


### File structure
This is pretty much the default file structure that you get from scaffolding app from `vue-cli 3`, added stuff to suit the needs of the boilerplate.
```
.
|____App.vue
|____components
| |____globals
| | |____ButtonSpinner
| | | |____index.vue
|____main.js
|____router
| |____index.js
|____settings.js
|____store
| |____actions
| | |____auth.js
| | |____user.js
| |____index.js
| |____modules
| | |____auth.js
| | |____settings.js
| | |____user.js
|____styles
| |____index.scss
| |_____variables.scss
|____utils
| |____api.js
|____views
| |____auth
| | |____login
| | | |____img
| | | | |____login.jpg
| | | |____index.vue
| | |____register
| | | |____img
| | | | |____register.jpg
| | | |____index.vue
| | | |____js
| | | | |____imagesloaded.pkgd.min.js
| | | | |____zxcvbn.js
| | |____styles
| | | |____auth-styles.scss
| |____home
| | |____index.vue
| |____layouts
| | |____App
| | | |____index.vue

