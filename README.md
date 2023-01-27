# My Disc Database

### Overview

Disc golfers have a penchant for buying new discs, even if it’s only to use in a singular, particular situation. However, they don’t always remember if they already own a certain disc, one with similar flight characteristics, or the weight of theirs. This application is designed to allow disc golf players to catalog their discs. This is accomplished by having user's select the disc manufacturer, disc model/name, and plastic from an existing database (see Accessing the API Database below) which will also populate the flight characteristics: speed, glide, turn, and fade. Users are also able to manually input the disc's weight, as well as the primary color of the disc and either the secondary color or stamp color on the disc. All of this information is displayed on the user's Bag List page and the discs are separated into four categories (Distance Driver, Fairway Driver, Mid-Range, and Putt & Approach) as determined by speed.

![Bag List View GIF](https://github.com/benshelton32/nss-my-disc-database/blob/main/public/BagListView.gif)

### Project Information

This project was my front-end capstone for Nashville Software School. Because it was only front-end capstone, a JSON file and JSON server was used as the API for the project. That API is in a separate GitHub repository (https://github.com/benshelton32/nss-my-disc-database-api). I will include instructions both below and on the API's repository for running the JSON server.

Additionally, there is a log in feature, but it was used purely for demonstration purposes (although I did style it and the new user screen to match the rest of the application) and only requires an email to log in. You are more than welcome to create a new user or log into any of the users that do not have any discs already in the API to see that process. Currently, users Ben (UserId 1), Zach(UserId 2), and Bob (UserID 12) are the only ones with discs already on their profile in the API. The user Ben is my profile that I filled out with some of my actual discs that I play with, so ben@&#65279;ben.com can be used to log in if you would like to see either a fully fleshed out Bag List view or if you just want to check out part of my actual collection.

## Technologies Used

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JSON Server](https://user-images.githubusercontent.com/105528673/183158127-8d8c783d-19ad-4213-af19-1f54d91be8cb.png)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Running the Application

### Accessing the API Database

- Open terminal and run the following commands:

            git clone git@github.com:benshelton32/nss-my-disc-database-api.git
            cd nss-my-disc-database-api
            json-server -p 8088 database.json
            
            
### Accessing the Application

- Open a separate terminal window and run the following commands:

            git clone git@github.com:benshelton32/nss-my-disc-database.git
            cd nss-my-disc-database
            npm install
            npm start
            
- The application should launch on localhost:3000 and bring you to the log in screen. There you can either log in with an existing email from the API (once again, ben@&#65279;ben.com is a fully fleshed out profile) or click Sign Up Here to create a new user and start from scratch.

- Once logged in, there is an Add Disc button in the top left corner. This will take you to the form to add new discs for the user.
</br><strong>Note:</strong> The Add Disc form will not display all fields until a disc manufacturer is selected from the list.
