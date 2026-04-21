let json = $input.all()[0].json;
let summaries = json.summary || json.text || [];
let titles = json.title || [];
let urls = json.url || [];
let images = json.image || [];
let bubbles = [];

let maxItems = Math.min(titles.length, 10);

for (let i = 0; i < maxItems; i++) {
    let title = titles[i] || "อัปเดตข่าวเศรษฐกิจ";
    let summary = summaries[i] || "ไม่มีบทสรุปสำหรับข่าวนี้";
    let url = urls[i] || "https://newsapi.org";
    let imageUrl = images[i] || "https://cdn-icons-png.flaticon.com/512/2965/2965879.png";

    let shareText = encodeURIComponent(`📰 ข่าวที่น่าสนใจ:\n${title}\n\nอ่านต่อที่: ${url}`);
    let shareLink = `https://line.me/R/msg/text/?${shareText}`;

    let bubble = {
        "type": "bubble",
        "size": "mega",
        "hero": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "image",
                    "url": imageUrl,
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover",
                    "action": { "type": "uri", "uri": url }
                },
                {
                    // Dark overlay strip at bottom of hero
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "text",
                            "text": "▌ BUSINESS NEWS",
                            "size": "xxs",
                            "color": "#C9A84C",
                            "weight": "bold",
                            "flex": 1
                        },
                        {
                            "type": "text",
                            "text": "ECONOMY",
                            "size": "xxs",
                            "color": "#AAAAAA",
                            "align": "end"
                        }
                    ],
                    "backgroundColor": "#0D1B2A",
                    "paddingStart": "14px",
                    "paddingEnd": "14px",
                    "paddingTop": "8px",
                    "paddingBottom": "8px",
                    "position": "absolute",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px"
                }
            ]
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#FFFFFF",
            "paddingTop": "14px",
            "paddingBottom": "6px",
            "paddingStart": "16px",
            "paddingEnd": "16px",
            "spacing": "sm",
            "contents": [
                {
                    // Gold accent bar + title row
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [],
                            "width": "3px",
                            "backgroundColor": "#C9A84C",
                            "cornerRadius": "2px"
                        },
                        {
                            "type": "text",
                            "text": title,
                            "weight": "bold",
                            "size": "md",
                            "color": "#0D1B2A",
                            "wrap": true,
                            "maxLines": 3,
                            "lineSpacing": "4px",
                            "margin": "sm"
                        }
                    ],
                    "spacing": "sm"
                },
                {
                    "type": "separator",
                    "margin": "sm",
                    "color": "#E8EDF2"
                },
                {
                    "type": "text",
                    "text": summary,
                    "size": "sm",
                    "color": "#4A5568",
                    "wrap": true,
                    "maxLines": 4,
                    "lineSpacing": "3px",
                    "margin": "sm"
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#0D1B2A",
            "paddingTop": "12px",
            "paddingBottom": "12px",
            "paddingStart": "16px",
            "paddingEnd": "16px",
            "spacing": "xs",
            "contents": [
                {
                    "type": "button",
                    "style": "primary",
                    "height": "sm",
                    "color": "#C9A84C",
                    "action": {
                        "type": "uri",
                        "label": "อ่านรายงานฉบับเต็ม",
                        "uri": url
                    }
                },
                {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "color": "#7A8FA6",
                    "action": {
                        "type": "uri",
                        "label": "↗  ส่งต่อให้เพื่อนร่วมงาน",
                        "uri": shareLink
                    }
                }
            ]
        }
    };

    bubbles.push(bubble);
}

let linePayload = {
    "to": "C209a38b643f0ff6e84ca40e86c44e133",
    "messages": [
        {
            "type": "flex",
            "altText": "📊 รายงานข่าวธุรกิจประจำวัน",
            "contents": {
                "type": "carousel",
                "contents": bubbles
            }
        }
    ]
};

return [{ json: linePayload }];
