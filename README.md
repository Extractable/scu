# Schools First CU HTML Templates

## Middleman Project Setup

Extractable use Middleman during the development process, however, you do not need Middleman to see the output of the work. Middleman generates static HTML files which can be found in the /build directory of the repository. The main power for middleman that we leverage for this project is the templating language, and the abilities to pre-defined blocks of code across multiple pages for uniformity.

## Setup Instructions
* `git clone https://github.com/Extractable/scu.git
* `cd YOUR_PROJECT_NAME`
* `gem install bundler`
* `bundler install`
* `git remote add heroku git@heroku.com:scu-website.git`
* `bundle exec middleman` (to run in your local browser)
* `bundle exec middleman build` (to generate a build for tagging on the server)

## Development Documentation

### Github
If you are new to the git process in general, the following link is a great documentation resource to understand how to use each command and the available options.

[https://git-scm.com/docs](https://git-scm.com/docs)

### Middleman
Here are two helpful documentation links. It is recommended to also read though other sections.

* [https://middlemanapp.com/basics/templating_language/](https://middlemanapp.com/basics/templating_language/)
* [https://middlemanapp.com/basics/partials/](https://middlemanapp.com/basics/partials/)

### CSS
We use Sass (.scss) to create our CSS styles.

### GulpJS
Gulp is mainly used to compile the .scss files.  We found that this is much faster than using Middleman's built in sass compiler.

## Deploying
We currently use Heroku to stage our sites.  The Heroku instance is client-facing and only final (production ready) code should be uploaded.  Any experimental work should be done locally or on a separate hosting instance (Note: additional hosting instances are only made by request).

## Staging URL
Name | URL |
:------------ | :-------------  
**Staging** | <https://scu-website.herokuapp.com//>