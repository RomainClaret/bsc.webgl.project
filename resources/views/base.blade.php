<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="_token" content="{!! csrf_token() !!}"/>

  <title>Banana Editor</title>

  <link rel="stylesheet" href="{{asset('/libs/bootstrap-3.3.5/css/bootstrap.min.css')}}" />
  <link rel="stylesheet" href="{{asset('/css/bananaEditor.css')}}" />
  <!-- <link rel="stylesheet" href="{{asset('/css/reset.css')}}" /> -->
  <link rel="stylesheet" href="{{asset('/css/bananaEditor.css')}}" />
  <!-- <link rel="stylesheet" href="{{asset('/css/stylesheet.css')}}" /> -->

  <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

  <!--<link href="{{asset('/libs/fonts/lato.css')}}" rel="stylesheet" type="text/css">-->

  <!--<script src="{{asset('/libs/jquery/js/jquery-1.11.3.min.js')}}"></script>-->
  <!--<script src="{{asset('/js/commonFunctions.js')}}"></script>-->
  <!--<script src="{{asset('/js/gl-matrix-min.js')}}"></script>-->
  <!--<script src="{{asset('/js/webglTools.js')}}"></script>-->
  <script src="{{asset('/libs/ace/src-noconflict/ace.js')}}" type="text/javascript" charset="utf-8"></script>
  <script src="{{asset('/libs/ace/src-noconflict/ext-language_tools.js')}}" type="text/javascript" charset="utf-8"></script>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="{{asset('/libs/bootstrap-3.3.5/js/bootstrap.min.js')}}"></script>
  <script src="{{asset('/libs/bananaEditor2.js')}}"></script>
</head>

<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">Banana Editor</a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          @if (Auth::check())
          <li><a href="{{ url('#') }}">File</a></li>
          <li><a href="{{ url('#') }}">View</a></li>
          <li><a href="{{ url('#') }}">Share</a></li>
          <li><a href="{{ url('#') }}">Settings</a></li>
          @endif
        </ul>

        <ul class="nav navbar-nav navbar-right">
          @if (Auth::guest())
          <li><a href="{{ url('#') }}">Login</a></li>
          <li><a href="{{ url('#') }}">Register</a></li>
          @else
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" role="button">
              Hello, {{ Auth::user()->username }}
              <span class="caret"></span>

            </a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="{{ url('#') }}">My Profile</a></li>
              <li><a href="{{ url('#') }}">Logout</a></li>
            </ul>
          </li>
          @endif
        </ul>
      </div>
    </div>
  </nav>

  @yield('content')

</body>
<script>
$.ajaxSetup({
  headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
});
</script>
</html>
