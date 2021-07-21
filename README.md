# musvibe
This is a proof of concept test for a music listing app called musvibe

# Requirements

To run this project you'll need to have installed on your pc:<br>
<ul>
    <li>NodeJs</li>
    <li>Docker</li>
    <li>docker-compose</li>
</ul>
Witht the previous elements ready you'll be able to run the project modules on this way:<br>
<ol>
    <li>Go to both AuthService and ResourcesBack and run <code class="terminal">docker-compose up -d</code>, this will activate the database service to allow you store data. And run <code class="terminal">npm install</code> to install the required dependencies in both modules.</li>
    <li>Go to both AuthService and start the app using <code class="terminal">npm run dev</code></li>
    <li>Go to both ResourcesBack and start the app using <code class="terminal">npm run dev</code></li>
    <li>And that's it, tou'll be able to use the project :) "Happy Hacking!"</li>
</ol>


# Some extra files

In each project you'll find a collection.json: <code>auth_collection.json</code> on the AuthService, and <code>musvibe_collection.json</code> on the ResourcesBack. This files are Postman Collections that you can import to your Postman and run to test the enpoints.

# Architecture and Design

## **On the scope**

After the idea of the app I defined 4 entities:<br>
<ul>
    <li>Auth</li>
    <li>User</li>
    <li>Playlist</li>
    <li>Song</li>
    <li>Feed</li>
</ul>
<br/>
    Auth microservice: Manages <code class="tomato">User</code> accounts and the <code  class="tomato">Auth</code> token management (using JWT). Given the low complexity of this, I decided to use a simple MVC.
    Resources back: Manages the <code  class="tomato">Playlists</code>, <code  class="tomato">Songs</code>, and  <code  class="tomato">Feed</code> API going through for the auth service if needed. Given the possible scalability needs of this, I decided to use DDD based clean Architecture: Hexagal Architecture. 

### Some advantages of using monorepo
<ol>
    <li>The power of having all in the same place allows a better and fastern communication between the modules</li>
    <li>The modularity of the microservices on the individual design allows you to break down them when you need it</li>
    <li>Scalability</li>
    <li>Elegant maintainability</li>
</ol>

For a better understanding you can watch <a href="https://github.com/jmcontreras10/musvibe/blob/main/arch.png?raw=true">this</a> diagram.<br>
Finally for the database, I decided to use a <code  class="tomato">PostgressSQL</code> Database for the Auth service, given the structure of the information, and <code  class="tomato">MongoDB</code> for the resources back given the amount of data and low transactionality that we have there. In this case, I'm using <code  class="tomato">Docker</code> to easy deploy the resources.<br><br>

## **Endpoints**
With the endpoints created that you could find in the postman files (Auth and services), you will be able to:<br/>
### Manage your user account and authentication
<ol>
    <li>[POST] /login</li>
    <li>[POST] /logout</li>
    <li>[POST] /register</li>
    <li>[GET]  /me</li>
</ol>

### Fetch some cool songs we have for you with youtube links
<ol>
    <li>[GET]  /songs</li>
    <li>[GET]  /songs/:id</li>
</ol>

### Add some feedback to that songs (like for now)
<ol>
    <li>[POST] /feeds/:id</li>
    <li>[GET]  /feeds/</li>
</ol>

### Create your own playlist based on out songs list
<ol>
    <li>[GET]     /playlists/:playlist_id</li>
    <li>[GET]     /playlists/</li>
    <li>[POST]    /playlists/</li>
    <li>[PUT]     /playlists/:playlist_id</li>
    <li>[DELETE]  /playlists/:playlist_id</li>
    <li>[DELETE]  /playlists/</li>
</ol>

### Of course you can get, add and remove songs from your playlists
<ol>
    <li>[GET]     /playlists/:playlist_id/songs/</li>
    <li>[POST]    /playlists/:playlist_id/songs/:song_id</li>
    <li>[DELETE]  /playlists/:playlist_id/songs/:song_id</li>
</ol>

### Notes
The get listing methods allows pagination using the follow query params (?key=vaue):. 'page' to select the page, and 'pageSize' to select the page size.<br/>
Soon, I'll be publishing a complete Swagger API Documentation for tis API.<br/>
The implementationf of this backend was though with clean code principle in mind, does it means you will not find commentaries but very good names that ilustrate the why of: the variables, functions, interfaces nd other elements

## **Suggestions and Ideas for the system**
<ol>
    <li>Use a MQTT service to asyncronous comunicate the system in some operations like delete a resource.</li>
    <li>Use a Redis DB as caché for the user accounts on the Backend side to improve the response time and decrease the requests to the AuthServer.</li>
    <li>Use a MQTT service to asyncronous comunicate the system in some operations like delete a resource</li>
</ol>

# Backlog

This project was started at 10:43AM of 07/16/2021 (COT).<br>
This applicaion is a music directory that stores songs, albums, and artists.<br>
In addition you can create an account and private playlists based on the available songs.

## Implementation [Auth Service] 
<ol>
    <li>Initialized Typescript for node server</li>
    <li>Database and Docker</li>
    <li>Auth endpoints: /register, /login and /logout</li>
    <li>User endpoints: /me</li>
</ol>
Start of this module: (12:36 PM of 07/16/2021 (COT))<br>
End of this module: (09:26 PM of 07/17/2021 (COT))<br>
<strong>Some feedback:</strong> I got some troubles with sequelize and typescript (Both at the same time, but solved)

## Implementation [Resource Services]
<ol>
    <li>Initialized Typescript for node server</li>
</ol>
Start of this module: (9:00 AM of 07/19/2021 (COT))<br>
End of this module: (8:00 AM of 07/21/2021 (COT))<br>

## Implementation [More Services & Bugs solving]
<ol>
    <li>Initialized Typescript for node server</li>
</ol>
Start of this module: (9:00 AM of 07/21/2021 (COT))<br>
End of this module: (3:30 PM of 07/21/2021 (COT))<br>
## Docs
<ol>
    <li>Initialized Typescript for node server</li>
</ol>
Start of this module: (8:10 AM of 07/21/2021 (COT))<br>
End of this module: (3:43 AM of 07/21/2021 (COT))<br>

<style>
    code{
        padding: 2px 5px;
        border-radius: 3px;
    }

    .tomato {
        background-color:#c0ffc821;
        color: white;
    }

    .terminal{   
        background-color: #000;
        color: #63de00;
    }
</style>