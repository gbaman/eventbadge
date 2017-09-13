/* global Buffer */
'use strict';

var PDFDocument = require('pdfkit');
var moment = require('moment');

module.exports = function(data) {

	return new Promise(function(resolve, reject) {

		var bufs = [];
		var doc = new PDFDocument({
			size: [82.204, 255.118], // 100 x 62 mm in 'PDF points'
			margin:0,
			layout: 'landscape'
		});
		doc.registerFont('OpenSans-Regular', 'fonts/OpenSans-Regular.ttf');
		doc.registerFont('OpenSans-Bold', 'fonts/OpenSans-Bold.ttf');

		// Draw rectangle at bottom, fill black
		//doc.rect(0, 127, 283, 48).fill("black");

		/* Getting the correct path values for imported SVGs:
         *
         * 1. Set up the correct sized canvas in Method Draw (http://editor.method.ac/), using pixels as PDF points
         * 2. Import the SVG and position it in the right place
         * 3. File > Save to generate the SVG
         * 4. Inspect it to get the paths and convert to doc.path syntax from pdfkit docs
         */



		// Add event text to black bar, in white
		doc.moveDown(0.2)
		doc.fillColor('black');
		doc.fontSize(7);
		doc.font('OpenSans-Regular');
		doc.text(data.eventName, 30);
		//doc.text(moment(data.eventDate).format('Do MMMM YYYY'));
		
		doc.text("Order ID : ".concat(data.orderId))

		// Add name of attendee
		doc.fillColor('black');
		doc.fontSize(20);
		doc.font('OpenSans-Bold');
		doc.text(data.givenName.concat(" ".concat(data.familyName)), {align:'center'});



		doc.on('data', function(chunk) { bufs.push(chunk); });
		doc.on('end', function() { resolve(Buffer.concat(bufs)); });

		doc.end();
	});
};

