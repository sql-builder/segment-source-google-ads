const google = require("../");

google({
    //
    // Define the database and schema of your Google data
    // databaseName: "database_name",
    // schemaName: "schema_name",
    // Optional prefix metadata if applicable
    // stagingTablePrefix: "stg_",
    // // Define the destination schema and table/view
    // defaultConfig: {
    //     database: "database_name",
    //     schema: "schema_name",
    //     tags: ["google"],
    //     type: "table"

        //
        // Define the database and schema of your facebook data
    databaseName: "raw",
    schemaName: "google_ads",
        // Optional prefix metadata if applicable
        stagingTablePrefix: "stg_",
        // Define the destination schema and table/view
        defaultConfig: {
            database: "dv_prototype_db",
            schema: "dataform",
            tags: ["google"],
    type: "view"

    },
});
