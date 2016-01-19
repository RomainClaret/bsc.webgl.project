(function() {
	"use strict";
	window.onload = function() {

		live_updater.result_error_handler = document.createElement("input");
		live_updater.result_error_handler.setAttribute('id',"HIDDEN_result_js_error_handler");
		live_updater.result_error_handler.setAttribute("type", "hidden");
		document.getElementById('banana_container').appendChild(live_updater.result_error_handler);

		live_updater.lock_onchange_js = true;
		live_updater.lock_onchange_vertex = true;
		live_updater.lock_onchange_fragment = true;
		live_updater.timeout_onchange = 1000;
		live_updater.min_lines_textarea = 5;
		live_updater.max_lines_textarea = 30;

		dimensioner();

		ace.require("ace/ext/language_tools");

		live_updater.banana_html_content_editor = ace.edit("banana_html_content");
		live_updater.banana_html_content_editor.$blockScrolling = Infinity;
		live_updater.banana_html_content_editor.setTheme("ace/theme/tomorrow_night_eighties");
		live_updater.banana_html_content_editor.session.setMode("ace/mode/html");
		live_updater.banana_html_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_html_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

		live_updater.banana_css_content_editor = ace.edit("banana_css_content");
		live_updater.banana_css_content_editor.$blockScrolling = Infinity;
		live_updater.banana_css_content_editor.setTheme("ace/theme/tomorrow");
		live_updater.banana_css_content_editor.session.setMode("ace/mode/css");
		live_updater.banana_css_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_css_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

		live_updater.banana_js_content_editor = ace.edit("banana_js_content");
		live_updater.banana_js_content_editor.$blockScrolling = Infinity;
		live_updater.banana_js_content_editor.setTheme("ace/theme/tomorrow_night_blue");
		live_updater.banana_js_content_editor.session.setMode("ace/mode/javascript");
		live_updater.banana_js_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_js_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

		live_updater.banana_vertex_content_editor = ace.edit("banana_vertex_content");
		live_updater.banana_vertex_content_editor.$blockScrolling = Infinity;
		live_updater.banana_vertex_content_editor.setTheme("ace/theme/terminal");
		live_updater.banana_vertex_content_editor.session.setMode("ace/mode/glsl");
		live_updater.banana_vertex_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_vertex_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

		live_updater.banana_fragment_content_editor = ace.edit("banana_fragment_content");
		live_updater.banana_fragment_content_editor.setTheme("ace/theme/cobalt");
		live_updater.banana_fragment_content_editor.session.setMode("ace/mode/glsl");
		live_updater.banana_fragment_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_fragment_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea,
			enableBasicAutocompletion: true,
			enableSnippets: true,
			enableLiveAutocompletion: false
		});

		live_updater.banana_console_display_editor = ace.edit("banana_js_console");
		live_updater.banana_console_display_editor.setTheme("ace/theme/cobalt");
		live_updater.banana_console_display_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_console_display_editor.setOptions({
			maxLines: 1,
			minLines: 1,
			readOnly: true
		});

		live_updater.banana_import_content_editor = ace.edit("banana_import_content");
		live_updater.banana_import_content_editor.$blockScrolling = Infinity;
		live_updater.banana_import_content_editor.setTheme("ace/theme/tomorrow");
		live_updater.banana_import_content_editor.session.setMode("ace/mode/html");
		live_updater.banana_import_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_import_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea
		});

		live_updater.banana_export_content_editor = ace.edit("banana_export_content");
		live_updater.banana_export_content_editor.$blockScrolling = Infinity;
		live_updater.banana_export_content_editor.setTheme("ace/theme/tomorrow");
		live_updater.banana_export_content_editor.session.setMode("ace/mode/html");
		live_updater.banana_export_content_editor.setAutoScrollEditorIntoView(true);
		live_updater.banana_export_content_editor.setValue("Nothing to export...");
		live_updater.banana_export_content_editor.setOptions({
			maxLines: live_updater.max_lines_textarea,
			minLines: live_updater.min_lines_textarea
		});

		//caching required DOM references
		live_updater.result = document.getElementsByTagName('iframe')[0].contentWindow.document;
		live_updater.result_head = (live_updater.result).getElementsByTagName('head')[0];
		live_updater.result_body = (live_updater.result).getElementsByTagName('body')[0];
		live_updater.result_body.setAttribute("onload","initWebGL()");

		//append style tag to hold custom styles
		live_updater.result_style = (live_updater.result_head).appendChild((live_updater.result).createElement('style'));

		var error_handler_script = (live_updater.result).createElement('script');
		error_handler_script.textContent = "window.onerror = function(message, url, lineNumber) {parent.document.getElementById('HIDDEN_result_js_error_handler').value = 'Error: '+message;return true;};window.alert=function(){};";

		//append jQuery
		var jquery_script = (live_updater.result).createElement('script');
		jquery_script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
		jquery_script.setAttribute("type",'text/javascript');
		jquery_script.setAttribute("charset",'utf-8');

		//append commonFunctions
		var externalCommonFunctions = (live_updater.result).createElement('script');
		externalCommonFunctions.src = "js/commonFunctions.js";
		externalCommonFunctions.setAttribute("type",'text/javascript');
		externalCommonFunctions.setAttribute("charset",'utf-8');

		//append gl-matrix-min
		var externalGLMatrixMin = (live_updater.result).createElement('script');
		externalGLMatrixMin.src = "js/gl-matrix-min.js";
		externalGLMatrixMin.setAttribute("type",'text/javascript');
		externalGLMatrixMin.setAttribute("charset",'utf-8');

		//append webglTools
		var externalWebGLTools = (live_updater.result).createElement('script');
		externalWebGLTools.src = "js/webglTools.js";
		externalWebGLTools.setAttribute("type",'text/javascript');
		externalWebGLTools.setAttribute("charset",'utf-8');

		(live_updater.result_head).appendChild(error_handler_script);
		(live_updater.result_head).appendChild(jquery_script);
		(live_updater.result_head).appendChild(externalCommonFunctions);
		(live_updater.result_head).appendChild(externalGLMatrixMin);
		(live_updater.result_head).appendChild(externalWebGLTools);

		//append script tag to hold custom javascript code
		live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

		//append script tag to hold custom vertex shader code
		live_updater.result_vertex = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		(live_updater.result_vertex).setAttribute("id","shader-vs");
		(live_updater.result_vertex).setAttribute("type","x-shader/x-vertex");

		//append script tag to hold custom fragment shader code
		live_updater.result_fragment = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
		(live_updater.result_fragment).setAttribute("id","shader-fs");
		(live_updater.result_fragment).setAttribute("type","x-shader/x-fragment");

		document.getElementById('btn_empty_all').addEventListener("click", btn_empty_all);
		document.getElementById('btn_editor').addEventListener("click", btn_editor);
		document.getElementById('btn_import').addEventListener("click", btn_import);
		document.getElementById('btn_export').addEventListener("click", btn_export);
		document.getElementById('btn_extract_data_from_file').addEventListener("click", btn_extract_data_from_file);
		
		live_updater();

		$("#import_container").hide();
		$("#export_container").hide();

		//Hidden and unfinished feature
		$("#btn_import").hide();
	};

	function dimensioner() {
		var dim_width = document.getElementById('banana_container').offsetWidth;

		$('.3boxes').css({
			'width': ((dim_width - 6) / 3) + "px"
		});
		$('.2boxes').css({
			'width': ((dim_width - 6) / 2) + "px"
		});
		$('.1box').css({
			'width': ((dim_width - 6)) + "px"
		});
		$('#banana_output_frame').css({
			'width': ((dim_width)) + "px"
		});
	}

	window.onresize = function(event) {
		dimensioner();
	};

	function live_updater() {

		live_updater.banana_html_content_editor.getSession().on("change", function () {
			//append html
			(live_updater.result_body).innerHTML = live_updater.banana_html_content_editor.getSession().getValue();
			live_updater.banana_console_display_editor.getSession().setValue(document.getElementById('HIDDEN_result_js_error_handler').value);
		});

		live_updater.banana_js_content_editor.getSession().on("change", function () {
			setTimeout(function(){
				if(live_updater.lock_onchange_js)
				{
					live_updater.lock_onchange_js = false;
					if (!live_updater.banana_js_content_editor.getSession().getAnnotations().hasOwnProperty("0")) {
						//append html
						(live_updater.result_body).innerHTML = live_updater.banana_html_content_editor.getSession().getValue();

						//append custom javascript
						(live_updater.result_head).removeChild(live_updater.result_script);
						live_updater.result_script = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));

						(live_updater.result_script).textContent = '//<![CDATA['+"\n"+live_updater.banana_js_content_editor.getSession().getValue()+"\n"+'//]]>';
					}
					live_updater.lock_onchange_js = true;
				}
				live_updater.banana_console_display_editor.getSession().setValue(document.getElementById('HIDDEN_result_js_error_handler').value);
			}, live_updater.timeout_onchange);
		});

		live_updater.banana_css_content_editor.getSession().on("change", function () {
			//append css
			(live_updater.result_style).textContent = live_updater.banana_css_content_editor.getSession().getValue();
			live_updater.banana_console_display_editor.getSession().setValue(document.getElementById('HIDDEN_result_js_error_handler').value);

		});

		live_updater.banana_vertex_content_editor.getSession().on("change", function () {
			setTimeout(function(){
				if(live_updater.lock_onchange_js)
				{
					live_updater.lock_onchange_vertex = false;
					if (!live_updater.banana_vertex_content_editor.getSession().getAnnotations().hasOwnProperty("0")) {
						//append custom vertex shader
						(live_updater.result_head).removeChild(live_updater.result_vertex);
						live_updater.result_vertex = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
						(live_updater.result_vertex).setAttribute("id","shader-vs");
						(live_updater.result_vertex).setAttribute("type","x-shader/x-vertex");

						(live_updater.result_vertex).textContent = '//<![CDATA['+"\n"+live_updater.banana_vertex_content_editor.getSession().getValue()+"\n"+'//]]>';
					}
					live_updater.lock_onchange_vertex = true;
				}
				live_updater.banana_console_display_editor.getSession().setValue(document.getElementById('HIDDEN_result_js_error_handler').value);
			}, live_updater.timeout_onchange);
		});

		live_updater.banana_fragment_content_editor.getSession().on("change", function () {
			setTimeout(function(){
				if(live_updater.lock_onchange_fragment)
				{
					live_updater.lock_onchange_fragment = false;
					if (!live_updater.banana_fragment_content_editor.getSession().getAnnotations().hasOwnProperty("0")) {
						//append custom fragment shader
						(live_updater.result_head).removeChild(live_updater.result_fragment);
						live_updater.result_fragment = (live_updater.result_head).appendChild((live_updater.result).createElement('script'));
						(live_updater.result_fragment).setAttribute("id","shader-fs");
						(live_updater.result_fragment).setAttribute("type","x-shader/x-fragment");

						(live_updater.result_fragment).textContent = '//<![CDATA['+"\n"+live_updater.banana_fragment_content_editor.getSession().getValue()+"\n"+'//]]>';
					}
					live_updater.lock_onchange_fragment = true;
				}
				live_updater.banana_console_display_editor.getSession().setValue(document.getElementById('HIDDEN_result_js_error_handler').value);
			}, live_updater.timeout_onchange);
		});
	}

	function btn_empty_all()
	{
		live_updater.banana_html_content_editor.getSession().setValue("");
		live_updater.banana_js_content_editor.getSession().setValue("");
		live_updater.banana_css_content_editor.getSession().setValue("");
		live_updater.banana_vertex_content_editor.getSession().setValue("");
		live_updater.banana_fragment_content_editor.getSession().setValue("");
		live_updater.banana_console_display_editor.getSession().setValue("");
	}

	function btn_import()
	{
		$("#panel_title").html("Import a file");
		$("#main_container").hide();
		$("#import_container").show();
		$("#export_container").hide();
		$("#btn_empty_all").hide();
		
		$.get("index.html", function(data) {
			live_updater.banana_import_content_editor.getSession().setValue(data);
		});
	}

	function btn_export()
	{
		$("#panel_title").html("Export as a file");
		$("#main_container").hide();
		$("#import_container").hide();
		$("#export_container").show();
		$("#btn_empty_all").hide();
		
		var content = document.getElementsByTagName('iframe')[0].contentWindow.document.documentElement.outerHTML;
    	live_updater.banana_export_content_editor.getSession().setValue(content);
		document.getElementById('download_file').href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(content);
	}

	function btn_editor()
	{
		$("#panel_title").html("Online Editor");
		$("#main_container").show();
		$("#import_container").hide();
		$("#export_container").hide();
		$("#btn_empty_all").show();
	}

	function btn_extract_data_from_file()
	{
		//(live_updater.result_body).innerHTML = live_updater.banana_html_content_editor.getSession().getValue();
		
		var found = $(live_updater.banana_import_content_editor.getSession().getValue()).filter("body");
		console.log(found);
		live_updater.banana_html_content_editor.getSession().setValue(found.outerHTML);
		
	}
})();
