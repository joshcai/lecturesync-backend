	var d ;
    var delay;
    var prev_time;
    var notes = [];
    function delay_function(delay){
      for(var i = 0; i < delay.length; i++)
      {
        setTimeout(function(){goNextNote()},delay[i]);
      }
    }
    // var url = 'http://cdn.mozilla.net/pdfjs/tracemonkey.pdf';

    //
    // Disable workers to avoid yet another cross-origin issue (workers need the URL of
    // the script to be loaded, and currently do not allow cross-origin scripts)
    //

    PDFJS.disableWorker = true;

    var pdfDoc = null,
        pageNum = 1,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');

    //
    // Get page info from document, resize canvas accordingly, and render page
    //
    function renderPage(num) {
      // Using promise to fetch the page
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(canvas.width / page.getViewport(1).width);
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
      });

      // Update page counters
      document.getElementById('page_num').textContent = pageNum;
      document.getElementById('page_count').textContent = pdfDoc.numPages;
    }
    function grabNote(){
    	notes.push($("#note").val());
    	$("#note").val("");
    }

    function goStart(){
//        startRecording();
//     toggleRecording(this);
        d = new Date();
        prev_time = d.getTime();
        console.log(prev_time);
        delay = [];
        $("#start").prop("disabled", true);
        $("#next").prop("disabled", false);
        $("#stop").prop("disabled", false);
    }
    function goStop(){
//        stopRecording();
  //   saveAudio();
        $("#replay").prop("disabled", false);
        $("#stop").prop("disabled", true);
        $("#next").prop("disabled", true);
        console.log("stop fired");
        $("#delay_values").val(JSON.stringify(delay));
        grabNote();
        $("#note_values").val(JSON.stringify(notes));
        $("#submit").prop("disabled", false);
   }
    //
    // Go to previous page
    //
    function goPrevious() {
      if (pageNum <= 1)
        return;
      pageNum--;
      renderPage(pageNum);
    }

    //
    // Go to next page
    //
    function goNext() {
      if (pageNum >= pdfDoc.numPages)
        return;
      pageNum++;
      renderPage(pageNum);
    }

    function goNextWrapper(){
      if(prev_time != 0)
      {
        var d = new Date();
        var temp_time = d.getTime();
        console.log(temp_time);
        delay.push(temp_time - prev_time);
      }
      grabNote();
      goNext();
    }
    function goNextNote(){
    	$("#note").val(notes[pageNum]);
    	goNext();
    }

    function goReplay(){
//     startReplay();
//     audio.play();
//     saveAudio();
     pageNum = 1;
     renderPage(pageNum);
     console.log(delay);
     $("#note").val(notes[0]);
     delay_function(delay);
    }
    //
    // Asynchronously download PDF as an ArrayBuffer
    //
    PDFJS.getDocument(doc).then(function(pdf){
      pdfDoc = pdf;
      renderPage(pageNum);
    })
  //http://www.html5rocks.com/en/tutorials/file/dndfiles/