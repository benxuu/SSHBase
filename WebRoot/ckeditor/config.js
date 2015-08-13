/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
//	config.fullPage = true;
	config.height = '350px';
	config.skin = 'moonocolor';
	config.baseFloatZIndex = 19900;
	config.filebrowserBrowseUrl = '';
	config.filebrowserImageBrowseUrl = '';
	config.filebrowserFlashBrowseUrl = '';
	config.filebrowserUploadUrl = 'servlet/fileUploadServlet';
	config.filebrowserImageUploadUrl = 'servlet/fileUploadServlet';
	config.filebrowserFlashUploadUrl = 'servlet/fileUploadServlet';
	
	CKEDITOR.on( 'dialogDefinition', function( ev ){
	    // Take the dialog name and its definition from the event data.
	    var dialogName = ev.data.name;
	    var dialogDefinition = ev.data.definition;

	    // Check if the definition is from the dialog we're
	    // interested in (the 'link' dialog).
	    if ( dialogName == 'link' )
	    {
	        dialogDefinition.getContents('info').get('protocol')['items'].splice(0, 4);
	    }
	});
};
