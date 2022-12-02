# cookbook

To run the app, download the source code from this repository using
```
git clone https://github.com/Ananta-Ranganathan/cookbook.git
```
Next, install the necessary modules and run the start script for the client:
```
cd cookbook
cd cookbook-client
npm i
npm start
```
And in a new terminal window follow the same steps for the server:
```
cd ..
cd cookbook-server
npm i
```
However, before starting the server the .env file needs to be configured to allow access to the MongoDB Atlas cluster storing the application data
```
touch .env
```
Using your preferred text editor, add the following line to the .env file:
```
MONGODB_URI=mongodb+srv://<credentials>@cookbook.o9zgwes.mongodb.net/?retryWrites=true&w=majority
```
Now the server side is ready to be launched with
```
npm start
```

Congratulations! If you followed these steps you now have the cookbook client open in your browser at port 3000 and the server awaiting http requests at port 8000. The application is ready to be used.

