const fs = require('fs');
const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");

const endpoint = "https://jjc-app.search.windows.net";
const apiKey = "2A24BEE0627BC1A906B27F0901477AD8";

// read JSON object from file
fs.readFile('./Dataset.json', 'utf-8', async (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const featuresObject = JSON.parse(data.toString());
    const features = featuresObject.features;

    const formattedDataset = features.map(feature => {
        const {properties,geometry} = feature;
        return {
            "id":feature.id,
            "submission_date":properties["Submission Date"],
            "name":properties.name,
            "description":properties.description,
            "phone":properties.phone,
            "color":properties.color,
            "keywords":properties.keywords?.split(',')?.map(keyword => keyword.trim()),
            "location": {"type": "Point", "coordinates": [geometry?.coordinates[0], geometry?.coordinates[1]]}
        }
    })
    // console.log(formattedDataset)

    // An index is where the documents are stored.
    const searchClient = new SearchClient(endpoint, "map-features", new AzureKeyCredential(apiKey));

    console.log('Uploading documents...');
    let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(formattedDataset);

    console.log(`Index operations succeeded: ${JSON.stringify(indexDocumentsResult.results[0].succeeded)}`);
});


