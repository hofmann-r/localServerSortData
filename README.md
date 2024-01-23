# Local Server Sort Data
 - What you will see here: 
   - A local server in node that consult an .csv file and return the data simulating a API request. 
   - Using a front-end interface to exibit the results.

# Basic packages
First, to run this application, it is necessary install node in the machine.
The download can be done with the link: https://nodejs.org/en/download.

After installing node, there are two ways to test this application: 
 - via terminal 
 - using a simple interface created in html

# Testing via terminal
1. With the node installed in the machine, open the terminal/powershell in the root folder of the project.
 - The base command to run the application is:
   - node .\scripts\runTerminal.js
        
2. To the search return the values properly, it will require some parameters along with the base execution line.
- Available parameters (you can provide just one, some of them or them all):
 - --name: partial of full name of the restaurant
 - --distance: maximum distance of the restaurant
 - --rating: minimal rating of the restaurant
 - --price: maximum price of the restaurant food
 - --cuisine: partial of full name of the cuisine type

3. For example, if you want to search a restaurant with partial name "cho" and max distance 10 miles. This is how you execute:
 - node .\scripts\runTerminal.js --name cho --distance 10

# Testing with interface
1. With the node installed in the machine, open the terminal/powershell in the root folder of the project and execute:
 - npm install
 - npm run dev
   - After this, the application will run in localhost with some random port. 
   - Get the url provided in the terminal to access the application in your browser.

# Observations
 - The main function for the search is in ./app/service/search.js - searchRestaurants(...)
 - I kept the interface very simple to focus on the results.