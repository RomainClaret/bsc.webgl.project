# Banana editor online

It is an online editor and interpreter for the HTML5, CSS3, JS, and GLSL languages.

## Current version: 1.1.0

## [Use it live](http://rocla.github.io/Banana-editor-Online/)

## [Wiki](https://github.com/Rocla/banana-editor-online/wiki)

Check it out for more information. ;)

## License

Banana Editor Online by [Romain Claret](http://www.romainclaret.com) is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## Plug and play version

You can find the plug and play version in the plug-and-play folder. Juste run the index.html file from any browser.

## Setup the project

- Create a new larvael project in a tmp folder
 > composer create-project laravel/laravel --prefer-dist

- Cut/Copy and Paste the whole content of the clone of this repertory and fuse the folders

- Set the new path of this git repertory to the fused folder just made

- Create the .env file, an exemple file is provided (you have to provide the database information)

- open the terminal at the root folder and do the following commands:

 > sudo chmod -R o+w storage<br>
 > composer dump-autoload<br>
 > composer update --no-scripts<br> 
 > composer update<br> 
 > php artisan vendor:publish<br>
 > php artisan cache:clear<br>
 > php artisan config:cache<br>
 > php artisan migrate:install<br>
 > php artisan migrate<br>
 > php artisan db:seed<br>
