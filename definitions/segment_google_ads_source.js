const google = require("../");

google({
    //
    // Define the database and schema of your Google data
    sourceDatabaseName: "raw",
    sourceSchemaName: "google_ads",

    // Optional prefix metadata if applicable
    stagingTablePrefix: "stg_",
    defaultConfig: {
        //
        // Define the destination schema and table/view 
        database: "databaseName",
        schema: "segment_google_ads_source",
        tags: ["google ads", "source", "segment"],
        type: "table"
    },
});