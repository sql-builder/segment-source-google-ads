const segmentGoogleAds = require("./includes/segment_google_ads");
const segmentGoogleAdsets = require("./includes/segment_google_ad_groups");
const segmentGoogleCampaigns = require("./includes/segment_google_campaigns");
const segmentGoogleAdPerformance = require("./includes/segment_google_ad_performance");
const segmentGoogleCampaignPerformance = require("./includes/segment_google_campaign_performance");

    
module.exports = (params) => {

    params = {
        // set defaults for parameters
        sourceDatabaseName: "source",
        sourceSchemaName: "google_ads",
        stagingTablePrefix: "stg_",
        database: "source",
        schema: "segment_google_ads_source",
        tags: ["google ads", "source", "segment"],
        type: "table",
        ...params
    };

    const{ 
        defaultConfig,
        sourceDatabaseName,
        sourceSchemaName,
        stagingTablePrefix,
    } = params;

    let ads, adGroups, campaigns, adPerformance, campaignPerformance;

    ads = declare({
        ...params.defaultConfig,
        database: params.sourceDatabaseName,
        schema: params.sourceSchemaName,
        name: "ads"
    });

    adGroups = declare({
        ...params.defaultConfig,
        database: params.sourceDatabaseName,
        schema: params.sourceSchemaName,
        name: "ad_groups"
    });

    campaigns = declare({
        ...params.defaultConfig,
        database: params.sourceDatabaseName,
        schema: params.sourceSchemaName,
        name: "campaigns"
    });

    adPerformance = declare({
        ...params.defaultConfig, database: params.sourceDatabaseName,
        schema: params.sourceSchemaName,
        name: "ad_performance_reports"
    });

    campaignPerformance = declare({
        ...params.defaultConfig, database: params.sourceDatabaseName,
        schema: params.sourceSchemaName,
        name: "campaign_performance_reports"
    });
    
    // Publish and return datasets.
    let result = {
        ads: segmentGoogleAds(params),
        adGroups: segmentGoogleAdsets(params),
        campaigns: segmentGoogleCampaigns(params),
        adPerformance: segmentGoogleAdPerformance(params),
        campaignPerformance: segmentGoogleCampaignPerformance(params)
    };

    return result;
}
