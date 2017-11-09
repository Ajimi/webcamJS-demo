$("#save").hide();
Webcam.set({
	width: 400,
	height: 300,
	image_format: 'jpeg',
	jpeg_quality: 90
});

Webcam.attach( '#my_camera' );

var button = document.querySelector("#capture");
button.addEventListener('click',take_snapshot, true);


function take_snapshot() {
	// take snapshot and get image data
	Webcam.snap( function(data_uri) {
		// display results in page
		document.getElementById('results').innerHTML = 
			'<h2>Voici votre image:</h2>' + 
			'<img src="'+data_uri+'"/>';
		$("#save").show();
		$("#save").on("click",function(){
			console.log("Server call");
			var username = 'jhuckaby';
			var image_fmt = 'jpeg';
			var url = 'myscript.php?username=' + username + '&format=' + image_fmt;

			// PHP Code you need to acces webcam data
			// move_uploaded_file($_FILES['webcam']['tmp_name'], 'webcam.jpg');
			Webcam.upload( data_uri, 'myscript.php', function(code, text) {
				// Upload complete!
				// 'code' will be the HTTP response code from the server, e.g. 200
				// 'text' will be the raw response content
			} );

		});
	} );
}
