$(document).ready(function () {
    viewAlbum(localStorage.getItem("id"));
});

function viewAlbum(albumName) {
    var albumPhotosKey = encodeURIComponent(albumName) + '/';
    s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
        if (err) {
            return alert('There was an error viewing your album: ' + err.message);
        }
        // `this` references the AWS.Response instance that represents the response
        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + albumBucketName + '/';

        var photos = data.Contents.map(function (photo) {
            var photoKey = photo.Key;
            var photoUrl = bucketUrl + encodeURIComponent(photoKey);
            return getHtml([
                '<li>',
                '<a href="#">',
                '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
                '</a>',
                '</li>',
            ]);
        });
        var message = photos.length ?
            '<p>Click on the X to delete the photo</p>' :
            '<p>You do not have any photos in this album. Please add photos.</p>';
        var htmlTemplate = [
            '<h2>',
            'Album: ' + albumName,
            '</h2>',
            message,
            '<div>',
            getHtml(photos),
            '</div>',
            '<input id="photoupload" type="file" accept="image/*">',
            '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
            'Add Photo',
            '</button>',
            '<button onclick="listAlbums()">',
            'Back To Albums',
            '</button>',
        ]
        document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    });
}