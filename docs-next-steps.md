# Magicbox App: Next Steps

### What’s next

This app has the potential to be a fully-customizable, but easy to use map-building application (potentially with some light analysis functions also), as well as be a foundation for similar, more robust software projects.

There are two main use cases that we see as important future steps:

- The ability for an organization, division, or team to create and maintain a completely custom map application that either acts as an internal tool for monitoring or management or as an education or advocacy tool
- The ability for individual users to make and share more basic maps that provides simple information and kepler functionality such as colored points, polygons, filtering, layer toggling, etc.

In order to achieve this, additional features would have to be build upon the existing framework, which was designed with this future in mind. Below is an outline of potential next steps we had in mind when architecting this software.


1. Dynamic Views: frontend and backend updates
    1. add open data to maps
    2. being able to choose dynamic view vs. a map of a moment in time  
    3. streaming/real-time data
2. User-created maps: saving & sharing
    1. make UNICEF/private data accessible to staff to create their own maps
3. Public vs. internal versions: auth
    1. add UNICEF/private data to maps
4. Content management for UNICEF thematic maps (i.e. updating descriptive content, etc.)



Dynamic Views:
(WIP/initial testing of possible structures begun on: https://github.com/unicef/magicbox-app-backend/tree/u/marcellamaki/dynamic-map-building)
Why

- automates and simplifies map building process for global datasets
- allows for most current data to be displayed on the map, rather than having to run a rebuild process
- easier for science team to update and create new map views (i.e. not an entirely new theme, but to add countries or additional data to an existing thematic framework)
- prevents data storage duplication (same data saved multiple times for the same map, for different views)

Key Steps

- organize data: ensure that all data is in the same place, and structured in the same way (or a group of ways)
- create “view format” (started, but not completed), which would require updating, and adding mongoose the the project for object relational references
- update structure for fetching using kepler.gl library, including add data to map, and update vis config
    - this would require updating the structure of the loading indicator/loading framework: addDataToMap adds data as it is loaded, and if there is asynchronous fetching, it might cause the map to begin loading unless other steps are not taken. Suggestion would be to begin passing addDataToMap (map data and vis config together), but not updating the map view (i.e. switch the functionality of the loading indicator to not update the view with state update), exporting the config on completion (all data loaded) and then compiling the app config and map config into the view, and updating state
- Manage error handling, including if the map should display if some percentage of data is unavailable, if data is in the wrong format, etc.
- Strategy for streaming/real time: web sockets? more research on the possibilities for kepler/mapbox with database connections
- update the API so that there is a way to navigate/sort between static configs and dynamic views
    - both in the saving of the map, and in the way a user navigates to the map?

User Created Maps, saving & sharing:
Why

- This tool will be more useful if users are not able to just view maps, but are able to easily create their own, and save and share them with colleagues
- The maps can be used for advocacy, used for policy/simple analysis, and potentially, tracking change over time, without something like spreadsheets

Key Steps

- building on the dynamic map API, provide an interface that would allow a user to select datasets and visualize them on a map
- add in UNICEF, public, and private sector datasets that users can select from
    - may need to be layers of authorization, perhaps start with data that can be available to everyone within the organization
- Allow a user to choose between saving the config itself, thus creating a static map, or, saving pointers to the datasets that were pulled in, essentially automatic the dataset selection process that the user went through to create the map.

Notes

- Who is the map sharable with? Is it shareable for anyone with a link? is it searchable?
    - consideration for not just what data is accessible to users in the builder (i.e. the data that is available to the user within the builder for their map is approved/in line with their role and department) but also, the access of data which may be private or non-sharable should not be able to be shared through a map. (Obviously this doesn’t account for things like screenshots, etc.)
    - this is related to the step below

Public vs. internal versions:  
Why

- Some datasets are open datasets, such as healthsites.io, osm schools, cell towers, etc. that can be useful to many different organizations. This functionality should be available for anyone
- There may also be some themes, or country maps, that are intended to be public, or at least have a public version (i.e. HDI map, Project Connect, etc.)
- However, there may also be maps for, perhaps, a division, where the information/data is sensitive, either provided through a private partnership, or that could be used for purposes other than its intended purposes. These should be private, either entirely within the organization, or with added permissions for specific, pre-approved partners

Key Steps

- Add both permissions and metadata to datasets to indicate whether or not the data can be publicly shared - 1) to prevent sharing of private data and 2) to indicate to the user who is creating a map if they are selecting data that cannot be shared publicly
- Determine procedure for approval of sharing private information outside of the organization, and implement steps in UI for submitting/approving

Notes

- Current data types: open source, internal data - UNICEF/UN, private government data, private sector data, data from academic partnerships

Content management for UNICEF maps:

- start with using just the map functionality that is available with kepler (colors, etc.) rather than custom colors (use the builder)
- a form that would allow content to be updated
    - this would require both the text and the styling to be managed, although perhaps there should be a limited framework within which this could be updated
    - allow the user to choose which URLs/views that are being updated (i.e. is the content being updated for one page, or for the entire “theme”)
- CRUD functionality for map content, not just map
    - if a user is allowed to save the dataset OR save pointers to the dataset
        - either way, the CRUD functionality needs to work and update the content; therefore, would likely need to have some indicator in the view that would direct to the proper update
