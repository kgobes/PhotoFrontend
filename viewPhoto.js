var url;
var id;
var description;
function readyPage(){
    loadPhoto();
    $("#deleteButton").click(deletePhoto);
    $("#editButton").click(editDescription);
    $("#submitDescriptionChangeButton").click(updatePhoto);
    $("#editDescriptionForm").hide();
    
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
        //alert(data);
        location.href = "../";
    });
}

function editDescription(){
    $("#descriptionArea").val(description);
    $("#editDescriptionForm").show();
    //alert(description);    
    $("#editButton").hide();
    $('#description').hide();
}

function updatePhoto(){
    let $endpoint = $path_to_backend + 'updatePhoto.php';
    let newDescription = $("#descriptionArea").val();

    $.post($endpoint, {id: id, description: newDescription}, function(data){
        //alert(data);
        location.reload();
    });
}

$(document).ready(readyPage);