const crossDB = require("./crossDB");
const sql = require("@dataform/sql")();

const tableName = `campaigns`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "google_campaigns", {
        ...params.defaultConfig
    }).query(ctx => `
with source as (
${crossDB.filterSegment(ctx, params, tableName, `id`)} )
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
FROM source
`)
}

// Campaigns
// PROPERTY NAME	DESCRIPTION
// adwords_customer_id	The 10 - digit Google Ads Customer ID.
// end_date	Date the campaign ends.
// name	Name of this campaign.
// received_at	This timestamp is added to incoming messages as soon as they hit Segment API.
// serving_status	Serving status of the campaign.
// start_date	Date the campaign begins.
// status	Status of the campaign.