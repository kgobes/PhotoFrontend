src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"

$('.grid').isotope({
  itemSelector: '.grid-item',
  masonry: {
    columnWidth: 200
  }
});

function pageLoad(){
    fetchPhotos(); 
    hidePopup();
}

function showPopup() {
    var popup = $("#uploadButton");
    popup.show();
}

//NOT WORKING !! 
function hidePopup() {
    var popup = $("#uploadButton");
    popup.hide();
    //alert('close');
    //popup.style.visibility = "hidden";
    //popup.style.opacity = 0;
    // popup.classList.toggle("show");

    //alert("close the box PLz");
}

function fetchPhotos() {
    // get the dive where the images should go
    var $tn_div = $("#thumbs");
    // just in case there's anything still in the thumbnails div, clear it out
    $tn_div.empty();

    // retrieve images from the database
    $endpoint = $path_to_backend + 'getPhotos.php';
    $.getJSON($endpoint, function(data)
    {
        jQuery.each(data, function(key, val)
        {
            // append the images to the div, and make them clickable for details
            
      //ATTEMPT to adjust based on height or width, might come back to later
            /*if($('<img />').height<200){
               $('<img />').wrap("<div class = 'grid-item'></div>")
            }
            else{
            <div class = 'grid-item--height2'></div>")
            }*/
            $('<img />')
                .wrap("<div class = 'popup' onclick='showPopup()'</div>")
                .wrap("<div class = 'grid-item'></div>")
                .wrap("<div class = 'grow'></div>")//class added for isotope grid
                .attr("src", $path_to_backend + val.tn_src)
                .attr("id", val.id).appendTo($tn_div)

                .wrap('<a href="viewPhoto.html?id=' + val.id + '"></a>');
            // .wrap('<a href=""></a>');
            hidePopup();
       
            });
    });
};

$(document).ready(pageLoad());

// verification for the file
$(':file').on('change', function() 
{
    var file = this.files[0];
    if (file.size > 10485760)
    {
        alert('Max upload size is 10 MB.');
    }
    // alert(file.name);
    // alert(file.type);
});

$(':button').on('click', function() 
{
    // for data, we want to submit the photo and the description
    var photoFormData = new FormData(document.forms['uploader']);
    $.ajax({
        url: $path_to_backend + 'uploadPhoto.php',
        type: 'POST',
        data: photoFormData,

        // some flags for jQuery
        cache: false,
        contentType: false,
        processData: false,

        // Custom XMLHttpRequest
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                // For handling the progress of the upload
                myXhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total,
                        });
                    }
                } , false);
            }

            myXhr.onreadystatechange = function() {
                if(myXhr.readyState == 4 && myXhr.status == 200){
                    fetchPhotos();
                }
            }
            return myXhr;
        }
    });
});