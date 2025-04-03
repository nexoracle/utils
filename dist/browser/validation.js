"use strict";
(() => {
  // lib/functions/validation.ts
  var urlValidator = {
    isURL(url) {
      const regex = /^(https?:\/\/)(www\.)?([\da-z.-]+)(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
      const ipv4Regex = /^(https?:\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
      const ipv6Regex = /^(https?:\/\/)?\[([a-f0-9:]+)\](?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
      const localhostRegex = /^(https?:\/\/)?localhost(?::(\d{1,5}))?([\/\w .-]*)*\/?(\?[&\w=.+-]*)?(#[\w-]*)?$/i;
      const fileRegex = /^file:\/\/\/?([\/\w .-]*)*\/?$/i;
      return regex.test(url) || ipv4Regex.test(url) || ipv6Regex.test(url) || localhostRegex.test(url) || fileRegex.test(url);
    },
    mediafire(url) {
      const regex = /https?:\/\/(www\.)?mediafire\.com\/(file\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+|view\/[a-zA-Z0-9]+\/[a-zA-Z0-9_\-\.]+(\/file)?|\?[a-zA-Z0-9]+|folder\/[a-zA-Z0-9]+)/;
      return regex.test(url);
    },
    gdrive(url) {
      const regex = /https:\/\/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|drive\/folders\/)|docs\.google\.com\/(?:uc\?export=download&id=|file\/d\/|document\/d\/)([\w-]{28,})(?:\/edit)?)/;
      return regex.test(url);
    },
    spotify(url) {
      const regex = /(https?:\/\/)?(open\.spotify\.com\/(track|album|artist|playlist|show|episode|user|collection|browse|search|genre|featured|creator|pod|station|embed)\/[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?|spotify:(track|album|artist|playlist|show|episode|user|collection|search|station):[a-zA-Z0-9]+(?:\?[a-zA-Z0-9_=&-]+)?)|spotify:user:[a-zA-Z0-9]+:playlist:[a-zA-Z0-9]+/;
      return regex.test(url);
    },
    tiktok(url) {
      const regex = /\bhttps?:\/\/(?:m|www|vm|vt)?\.?tiktok\.com\/(?:@[\w.-]+\/(?:video|photo)\/\d+|v\/\w+|t\/\w+|embed\/\w+|\?shareId=\d+|\?item_id=\d+|[\w.-]+|music\/[\w.-]+|tag\/[\w.-]+|amp\/[\w.-]+|effects\/[\w.-]+|trending\/[\w.-]+|discover\/[\w.-]+|hashtag\/[\w.-]+)\b/;
      return regex.test(url);
    },
    threads(url) {
      const regex = /\bhttps?:\/\/(?:www\.)?threads\.net\/(?:@?[\w.-]+(?:\/post\/[\w.-]+)?|post\/[\w.-]+|t\/[\w.-]+|explore|search|profile|direct|settings|activity)\b(?:\?.*)?$/;
      return regex.test(url);
    },
    twitter(url) {
      const regex = /\bhttps?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:@?[\w.-]+\/status\/\d+(?:\/(?:photo|video)\/\d+)?|@?[A-Za-z0-9_]{1,15}(?:\?[^#\s]*)?|search\?[^#\s]*|hashtag\/[^#\s]*|i\/web\/status\/\d+|explore|(?:i\/)?(?:moments|lists|topics|bookmarks)(?:\/[\w.-]+)?|(?:home|notifications|messages|explore|settings))\b(?:\?.*)?$/;
      return regex.test(url);
    },
    youtube(url) {
      const regex = /^(https?:\/\/)?(www\.|m\.|music\.)?(youtube\.com\/(?:watch\?v=|playlist\?list=|channel\/|c\/|user\/|embed\/|shorts\/|live\/|clip\/|hashtag\/|results\?search_query=|feed(?:\/[\w-]+)?|subscription_manager|account|reporthistory|view_all_playlists|premium|studio|movies|gaming)|youtu\.be\/)[a-zA-Z0-9\-_]*((?:\?|&)[^\s]*)?$/;
      return regex.test(url);
    },
    snapchat(url) {
      const regex = /https?:\/\/(?:www\.)?(?:snapchat\.com\/(?:add\/[A-Za-z0-9_.-]+|discover\/[A-Za-z0-9_.-]+|spotlight\/[A-Za-z0-9_.-]+|stories\/[A-Za-z0-9_.-]+|lens\/[A-Za-z0-9_.-]+|t\/[A-Za-z0-9_.-]+|snap\/[A-Za-z0-9_.-]+)|story\.snapchat\.com\/s\/[A-Za-z0-9_.-]+)/;
      return regex.test(url);
    },
    terabox(url) {
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mirrobox\.com|nephobox\.com|freeterabox\.com|1024tera\.com|4funbox\.co|4funbox\.com|terabox\.app|terabox\.com|1024tera\.co|1024terabox\.com|momerybox\.com|teraboxapp\.com|tibibox\.com|teraboxlink\.com)(?:\/s\/[A-Za-z0-9_-]+)?(?:\?.*)?$/;
      return regex.test(url);
    },
    instagram(url) {
      const regex = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories)\/([A-Za-z0-9_-]+)(?:\/)?(?:\?.*)?$/;
      return regex.test(url);
    },
    facebook(url) {
      const regex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:facebook|fb)\.(?:com|me|watch)\/(?:(?:[\w.]+\/)?(?:videos|photos|posts|events)\/(?:[\w-]+\/)?(?:[\d]+)|(?:profile\.php\?id=\d+)|(?:[\w.]+)|(?:groups\/[\w-]+))\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    linkedin(url) {
      const regex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|posts|pulse|jobs|feed|school|groups|events|showcase|learning)\/[a-zA-Z0-9\-_%.]+\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    reddit(url) {
      const regex = /^(https?:\/\/)?(www\.|old\.)?reddit\.com\/(r|user|comments)\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+){0,2}\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    pinterest(url) {
      const regex = /^(https?:\/\/)?(www\.)?(?:pinterest\.(?:com|ca|co\.uk|fr|de|jp|au)\/(?:pin\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?|[a-zA-Z0-9_-]+\/?)?(?:\?.*)?|i\.pinimg\.com\/(?:\d+x\/)?[a-zA-Z0-9_\/-]+\.[a-zA-Z0-9]+)$/;
      return regex.test(url);
    },
    whatsapp(url) {
      const regex = /^(https?:\/\/)?(www\.)?(whatsapp\.com\/(channel\/[a-zA-Z0-9_-]+|business|send|download|android|iphone|api|about|contact|security)|wa\.me\/[0-9]+|chat\.whatsapp\.com\/[a-zA-Z0-9_-]+)\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    discord(url) {
      const regex = /^(https?:\/\/)?((?:www\.)?(?:discord\.(?:gg|com|me)|discordapp\.com)(?:\/(?:invite\/[a-zA-Z0-9-]+|channels\/(?:\d+\/\d+\/?\d*)|users\/\d+|servers\/\d+|communities\/\d+))?|(?:www\.)?discord\.me\/[a-zA-Z0-9-_]+)\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    twitch(url) {
      const regex = /^(https?:\/\/)?(?:(?:www\.|m\.)?twitch\.tv\/(?:[a-zA-Z0-9\-_]+\/?(?:[a-zA-Z0-9\-_]+\/?)?)(?:video\/\d+|clip\/[a-zA-Z0-9\-_]+)?|clips\.twitch\.tv\/[a-zA-Z0-9\-_]+|(?:www\.)?twitch\.tv\/directory\/(?:game|category)\/[a-zA-Z0-9\-_%]+|(?:www\.)?twitch\.tv\/[a-zA-Z0-9\-_]+\/(?:videos|clips|collections|about|schedule))\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    stackoverflow(url) {
      const regex = /^(https?:\/\/)?((?:www\.)?stackoverflow\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+|a\/\d+|q\/\d+|search\?[^\/]+)|(?:[\w-]+\.)?stackexchange\.com\/(?:questions\/\d+(?:\/[\w-]+)?|users\/\d+(?:\/[\w-]+)?|tags\/[\w-]+))\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    medium(url) {
      const regex = /^(https?:\/\/)?(?:(?:www\.)?medium\.com\/(?:@[\w-]+(?:\/[\w-]+)?|[\w-]+\/[\w-]+|tag\/[\w-]+|topics\/[\w-]+|lists\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)\/?(?:\?.*)?$/;
      return regex.test(url);
    },
    extractUrlFromString(str) {
      const regex = /(https?:\/\/[^\s"'<>()]+)/i;
      const match = str.match(regex);
      return match ? match[0] : null;
    },
    extractAllUrlFromString(str) {
      const regex = /https?:\/\/[^\s"'<>()]+|www\.[^\s"'<>()]+/gi;
      const match = str.match(regex);
      return match ? match : null;
    },
    hasProtocol(url, protocol) {
      const regex = new RegExp(`^${protocol}:\\/\\/`, "i");
      return regex.test(url);
    },
    hasDomain(url, domain) {
      const regex = new RegExp(`^https?:\\/\\/(www\\.)?${domain}(\\/|$)`, "i");
      return regex.test(url);
    },
    hasPath(url, path) {
      const regex = new RegExp(`^https?:\\/\\/[^\\/]+\\/${path}`, "i");
      return regex.test(url);
    },
    hasQueryParam(url, param) {
      const regex = new RegExp(`[?&]${param}(=|&|$)`, "i");
      return regex.test(url);
    },
    hasFragment(url, fragment) {
      const regex = new RegExp(`#${fragment}$`, "i");
      return regex.test(url);
    },
    extractComponents(url) {
      const regex = /^(https?):\/\/([^\/?#]+)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/i;
      const match = url.match(regex);
      if (!match)
        return null;
      return {
        protocol: match[1],
        domain: match[2],
        path: match[3],
        query: match[4] || "",
        fragment: match[5] || ""
      };
    },
    isWithinLength(url, maxLength) {
      return url.length <= maxLength;
    },
    hasValidCharacters(url) {
      const regex = /^[a-zA-Z0-9\-._~:\/?#[\]@!$&'()*+,;=]+$/;
      return regex.test(url);
    }
  };
})();
