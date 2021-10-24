const crossDB = require("./crossDB");

const tableName = `ad_groups`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_ad_groups", {
        ...params.defaultConfig
    }).query(ctx => `
SELECT
    cast(id as string) as ad_group_id,
    cast(campaign_id as string) as ad_campaign_id,
    cast(adwords_customer_id as string) as ad_account_id,
    name as ad_group_name,
    cast(null as string) as ad_group_targeting,
    status as ad_group_status,
    cast(null as timestamp) as ad_group_create_ts,
    date(null) as ad_group_start_date,
    cast(null as date) as ad_group_end_date,
    ${crossDB.castFloat(null, global.dataform.projectConfig.warehouse)} as ad_group_budget,
    'Google' as ad_network,
    uuid_ts as row_loaded_on,
    current_timestamp() as updated_on,
    'Segment' as source_name
FROM ${ctx.ref({ database: params.sourceDatabaseName, schema: params.sourceSchemaName, name: `${tableName}` })}
`)
}
