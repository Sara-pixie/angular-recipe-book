building for production: ng build (ahead-of-time compilation)

deploying app on server:

- Use & check environment variables!!! (was done when connecting to Firebase...)
- Polish & test code
- Build app (terminal comand) - see building for production
- Deploy build artifacts (generaated files) to static host (HTML, JS, CSS) - see Firebase hosting

For Firebase hosting:

- npm install -g firebase-tools
- firebase login (sign in to Google - Firebase account)
- firebase init (initiate your project - from app root directory)
- Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public” - change to dist/app-name)
- firebase deploy

Hosting URL: https://angular-recipe-book-b5c47.web.app
