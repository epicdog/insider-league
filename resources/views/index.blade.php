<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Insider Champions League</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    @viteReactRefresh
    {{-- @vite("resources/js/app.js") --}} <!-- Due to a bug this is not working -->
    {!! vite_tags() !!}
</head>

<body class="antialiased">
    <div id="root"></div>
</body>

</html>
