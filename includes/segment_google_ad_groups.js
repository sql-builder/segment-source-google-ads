const crossDB = require("./crossDB");

const tableName = `ad_groups`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_ad_groups", {
        ...params.defaultConfig
    }).query(ctx => `
with source as (
    ${crossDB.filterSegment(ctx, params, tableName, `id`)}
)
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
FROM source
`)
}

// Ad Groups
// PROPERTY NAME	DESCRIPTION
// adwords_customer_id	The 10 - digit Google Ads Customer ID.
// campaign_id	ID of the campaign with which this ad group is associated.
// name	Name of this ad group.
// received_at	This timestamp is added to incoming messages as soon as they hit Segment API.
// status	Status of this ad group.
