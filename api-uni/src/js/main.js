$(document).ready(function() {
    /**
    *   Tab Controls 
    */
    $('.section__head ul a').on('click', function(e) {
        e.preventDefault();

        const $btn = $(this);
        const $target = $($btn.attr('href'));

        $btn
            .parent()
            .addClass('active')
            .siblings()
            .removeClass('active');

        $target
            .addClass('active')
            .siblings()
            .removeClass('active');
    });

    /**
    *   Youtube API 
    */
    $.get('https://www.googleapis.com/youtube/v3/channels', {
        part: 'contentDetails',
        forUsername: 'Kurzgesagt',
        key: 'AIzaSyATnzqIcJ92O_jTC5mvXxl2I1xLg8V0XCo',
    }).done(function(userData) {
        const { uploads:pid } = userData.items[0].contentDetails.relatedPlaylists;
        getVideos(pid);
    });


    function getVideos(pid) {
        $.get('https://www.googleapis.com/youtube/v3/playlistItems', {
            part: 'snippet',
            maxResults: '6',
            playlistId: pid,
            key: 'AIzaSyATnzqIcJ92O_jTC5mvXxl2I1xLg8V0XCo',
        }).done(function(videoData) {
            appendVideos(videoData.items);
        }); 
    }

    function appendVideos(videos) {
        const $container = $('.tab-youtube .videos');

        for(const video of videos) {
            videoId = video.snippet.resourceId.videoId;

            const videoTemplate = `
                <div class="video">
                    <iframe src="https://www.youtube.com/embed/${videoId}"></iframe>
                </div>
            `;

            $container.append(videoTemplate);
        }
    }

    /**
    *   Unsplash API 
    */
    $('.search a').on('click', function(e) {
        e.preventDefault();

        const query = $(this).siblings('input').val();

        getImages(query);
    });
    
    function getImages(query) {
        $.get('https://api.unsplash.com/search/photos', {
            query,
            client_id: 'yxnOx6mk-UHiHjy8YkYRCDgj-Iq2EbwF8nynYtz8FCE',
        }).done(function(imageData) {
            appendImages(imageData.results);
        }); 
    }

    function appendImages(images) {
        const $container = $('.images');

        $container.empty();

        for(const image of images) {
            const imageTemplate = `
                <div class="image">
                    <img src="${image.urls.small}">
                </div>
            `;

            $container.append(imageTemplate);
        }
    }
});