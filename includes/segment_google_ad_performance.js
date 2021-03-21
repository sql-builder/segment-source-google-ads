const crossDB = require("./crossDB");

const tableName = `ad_performance_reports`

module.exports = (params) => {

    return publish(params.stagingTablePrefix + "segment_google_ad_performance", {
        ...params.defaultConfig
    }).query(ctx => `
with source as ( 
    ${crossDB.filterSegment(ctx, params, tableName, `ad_id`)}
)    
SELECT
    cast(ad_id as string) as ad_id,
    date_start as ad_serve_ts,
    ${crossDB.safeDivide(`cost`, `clicks`)} as ad_avg_cost,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_frequency,
    clicks as ad_total_clicks,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_link_clicks,
    impressions as ad_total_impressions,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_reach,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_unique_clicks,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_unique_impressions,
    engagements as ad_total_inline_post_engagements,
    cost / 1000000 as ad_total_cost,
    ${crossDB.castInt(null, global.dataform.projectConfig.warehouse)} as ad_total_social_cost,
    average_time_on_site as ad_avg_time_on_site,
    bounce_rate as ad_bounce_rate,
    all_conversions as ad_total_assisted_conversions,
    all_conversion_value as ad_total_conversion_value,
    'Google' as ad_network,
    uuid_ts as row_loaded_on,
    current_timestamp() as updated_on,
    'Segment' as source_name
FROM source
`)
}

// with source as (
//     {{ filter_segment_relation(var('stg_google_ads_segment_ad_performance_table')) }}
// ),
// renamed as (
//     SELECT
//     date_start as ad_serve_ts,
//     cast(ad_id as string) as ad_id,
//     average_cost / 1000000          AS ad_avg_cost,
//         average_time_on_site as ad_avg_time_on_site,
//         bounce_rate as ad_bounce_rate,
//         click_assisted_conversions as ad_total_assisted_conversions,
//         clicks as ad_total_clicks,
//         conversion_value as ad_total_conversion_value,
//         cost / 1000000 as ad_total_cost,
//         cast(null as int64) as ad_total_impressions,
//         cast(null as int64) as ad_total_reach,
//         cast(null as int64) as as_total_unique_clicks,
//         cast(null as int64) as ad_total_unique_impressions,
//         'Google Ads' as ad_network
// FROM
// source)
// {% endif %}
// select
//     *
//     from
// renamed

// Ad Performance Report
// PROPERTY NAME	DESCRIPTION
// account_currency_code	The currency of the Customer account.
// account_descriptive_name	The descriptive name of the Customer account.
// active_view_impressions	How often your ad has become viewable on a Display Network site.
// active_view_measurability	The ratio of impressions that could be measured by Active View over the number of served impressions.
// active_view_measurable_cost	The cost of the impressions you received that were measurable by Active View.
// active_view_measurable_impressions	The number of times your ads are appearing on placements in positions where they can be seen.
// active_view_viewability	The percentage of time when your ad appeared on an Active View enabled site(measurable impressions) and was viewable(viewable impressions).
// ad_group_id	The ID of the AdGroup.
// ad_id	The ID of the Ad.
// adwords_customer_id	The 10 - digit Google Ads Customer ID.
// all_conversion_rate	How often a click on your ad resulted in a conversion.
// all_conversion_value	The total value of all of your conversions, including those that are estimated.
// all_conversions	Best estimate of the total number of conversions that Google Ads drives.Includes website, cross - device, and phone call conversions.
// average_cost	The average amount you pay per interaction.
// average_position	Your ad’s position relative to those of other advertisers.
// average_time_on_site	Total duration of all sessions(in seconds) / number of sessions.
// bounce_rate	Percentage of clicks where the user only visited a single page on your site.
// click_assisted_conversion_value	The total value of all conversions for which this keyword, ad, ad group, or campaign triggered assisted clicks.
// click_assisted_conversions	The total number of conversions for which this keyword, ad, ad group, or campaign contributed to one or more assisted clicks.
// click_assisted_conversions_over_last_click_conversions	The total number of conversions for which this keyword, ad, ad group, or campaign received in assisted clicks divided by the total number of conversions for which it triggered the last click.
// clicks	The number of clicks.
// conversion_value	The sum of conversion values for all conversions.
// conversions	The number of conversions for all conversion actions that you have opted into optimization.
// cost	The sum of your cost - per - click(CPC) and cost - per - thousand impressions(CPM) costs during this period.
// date_start	The date start formatted as yyyy - MM - dd.
// date_stop	The date stop formatted as yyyy - MM - dd.
// engagements	The number of engagements.An engagement occurs when a viewer expands your Lightbox ad.
// gmail_forwards	The number of times your ad was forwarded to someone else as a message.
// gmail_saves	The number of times someone has saved your Gmail ad to their inbox as a message.
// gmail_secondary_clicks	The number of clicks to your landing page on the expanded state of Gmail ads.
// impression_assisted_conversions	Total number of conversions for which this object triggered assist impressions prior to the last click.
// impressions	Count of how often your ad has appeared on a search results page or website on the Google Network.
// interaction_types	The types of interactions that are reflected in the Interactions, InteractionRate, and AverageCost columns.
// interactions	The number of interactions.An interaction is the main user action associated with an ad format–clicks for text and shopping ads, views for video ads, and so on.
// value_per_all_conversion	The value, on average, of all conversions.
// video_quartile_100_rate	Percentage of impressions where the viewer watched all of your video.
// video_quartile_25_rate	Percentage of impressions where the viewer watched 25 % of your video.
// video_quartile_50_rate	Percentage of impressions where the viewer watched 50 % of your video.
// video_quartile_75_rate	Percentage of impressions where the viewer watched 75 % of your video.
// video_view_rate	The number of views your TrueView video ad receives divided by its number of impressions, including thumbnail impressions for TrueView in -display ads.
// video_views	The number of times your video ads were viewed.
// view_through_conversions	The total number of view - through conversions.