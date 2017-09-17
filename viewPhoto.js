var url;
var id;
var description;
function readyPage(){
    loadPhoto();
    $("#deleteButton").click(deletePhoto);
}

function loadPhoto(){
    url = window.location.href;
    id = url.split('?')[1].split('=')[1];
    let $endpoint = $path_to_backend + 'viewPhoto.php?id=' + id;

    $.getJSON($endpoint, function(data)
    {
        let src = data[0].src;
        description = data[0].description;
        $("#image").attr("src", $path_to_backend + src);
        $("#description").html(description);
    });
}

function deletePhoto(){
    let $endpoint = $path_to_backend + 'deletePhoto.php';

    //Well this doesn't seem like it's working
    $.post($endpoint, {id: id},function(data){
        alert(data);
    });
}

function updatePhoto(){
    
}

$(document).ready(readyPage);