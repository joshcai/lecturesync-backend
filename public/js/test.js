		var d;
		var delay;
		var doc = '/pdf/chicken2.pdf';
		var prev_time;
		function delay_function(delay){
			for(var i = 0; i < delay.length; i++)
			{
				setTimeout(function(){goNext()},delay[i]);
			}
		}
		PDFJS.disableWorker = true;
		var pdfDoc = null,
			pageNum = 1,
			scale = 0.8,
			canvas = document.getElementById('the-canvas'),
			ctx = canvas.getContext('2d');
		function renderPage(num) {
		pdfDoc.getPage(num).then(function(page) {
			var viewport = page.getViewport(scale);
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			var renderContext = {
				canvasContext: ctx,
				viewport: viewport
			};
			page.render(renderContext);
			});
			document.getElementById('page_num').textContent = pageNum;
			document.getElementById('page_count').textContent = pdfDoc.numPages;
		}
		function goStart(){
			d = new Date();
			prev_time = d.getTime();
			console.log(prev_time);
			delay = [];
			$("#start").prop("disabled", true);
			$("#stop").prop("disabled", false);
		}
		function goStop(){
			$("#start").prop("disabled", false);
			$("#stop").prop("disabled", true);
		}
		function goPrevious() {
		  if (pageNum <= 1)
			return;
		  pageNum--;
		  renderPage(pageNum);
		}

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
		  goNext();
		}

		function goReplay(){
		  pageNum = 1;
		  renderPage(pageNum);
		  console.log(delay);
		  delay_function(delay);
		}
		PDFJS.getDocument(doc).then(function(pdf){
		  pdfDoc = pdf;
		  renderPage(pageNum);
		})