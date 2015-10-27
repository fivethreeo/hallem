{
    appDir: '../js',
    mainConfigFile: '../js/main.js',
    dir: '../dist/js',
    baseUrl: '..',
    allowSourceOverwrites: true,

    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'js/main'
        }
    ]
}