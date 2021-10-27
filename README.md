## Dataform Google Ads (Source) ## 
This package models Google Ads data from the Segment connector using the Dataform data modeling layer.

```
**Test on:**
Snowflake: Tested
BigQuery: Un-tested
Redshift: Un-tested
```

# Includes
Include in your _package.json_ project file.

Packages: "segment-google-ads": "https://github.com/sql-builder/segment-source-google-ads.git"
  
# Configuration
The source model is built by placing the following javascript file into your definitions folder.

segment-google-ads-source.js
```javascript
const google = require("segment-sources/google-ads");

google({
    //
    // Define the database and schema of your Google data
    sourceDatabaseName: "source",
    sourceSchemaName: "google_ads",

    // Optional prefix metadata if applicable
    stagingTablePrefix: "stg_",
    defaultConfig: {
        //
        // Define the destination schema and table/view 
        database: "core",
        schema: "segment_google_ads_source",
        tags: ["google_ads", "source", "segment"],
        type: "view"
    },
});
```

```
The following variables are used to define the tables the model is built on and where the resulting sourse model is built to. This source model is setup to be easily integrated into an marketing integration model reguardless of what data ingestion/piping layer you chose.
Vars:
    sourceDatabaseName: Name of database where Segment is loading data,
    sourceSchemaName  : Name of schema where Segment is loading data,
    stagingTablePrefix: Prefix string for each table created [OPTIONAL],

    database: Name of destination database to build source tables too, 
    schema  : Name of destination schema to build source tables too,
    tags    : Dataform Tags for controlling scheduled runs,
    type    : Destination tables type [view,table]
```
    
# Destination Table Schema
```
Name: _segment_google_ad_groups_
Fields:
    ad_group_id,
    ad_campaign_id,
    ad_account_id,
    ad_group_name,
    ad_group_targeting,
    ad_group_status,
    ad_group_create_ts,
    ad_group_start_date,
    ad_group_end_date,
    ad_group_budget,
    ad_network,
    row_loaded_on,
    updated_on,
    source_name
```

```
Name: _segment_google_ad_performance_
Fields:
    ad_id,
    ad_campaign_id,
    ad_serve_ts,
    ad_avg_cost,
    ad_total_frequency,
    ad_total_clicks,
    ad_total_link_clicks,
    ad_total_impressions,
    ad_total_reach,
    ad_total_unique_clicks,
    ad_total_unique_impressions,
    ad_total_inline_post_engagements,
    ad_total_cost,
    ad_total_social_cost,
    ad_avg_time_on_site,
    ad_bounce_rate,
    ad_total_assisted_conversions,
    ad_total_conversion_value,
    ad_network,
    row_loaded_on,
    updated_on,
    source_name
```

```
Name: _segment_google_ads_
Fields:
    ad_id,
    ad_campaign_id,
    ad_account_id,
    ad_name,
    ad_status,
    ad_group_id,
    ad_bid_type,
    ad_bid_amount,
    ad_utm_parameters,
    ad_utm_campaign,
    ad_utm_content,
    ad_utm_medium,
    ad_utm_source,
    ad_utm_term,
    ad_type,
    ad_final_urls,
    ad_network_type,
    ad_criteria_type,
    ad_network,
    row_loaded_on,
    updated_on,
    source_name
```

```
Name: _segment_google_campaigns_
Fields:
    ad_campaign_id,
    ad_account_id,
    ad_campaign_name,
    ad_campaign_buying_type,
    ad_campaign_status,
    ad_campaign_end_date,
    ad_campaign_start_date,
    ad_network,
    row_loaded_on,
    updated_on,
    source_name
```
    
```
Name: _segment_google_campaign_performance_
Fields:
    ad_campaign_id,
    ad_serve_ts,
    ad_avg_cost,
    ad_campaign_status,
    ad_total_frequency,
    ad_total_clicks,
    ad_total_link_clicks,
    ad_total_impressions,
    ad_total_reach,
    ad_total_unique_clicks,
    ad_total_unique_impressions,
    ad_total_inline_post_engagements,
    ad_total_cost,
    ad_total_social_cost,
    ad_avg_time_on_site,
    ad_bounce_rate,
    ad_total_conversions,
    ad_total_conversion_value,
    ad_total_conversion_rate,
    ad_network,
    row_loaded_on,
    updated_on,
    source_name
```
    
# Contributions
Additional contributions to this package are very welcome! Please create issues or open PRs against master. Check out this post on the best workflow for contributing to a package.

_Resources:_
1. Provide feedback on our existing dataform packages or what you'd like to see next.
2. Check out our blog for the latest news on development and best practices: atadataco.com/blog.
3. Learn more about dataform in the company docs: https://docs.dataform.co/.
4. Check out our community for commonly asked Dataform questions and answers: https://dev.atadataco.com/topics/6156646.
5. Join the chat on Slack for live discussions and support: https://join.slack.com/t/atadataco/shared_invite/zt-ek4x9g3r-WD0Kzna55iMXF1hc~RqAQw.
