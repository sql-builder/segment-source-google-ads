const crossDB = require("./crossDB");

const tableName = `ads`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_ads", {
        ...params.defaultConfig
    }).query(ctx => `
SELECT
    cast(original_id as string) as ad_id,
    adgroups.ad_campaign_id as ad_campaign_id,
    cast(adwords_customer_id as string) as ad_account_id,
    cast(null as string) as ad_name,
    status as ad_status,
    cast(source.ad_group_id as string) as ad_group_id,
    cast(null as string) as ad_bid_type,
    ${crossDB.castFloat(null, global.dataform.projectConfig.warehouse)} as ad_bid_amount,
    cast(null as string) as ad_utm_parameters,
    cast(null as string) as ad_utm_campaign,
    cast(null as string) as ad_utm_content,
    cast(null as string) as ad_utm_medium,
    cast(null as string) as ad_utm_source,
    cast(null as string) as ad_utm_term,
    cast(type as string) as ad_type,
    cast(final_urls as string) as ad_final_urls,
    cast(null as string) as ad_network_type,
    cast(null as string) as ad_criteria_type,
    'Google' as ad_network,
    uuid_ts as row_loaded_on,
    current_timestamp() as updated_on,
    'Segment' as source_name
FROM ${ctx.ref({ database: params.sourceDatabaseName, schema: params.sourceSchemaName, name: `${tableName}` })} as source
LEFT JOIN ${ctx.ref(params.defaultConfig.schema, params.stagingTablePrefix + "segment_google_ad_groups")} as adgroups
on source.ad_group_id = adgroups.ad_group_id
`)
}
