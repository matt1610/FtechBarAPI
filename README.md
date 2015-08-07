


This is the Node.js Web API for The First Tech Bar.

It also includes the backend system to manage users, view and clear bills, and add menu items.

There is a lot that can be added to it from a security standpoint, as well as adding functionality.

At the moment one function we could use is to be able to settle portions of a users bill rather than only being able to clear the entire bill, this would require an extra field to be created on the User model to store the users total. At the moment no total is stored, the total is calculated on the front end based on the sum of all the orders.

This is a good project for us all to learn Node.Js as well as Angular JS for those who haven't ever used these technologies.

The Database is a mongo database hosted with Mongolabs, and the API itself is running in Azure.

The node_modules folder is not included in this repo, so if you pull it down to work on and run locally, make sure to install Node.JS obviously, and then run 'npm install' from the root to install all the node dependencies.

To run it locally you will also need to edit the variables in config/secrets.js, these are stored as environment variables in Azure and you will need to set them yourselves to be able to connect to your own instance of Mongo to be able to test.