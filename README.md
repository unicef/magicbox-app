# Magicbox App

Magicbox App is the frontend application used within UNICEF Office of Innovation to visualize, build and share data and insights through interactive maps in the global and country level.

## Running this application

Create a .env file in the root directory of the application with the content:

```
REACT_APP_MAPBOX_TOKEN=your_mapbox_token_goes_here
```

Run the command below in your terminal

```console
make run
```

or simply

```console
make
```

## Build and Deploy

Build this application triggers several tasks that results in a docker image built on top of [nginx](https://hub.docker.com/_/nginx/) configured to serve the static files bundled inside the container which includes the main application (index.html and compiled javascript sources) and a set of pre-configured visualizations in the json format, all of them statically zipped and stored during the build process.  
Statically zipping all the content can take a while, this is done in the build phase to prevent the nginx server to dynamically zip the content, optimizing the overral server performance and user experience, you can see more of this specific module [here](http://nginx.org/en/docs/http/ngx_http_gzip_static_module.html).  
This application can be deployed as a docker container, using your preferred method to do that.

## TODO
  * Explain path patterns
    * When 'shape.json' is loaded
    * How to change the url names
    * What gets loaded when an user clicks in a country

## How does it work?

This application uses [kepler.gl](https://github.com/keplergl/kepler.gl) as a library to display our visualizations. Each visualization is a json config that stores:
  - data for the visualization components
  - map configuration (as kepler stores it)

Each visualization is a set of configurations for the global view and countries that display

## How routes are handled?

Paths in this application indicates the dataset and view level selected to be displayed. The following table show the patterns and the specific view to load.

| Route              | View                                      |
|--------------------|-------------------------------------------|
| /                  | default global view                       |
| /:theme            | :theme in global view                     |
| /:theme/c/:country | :country level with given :theme          |

## Contributing

Please, feel free to contribute with this project. A good start is to look into the open issues of this project.

