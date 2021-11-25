# appsmith-appwrite

## Appwrite setup

- Users -> Settings; Everything disabled except GitHub (GitHub configured & enabled)
- Collection "projects":

```
{
    "$id": "617ba048311ab",
    "$permissions": {
        "read": [
            "role:member"
        ],
        "write": [
            "role:member"
        ]
    },
    "name": "projects",
    "dateCreated": 1635491912,
    "dateUpdated": 1637319184,
    "rules": [
        {
            "$id": "617ba0d21dc72",
            "$collection": "rules",
            "type": "text",
            "key": "githubUrl",
            "label": "GitHub URL",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "617ba0d220217",
            "$collection": "rules",
            "type": "text",
            "key": "title",
            "label": "Title",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "617ba0d22273b",
            "$collection": "rules",
            "type": "text",
            "key": "description",
            "label": "Description",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "617ba8e95b3f4",
            "$collection": "rules",
            "type": "text",
            "key": "authorId",
            "label": "Author ID",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "617bac1d5743a",
            "$collection": "rules",
            "type": "numeric",
            "key": "trending",
            "label": "trending",
            "default": 0,
            "array": false,
            "required": false,
            "list": []
        },
        {
            "$id": "617baff72de45",
            "$collection": "rules",
            "type": "numeric",
            "key": "createdAt",
            "label": "Created At",
            "default": 0,
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "61825c6e79dec",
            "$collection": "rules",
            "type": "text",
            "key": "logoId",
            "label": "Logo ID",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        },
        {
            "$id": "618262e16bde7",
            "$collection": "rules",
            "type": "text",
            "key": "countryCode",
            "label": "Country Code",
            "default": "",
            "array": false,
            "required": true,
            "list": []
        }
    ]
}
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
