const crossDB = require("./crossDB");

const tableName = `campaign_performance_reports`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_campaign_performance", {
        ...params.defaultConfig
    }).query(ctx => `
SELECT
    campaign_id ad_campaign_id,
    date_start as ad_serve_ts,
    ROUND(average_cost/ 1000000,2)  as ad_avg_cost,
    campaign_status as ad_campaign_status,
    cast(null as int)  as ad_total_frequency,
    clicks as ad_total_clicks,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_link_clicks,
    impressions as ad_total_impressions,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_reach,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_unique_clicks,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_unique_impressions,
    engagements as ad_total_inline_post_engagements,
    ROUND(cost / 1000000,2) as ad_total_cost,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_social_cost,
    average_time_on_site as ad_avg_time_on_site,
    bounce_rate as ad_bounce_rate,
    all_conversions as ad_total_conversions,
    all_conversion_value as ad_total_conversion_value,
    all_conversion_rate as ad_total_conversion_rate,
    'Google' as ad_network,
    uuid_ts as row_loaded_on,
    current_timestamp() as updated_on,
    'Segment' as source_name
FROM ${ctx.ref({ database: params.sourceDatabaseName, schema: params.sourceSchemaName, name: `${tableName}` })}
`)
}
