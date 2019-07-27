# Checklist - Updating the HDI/Poverty App


### Creating a new country map view

#### Prepare your data

1. Data must be formatted as a csv or a geojson. 
2. A csv will render points as long as the csv contains the headers latitude and longitude. 
3. For geojson, any data values must be added as a property. Kepler cannot combine/parse multiple datasets; they must be pre-processed. The added data cannot be nested. Kepler only accesses key/value pairs at the first level within “properties”. Each data point must be listed in a format consistent with the example below: 


`{
  "type": "Feature",
  "geometry": {
    "type": "Polygon", 
    "coordinates": [[]], 
  },
  "properties": {
    "estimatedHdi": 0.3, 
    "reportedHdi": 0.4, 
    "deviation": -0.1,
    "deviationAccuracy": "underestimate"
  }
}`

To add another country with the current configuration (estimated HDI, reported HDI, and HDI deviation, with the current color and scale), you will need to add the following key/values to each admin in the geojson: 

    - estimatedHDI (integer, indexed, 0 - 1, with 0 being no data) 
    - reportedHDI (integer, indexed, 0 - 1)  
    - deviation (integer, indexed, 0 - 1; reportedHDI - estimatedHDI, or no data)
    - deviationAccuracy (string; underestimate, overestimate, no deviation, or no data) 

A general script that demonstrates how to take a large number of csv values (such as an indexed value) and associate them with their correlating geojson admin can be found here, although it will have to be updated for this case. A similar structure can be used for geojson → geojson (an incomplete script that does demonstrate some of how to do this in javascript can be found here). Please note, neither script does fuzzy matching - the data would have to be cleaned beforehand to ensure the admins match. 

#### Creating your country-level map
The configuration can be built using the kepler.gl browser interface and then exported. 

1. Drag and drop your data into kepler
2. Create 3 layers from your dataset, using the guideline images below. Do not worry about the colors. The palette used is custom and will be changed later. More important is the number of steps, the values that are used to “color by”,  and the tooltip. 
3. Between creating layers it might be helpful to toggle the previous layer to “hidden” using the eye icon on the left side of the label. 

For estimated and reported HDI:

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560959308293_Screen+Shot+2019-06-19+at+11.38.34+AM.png)


For the deviation scale: 

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560959616560_Screen+Shot+2019-06-19+at+11.47.11+AM.png)


Tooltip: only do once (works for the dataset/across all layers): 

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560959944620_Screen+Shot+2019-06-19+at+11.48.07+AM.png)



3. Test your map. You can use the “eye” icon to hide or view layers. View each layer separately. Make sure everything looks the way you are expecting.


4. Export the map in a json format once you are finished. On the kepler.gl side panel: 
    Share > Export Map > json > Export. 
