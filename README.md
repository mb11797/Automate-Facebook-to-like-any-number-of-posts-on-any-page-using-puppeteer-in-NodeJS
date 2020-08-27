# Automate-Facebook-to-like-any-number-of-posts-on-any-page-using-puppeteer-in-NodeJS

Automated the Facebook Post(s) Likes just to test the automation tools for education purposes and a little fun. There is no business purpose behind this. This is done in order to experiment the bounds of Automation in puppeteer for educational purposes. This project is written using Puppeteer Library for Automation tasks in NodeJS. 
A destination page is given on which posts need to be liked. The automation script written will direct browser to login and reach the page and like first n (given) posts on the page. 

Steps in the Automation Process:
1. Login Page
2. Enter Credentials
3. Click Login Button (Submit)
4. Wait for the News Feed Page to Load fully
5. Search for the given Page
6. Click the first Page from the Page Search Results
7. Wait for the Page to Load
8. Select the Posts container
9. Loop over all the posts
10. Extract the Like button of each Post
11. Click on the Like button

![demo-FB-Automation](https://user-images.githubusercontent.com/22445094/91477789-7f922000-e8bc-11ea-8c70-69617823a082.gif)
