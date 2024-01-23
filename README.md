# Local Server Sort Data
 - What you will see here: 
   - A local server in node that consult an .csv file and return the data simulating an API request. 
   - Using a front-end interface to exibit the results.

# Basic packages
First, to run this application, it is necessary install node in the machine.
The download can be done with the link: https://nodejs.org/en/download.

After installing node, run:
- npm install

# Testing
- With the node installed in the machine, open the terminal/powershell in the root folder of the project and execute:
  - node .\server\runServer.js
    - The local server will run the application in the address http://localhost:4001
    - You can open the URL in your browser to check if the server is running
- There are 3 endpoints
  - POST - /restaurants
    - Request body fields -> check the restaurantService.js file
  - GET - /restaurants
    - url params -> check the restaurantService.js file
  - GET - /cuisines
    - no params needed
 
- Open a paralel terminal/powershell window and execute:
  - npm run dev
    - After this, the application will run in localhost.
    - Get the url provided in the terminal to access the application in your browser.
