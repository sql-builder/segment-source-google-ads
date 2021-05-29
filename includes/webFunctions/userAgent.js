// source: https://discourse.looker.com/t/parsing-user-agent-into-device-type-manufacturer-browser/1206/2

function platformStart(user_agent) {
    return `POSITION('(',${user_agent}) + 1`;
}

function platformRaw(user_agent) {
    return `SUBSTR(${user_agent}, ${platformStart(user_agent)}, 100)`;
}

function platformEndInitial(user_agent) {
    return `
    CASE
      WHEN POSITION(';',${platformRaw(user_agent)}) = 0
      THEN POSITION(')',${platformRaw(user_agent)})
      ELSE POSITION(';',${platformRaw(user_agent)})
    END`;
}

function platformEnd(user_agent) {
    return `
CASE WHEN ${platformEndInitial(user_agent)} = 0 THEN 0 ELSE ${platformEndInitial(user_agent)} - 1 END`;
}

function platform(user_agent) {
    return `
    CASE
      WHEN SUBSTR(${user_agent}, ${platformStart(user_agent)}, ${platformEnd(user_agent)}) = 'Linux' then 'Android'
      WHEN SUBSTR(${user_agent}, ${platformStart(user_agent)}, ${platformEnd(user_agent)}) = 'Macintosh' then 'Mac'
      ELSE SUBSTR(${user_agent}, ${platformStart(user_agent)}, ${platformEnd(user_agent)})
    END
    `;
}

function platform_category(platform) {
    return `
    CASE
      WHEN lower(${platform}) LIKE '%ipad%' THEN 'ipad'
      WHEN lower(${platform}) LIKE '%iphone%' THEN 'iphone'
      WHEN lower(${platform}) LIKE '%windows%' THEN 'windows'
      WHEN lower(${platform}) LIKE '%mac%' THEN 'mac'
      WHEN lower(${platform}) LIKE '%android%' THEN 'android'
      WHEN lower(${platform}) LIKE '%linux%' THEN 'android'
      WHEN lower(${platform}) LIKE '%x11%' THEN 'android'
      WHEN lower(${platform}) LIKE '%brew%' THEN 'android'
      WHEN lower(${platform}) LIKE '%playstation%' THEN 'playstation'
      WHEN lower(${platform}) LIKE '%nintendo%' THEN 'nintendo'
      WHEN lower(${platform}) LIKE '%bb10%' THEN 'blackberry'
      ELSE lower(${platform})
    END`;
}

function browser(user_agent) {
    return `
    CASE
      WHEN ${user_agent} LIKE '%Firefox/%' THEN 'Firefox'
      WHEN ${user_agent} LIKE '%Chrome/%' OR ${user_agent} LIKE '%CriOS%' THEN 'Chrome'
      WHEN ${user_agent} LIKE '%MSIE %' THEN 'IE'
      WHEN ${user_agent} LIKE '%MSIE+%' THEN 'IE'
      WHEN ${user_agent} LIKE '%Trident%' THEN 'IE'
      WHEN ${user_agent} LIKE '%iPhone%' THEN 'iPhone Safari'
      WHEN ${user_agent} LIKE '%iPad%' THEN 'iPad Safari'
      WHEN ${user_agent} LIKE '%Opera%' THEN 'Opera'
      WHEN ${user_agent} LIKE '%BlackBerry%' AND ${user_agent} LIKE '%Version/%' THEN 'BlackBerry WebKit'
      WHEN ${user_agent} LIKE '%BlackBerry%' THEN 'BlackBerry'
      WHEN ${user_agent} LIKE '%Android%' THEN 'Android'
      WHEN ${user_agent} LIKE '%Safari%' THEN 'Safari'
      WHEN ${user_agent} LIKE '%bot%' THEN 'Bot'
      WHEN ${user_agent} LIKE '%http://%' THEN 'Bot'
      WHEN ${user_agent} LIKE '%www.%' THEN 'Bot'
      WHEN ${user_agent} LIKE '%Wget%' THEN 'Bot'
      WHEN ${user_agent} LIKE '%curl%' THEN 'Bot'
      WHEN ${user_agent} LIKE '%urllib%' THEN 'Bot'
      ELSE ${user_agent}
    END`;
}

module.exports = {
    platform,
    platform_category,
    browser
}
