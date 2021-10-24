const crossDB = require("./crossDB");

const tableName = `campaigns`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_ad_campaigns", {
        ...params.defaultConfig
    }).query(ctx => `
SELECT
    cast(id as string) as ad_campaign_id,
    cast(adwords_customer_id as string) as ad_account_id,
    name as ad_campaign_name,
    cast(null as string) as ad_campaign_buying_type,
    status as ad_campaign_status,
    date(end_date) as ad_campaign_end_date,
    date(start_date) as ad_campaign_start_date,
    'Google' as ad_network,
    uuid_ts as row_loaded_on,
    current_timestamp() as updated_on,
    'Segment' as source_name
FROM ${ctx.ref({ database: params.sourceDatabaseName, schema: params.sourceSchemaName, name: `${tableName}` })}
`)
}
