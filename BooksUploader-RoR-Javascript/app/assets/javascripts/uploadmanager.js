/**
/**
 * Upload Manager Module
 * @author Ignacio Leitao <ignacio.leitao@globant.com>
 *----------------------------------------------------------------------------*/

var UploadManager = (function() {

  var progressBar = $('#progress_bar'),
      progressNumber = $('#progress_number'),
      dropzone = $('.drop_zone'),
      sendButton = $('#accept-file'),
      cancelButton = $('#cancel_button');

  function updateProgress(evt) {
    if (evt.lengthComputable) {
      var percentComplete = parseInt((evt.loaded / evt.total) * 100);
      console.log('Upload' + percentComplete + '%');
      progressNumber.innerHTML = percentComplete.toString() +'%';
      //progressBar.value = percentComplete;
      progressBar.attr('value',percentComplete);
    } else {
      console.log('Unable to progress information since the total size  is unknown');
    }
  };

  function transferComplete(evt) {
    console.log('The transfer is complete.');
  };

  function transferFailed(evt) {
    console.log('An error occurred while transferring the file.');
  };

  function transferCanceled(evt) {
    console.log('The transfer has been canceled by the user.');
    // Borrar el archivo subido
  };

  var public_methods = {
    // events method
    events : function() {
      // binding dragover, dragleave and drop events on drop_zone
      // events on drop_zone
      dropzone.on({
        // dragover event
        dragover: function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          dropzone.css('background-color','#ff6d6d');
          // explicitly show this is a copy.
          evt.originalEvent.dataTransfer.dropEffect = 'copy';
        },
        // dragleave event
        dragleave: function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          dropzone.css('background-color','');
          // explicitly show this cannot be dropped here
          evt.originalEvent.dataTransfer.dropEffect = 'none';
        },
        // drop event
        drop: function(evt) {
          var files;
          evt.stopPropagation();
          evt.preventDefault();
          dropzone.css('background-color','');
          // files is a FileList of File object
          files = evt.originalEvent.dataTransfer.files;
          var selectedFile = files[0];
          if (selectedFile) {
            var fd = new FormData();
            fd.append('file', selectedFile);
            fd.append('bookId', $('.input_id').val());
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload');
            xhr.upload.addEventListener('progress', updateProgress, false);
            xhr.addEventListener('load', transferComplete, false);
            xhr.addEventListener('error', transferFailed, false);
            xhr.addEventListener('abort', transferCanceled, false);
            xhr.onreadystatechange = function () {
              if(xhr.response != '') {
                var response = JSON.parse(xhr.response);
                $('#book_id').attr('value',response['bookId']);
              }
            }
            xhr.send(fd);
          }
        }
      });
    }// end_events
  }; // end public

  return public_methods;

 }());
