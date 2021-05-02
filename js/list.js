const episodeList = [
    {
        'no': 31,
        'season': 3,
        'episode': 1,
        'date': '2021-04-17 22:00',
        'urls': [
            'https://www.youtube.com/watch?v=lunYgcUVNRA',
            'https://streamtape.com/v/mqakaRr8GwcbL7Z/17.04.2021%3A_HBz_Home_Clubbing_%2331_%28S03E01%29.mp4',
            'https://app.hearthis.at/embed/5861332/transparent_black/?hcolor=&color=&style=2&block_size=2&block_space=1&background=1&waveform=0&cover=0&autoplay=0&css=',
            'https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FHBz_Archive%2F17042021-hbz-home-clubbing-s03e01-hc31%2F'
        ]
    },
    {
        'no': 32,
        'season': 3,
        'episode': 2,
        'date': '2021-04-24 22:00',
        'urls': [
            'https://www.youtube.com/watch?v=woUY3cNRCCc',
            'https://streamtape.com/v/Wq0oB4vy63sW7r/24.04.21%3A_HBz_Home_Clubbing_%2332_%28S03E02%29.mp4',
            'https://app.hearthis.at/embed/5861382/transparent_black/?hcolor=&color=&style=2&block_size=2&block_space=1&background=1&waveform=0&cover=0&autoplay=0&css=',
            'https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FHBz_Archive%2F24042021-hbz-home-clubbing-s03e02-hc32%2F'
        ]
    },
    {
        'no': 33,
        'season': 3,
        'episode': 3,
        'date': '2021-05-01 22:00',
        'urls': [
            'https://www.youtube.com/watch?v=bVDQQHql7SU',
            'https://streamtape.com/v/8K1L1zo9LeCobaJ/hc33.x264.shorter.mp4',
            'https://app.hearthis.at/embed/5879842/transparent_black/?hcolor=&color=&style=2&block_size=2&block_space=1&background=1&waveform=0&cover=0&autoplay=0&css=',
            'https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FHBz_Archive%2F01052021-hbz-home-clubbing-33-s03e03%2F'
        ]
    }
]

const width = '25%';
const height = '100%';
for(let episode of episodeList) {
    let title = `HBz Home Clubbing #${episode['no']} (S${tenPad(episode['season'])}E${tenPad(episode['episode'])})`;

    let ele = new HCEpisode(title);
    for(let url of episode['urls']) {
        if(url.indexOf('youtube') !== -1) {
            ele.addVideo(generateYoutubeEmbed(title, url));
        }
        if(url.indexOf('streamtape') !== -1) {
            ele.addVideo(generateStreamtapeEmbed(url));
        }
        if(url.indexOf('hearthis') !== -1) {
            ele.addVideo(generateHearthis(url));
        }
        if(url.indexOf('mixcloud.com') !== -1) {
            ele.addVideo(generateMixcloud(url));
        }
    }
    document.getElementById('episode-list').append(ele.getHTML());
}

function generateYoutubeEmbed(title, url) {
    let re = /\/watch\?v=([A-Za-z0-9-_]+)&?\/?/;
    let id = url.match(re)[1];
    let ele = document.createElement('iframe');
    ele.width = width;
    ele.height = height;
    ele.src = `https://www.youtube.com/embed/${id}`;
    ele.frameBorder = 0;
    ele.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    ele.allowFullscreen = true;
    return ele;
    //return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="${title}" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
}

function generateStreamtapeEmbed(url) {
    let re = /\/v\/([A-Za-z0-9]+)\//;
    let id = url.match(re)[1];
    let ele = document.createElement('iframe');
    ele.width = width;
    ele.height = height;
    ele.src = `https://streamtape.com/e/${id}/`;
    ele.allowFullscreen = true;
    ele.allowTransparency = true;
    ele.allow = "autoplay";
    ele.scrolling = "no";
    ele.frameBorder = 0;
    return ele;
    //return `<iframe src="https://streamtape.com/e/${id}/" width="560" height="315" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>`;
}

function generateHearthis(url) {
    // `<iframe scrolling="no" id="hearthis_at_track_5861332" width="100%" height="150" src="https://app.hearthis.at/embed/5861332/transparent_black/?hcolor=&color=&style=2&block_size=2&block_space=1&background=1&waveform=1&cover=0&autoplay=0&css=" frameborder="0" allowtransparency allow="autoplay"></iframe>`
    let ele = document.createElement('iframe');
    ele.width = width;
    ele.height = height;
    ele.src = url;
    ele.allowTransparency = true;
    ele.frameBorder = 0;
    ele.scrolling = "no";
    ele.allow = "autoplay";
    return ele;
}

function generateMixcloud(url) {
    // `<iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FHBz_Archive%2F17042021-hbz-home-clubbing-s03e01-hc31%2F" frameborder="0" ></iframe>`
    let ele = document.createElement('iframe');
    ele.width = width;
    ele.height = height;
    ele.src = url;
    ele.frameBorder = 0;
    ele.allow = "autoplay";
    return ele;
}

function tenPad(num) {
    if(num < 10) {
        return "0" + num;
    }
    return num;
}