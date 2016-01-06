@extends('base')

@section('content')
<div class="container">
  <div class="row">

    <div class="panel panel-default">

      @if (count($errors) > 0)
      <div class="alert alert-danger">
        Don't worry, be happy <strong>It's not 404!</strong> but something went wrong.<br/><br/>
        <table>
          <tr>
            @foreach ($errors->all() as $error)
            <th>{{ $error }}</th>
            @endforeach
          </tr>
        </table>
      </div>
      @endif
      <div class="panel-heading">Below the DEMO, sign up for all functionalities</div>

      <div class="panel-body">

        <section id="main_container">
          <div id="banana_container">
            <div class="left box_margins 2boxes">
              <p>HTML</p>
              <textarea id="banana_html_content" data-code="html"></textarea>
            </div>
            <div class="left box_margins 2boxes" >
              <p>CSS</p>
              <textarea id="banana_css_content" data-code="css"></textarea>
            </div>
            <div class="left box_margins 1box">
              <p>JavaScript</p>
              <textarea id="banana_js_content" data-code="js"></textarea>
            </div>
            <div class="left box_margins 2boxes">
              <p>Vertex Shader</p>
              <textarea id="banana_vertex_content" data-code="vertex"></textarea>
            </div>
            <div class="left box_margins 2boxes">
              <p>Fragment Shader</p>
              <textarea id="banana_fragment_content" data-code="fragment"></textarea>
            </div>
            <div class="left box_margins 1box">
              <p>JavaScript Console</p>
              <textarea id="banana_js_console" disabled="true" data-code="text"></textarea>
            </div>
            <div id="below_container" class="clear">
              <p>Result</p>
              <iframe id="banana_output_frame"></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>

  </div>
</div>

@endsection
