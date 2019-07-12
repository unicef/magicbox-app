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
    
