const googleAds = require("./includes/segment_google_ads");
const googleAdsets = require("./includes/segment_google_ad_groups");
const googleCampaigns = require("./includes/segment_google_campaigns");
const googleAdPerformance = require("./includes/segment_google_ad_performance");

module.exports = (params) => {

    params = {
        // set defaults for parameters
        databaseName: "",
        schemaName: "",
        tablePrefix: "",
        stagingTablePrefix: "",
        stagingSchema: "",
        ...params
    };

    let segmentGoogleAds, segmentGoogleAdsets, segmentGoogleCampaigns, segmentGoogleAdPerformance;

    segmentGoogleAds = declare({
        ...params.defaultConfig,
        database: params.databaseName,
        schema: params.schemaName,
        name: "ads"
    });

    segmentGoogleAdsets = declare({
        ...params.defaultConfig,
        database: params.databaseName,
        schema: params.schemaName,
        name: "ad_groups"
    });

    segmentGoogleCampaigns = declare({
        ...params.defaultConfig,
        database: params.databaseName,
        schema: params.schemaName,
        name: "campaigns"
    });

    segmentGoogleAdPerformance = declare({
        ...params.defaultConfig,
        database: params.databaseName,
        schema: params.schemaName,
        name: "ad_performance_reports"
    });

    // Publish and return datasets.
    let result = {
        segmentGoogleAds: googleAds(params),
        segmentGoogleAdsets: googleAdsets(params),
        segmentGoogleCampaigns: googleCampaigns(params),
        segmentGoogleAdPerformance: googleAdPerformance(params)
    };

    return result;
}