![](https://paper-attachments.dropbox.com/s_5A3FDBD0671FBF613C10969E2209848E0747D152D292BE58817B645C42ADFB8D_1560788946422_Screen+Shot+2019-06-17+at+12.27.45+PM.png)


#### Customize the mapConfig for the Country Map

In order for the mapConfig to work with the rest of the application, however, there are several portions of the config that have been changed in the config once the map has been updated. This allows customized design and user interactions while retaining the baseline kepler.gl functionality. The config has the key “layers” which is an array of objects, each of which controls one layer of the map. In this configuration, there are 3 layers, one for estimated HDI, one for reported HDI, and one for HDI deviation. Each layer must be updated to have the appropriate custom color and data as described below. 


   Custom Colors
   kepler.gl has a variety of available color palettes that are both sequential and divergent, which allow a user to color by the values of their data. There are 2 layers (estimated HDI and reported HDI) that use the gradient purple color scheme. The deviation layer uses a “bucket” system of red, green, and blue.


   Custom Interactions
   The “id” for the layer is by default a randomly generated alphanumeric string. This value, along with the “isVisible”, is the way that the custom “Layer Toggler” component can control the layers seen by the user. For ease of use, we have replaced the random string with a descriptive name of the layer: estimate, reported, deviation. These exact strings must be used to 

Code: country-level layers
Below is a snippet of the portion of the kepler configuration (which you have just exported) that has been updated for this project to have both custom colors and interactions. The code in bold indicates code sections that need to be updated for each layer. 


    "config": {
          "version": "v1",
          "config": {
            "visState": {
              "filters": [],
              "layers": [
                {
                  "id": "estimate", // layer id, needed for custom interactions
                  "type": "geojson",
                  "config": {
                    "dataId": "7ypkouio4",
                    "label": "Estimated HDI",
                    //... lots of other things here.....
                    "isVisible": true, // layer visibility, needed for custom interactions
                    "visConfig": {
                      "opacity": 1,
                      "thickness": 0.5,
                      "colorRange": {
                        "name": "Uber Viz Diverging 3.5",
                        "type": "diverging", // category of gradient, for custom colors 
                        "category": "Uber",
                        "colors": [ // custom colors, sequenced in order in the arrray
                          "#9e9e9e",
                          "#E4E6EA",
                          "#CACFE2",
                          "#B1B8DA",
                          "#97A1D2",
                          "#7E8ACA",
                          "#6473C2",
                          "#4B5CBA",
                          "#3145B2",
                          "#182FAB"
                        ], 
                    //... lots of other things here..... 
                    }, 
                    //next layer in the array: "reported" 
                {
                  "id": "reported", // layer id
                  "type": "geojson",
                  "config": {
                    "dataId": "7ypkouio4",
                    "label": "Reported HDI",
                    //... lots of other things here.....
                    "isVisible": false, // layer visibility
                    "visConfig": {
                      "opacity": 1,
                      "thickness": 0.5,
                      "colorRange": {
                        "name": "Uber Viz Diverging 3.5",
                        "type": "diverging", // category of gradient, for custom colors 
                        "category": "Uber",
                        "colors": [ // custom colors, sequenced in order in the arrray
                          "#9e9e9e",
                          "#E4E6EA",
                          "#CACFE2",
                          "#B1B8DA",
                          "#97A1D2",
                          "#7E8ACA",
                          "#6473C2",
                          "#4B5CBA",
                          "#3145B2",
                          "#182FAB"
                        ], 
                  //... lots of other things here.....
              }, 
                 //next layer in the array: "reported" 
              {
                 "id": "deviation",
                 "type": "geojson",
                 "config": {
                   "dataId": "7ypkouio4",
                   "label": "HDI Deviation",
                    //...               
                   "isVisible": false,
                   "visConfig": {
                     "opacity": 1,
                     "thickness": 0.5,
                     "colorRange": {
                       "name": "ColorBrewer RdGy-4",
                       "type": "diverging",
                       "category": "ColorBrewer",
                       "colors": [
                       "#e94133",
                       "#44b800",
                       "#0034bc",
                       "#bababa"
                       ],
    
    

### Updating the global map
1. The global map has both visual and interactive elements that indicate which countries have information about HDI. 
    - Red outline of countries where HDI estimations are available 
    - Greyed out countries/areas where no reported HDI is available at the national level
    - countries with HDI estimates are clickable, and click leads to a zoom in of that country, whereas the map does not change when a country without subnational data is clicked
2. Update the global_shp.json. This file is the foundation for the global map and a copy of the current version is in the public folder. The properties of the geojson are structured as follows:

 
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1562957116120_Screen+Shot+2019-07-12+at+2.44.59+PM.png)


3. To create the global view, you will have to add the data 3 times in the kepler.gl interface, not just create 3 layers. This is because a feature/bug of kepler is the “filter” function (used to create the greyed out countries as well as the outlines) works on an entire data set, not just on a layer. 


4. Create first layer - global, colored view of national HDI index
    - Use a 10 step gradient for the fill, and turn off stroke (outline)
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560974074591_Screen+Shot+2019-06-19+at+3.40.44+PM.png)

5. Create second layer - no reported national HDI index
    - Toggle off the view of the current map, using the “eye” icon (this just makes it easier to track what you’re doing, and isn’t strictly necessary)
    - Click “Add Data” again, and drop the same global_shp.json into kepler.gl
    - Navigate to the filter tab (it looks similar to the Excel filter icon or a funnel)
    - Filter this second dataset to only show nationalHdiIndex values in the range 0 - 0 (which will show only null values, countries with no reported national HDI)
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560974724976_Screen+Shot+2019-06-19+at+3.41.38+PM.png)

    - Update the fill to be grey, and for no outline
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560974887676_Screen+Shot+2019-06-19+at+3.42.05+PM.png)

6. Create the outline layer
    - Again, toggle off the view of the current map using the “eye” icon
    - Click “Add Data” again, and drop the same global_shp.json into kepler.gl
    - Filter the third data set using the “url” which is a parameter used for countries that have an estimated HDI view. The filter will include only those selected countries with that parameter
    - Then, turn off the fill, and use a 0.5 width red stroke to outline these countries.
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560976272336_Screen+Shot+2019-06-19+at+3.43.17+PM.png)

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560976520852_Screen+Shot+2019-06-19+at+4.33.57+PM.png)



7. As with the country level, test your map. You can use the “eye” icon to hide or view layers. View each layer separately. Make sure everything looks the way you are expecting. Ensure that the layers are in the correct order. The global colored map should be on the bottom. On top of this should be the grey and red layers. This will ensure that all of these indicators are visible to the user. 
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1560976615655_Screen+Shot+2019-06-19+at+4.35.48+PM.png)




8. Again, just like with the country level, export the map in a json format once you are finished. On the kepler.gl side panel: 
    Share > Export Map > json > Export. 

Additional support for creating kepler.gl maps can be found in the github documentation. 


#### Create the view configuration to be stored in MongoDB

After the kepler configs have been updated, the complete view configurations, which are the documents stored in mongoDB that contain all information for the map and the rest of the view, must also be updated. 

For an extensive explanation of the architecture, you can refer to the magicbox-app documentation on github. 

For a series of the most basic steps of what to do, with only a short summary of context, please see below. 

#### Basic Application structure
Each page is composed using a “view”, a json config that stores:

- data for the visualization components (“appConfig”)
- map configuration (as generated by kepler; “mapConfig”)

A theme is a set of visual components that has all the information to correctly display the data associated with a view. A visualization is a set of views that uses the same theme. Each visualization is associated with one global view and many country views. Each visualization is associated with a specific dataset/insight (school-mapping, poverty-radar).
Each view configuration is a set of attributes stored in the same json file configurations for the global view and countries that display. This json file contains two subsections, the “mapConfig” and the “appConfig”.

#### Config format (aka how your file should look) 


    var newConfig = { 
      url: "/:datasetName/c/:country", // follow the routing convention to create a url,   if making a completely new config for a country, not just updating the global. There  should not be a trailing slash at the end of the url
      mapConfig: // insert customized kepler config here
      appConfig: // insert app file here. It is currently consistent for all countries, although there are some differences between the global and country level views in relation to the side bar 
    }

Create a variable “newConfig” with the above structure. You may want to use the terminal and save to a file, as the contents will be very large and may crash a text editor.  Add the customized kepler.gl config to “mapConfig” as the value, and add the appropriate appConfig. (Note: The appConfig will not have to be updated for the global view unless you make additional customizations.)
    
### Adding to MongoDB using a database interface
To update the MongoDB instance, we will use Robo 3T (formerly known as robomongo), an open-source GUI for MongoDB. 

#### To add a new country to MongoDB

1. Once you are connected using Robo 3T, open your config file that you saved.
2. To the end of the file, add the code to insert a document: 
    db.getCollection('config').insertOne(newConfig);
3. Execute the file using the green triangle/play icon. When the file executes, it will return a message to tell you whether or not the insert was successful.
![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1561062024692_Screen+Shot+2019-06-20+at+4.17.48+PM.png)


#### To update the current global map in MongoDB

1. Using the same steps as above, ensure you are connected to the database, and open the new global config file. 
2. To the end of the file, add the code to update a document: 
    var query = {url: '/povertyradar'};
    var newData = {
            $set: {
                mapConfig: newConfig.mapConfig,
                appConfig: newConfig.appConfig
            }
        };
        db.collection('config').updateOne(query, newData, function(err, result) {
            if (err) throw err;
            res.send(result);
        });



Troubleshooting errors

One of the most common errors that you may encounter is when you navigate to a new country that you have added, the map simply doesn’t load. You may see something like this: 

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1561126045388_Screen+Shot+2019-06-21+at+10.07.04+AM.png)


To check the error, use Chrome. Right click on the map (you will need to hover somewhere where you see the arrow mouse, not the hand, such as the side panel) and navigate to inspect. Then, navigate to the console. 

If you see this error “Cannot read property ‘datasets’ of null”, then the fetch from the database is not returning anything. Do other countries work? If so, it’s not an issue with MongoDB being down entirely. Either the document wasn’t successfully added to the database, or there is an error or typo with the urls, which is causing a mismatch that the code can’t find.

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1561126211861_Screen+Shot+2019-06-21+at+10.03.51+AM.png)


You can use Robo 3T to verify the url and ensure that the document has been successfully added to the database: 

Document found in database: 
(Note: Ensure URL is the same as the URL in the project. There should not be a trailing slash.)

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1561126788906_Screen+Shot+2019-06-21+at+10.14.12+AM.png)


Document found in database:

![](https://paper-attachments.dropbox.com/s_0D3260D1F77F98BFD246AAC8E61D328FA5FA54C9F631C1E217ECB2C208CC7952_1561126876366_Screen+Shot+2019-06-21+at+10.20.22+AM.png)


