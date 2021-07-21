# musvibe
This is a proff of concept test for a music listing app called musvibe

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
</ul>
<ul>
    <li>Auth microservice: Manages <code class="tomato">User</code> accounts and the <code  class="tomato">Auth</code> token management (using JWT). Given the low complexity of this, I decided to use a simple MVC.</li>
    <li>Resources back: Manages the <code  class="tomato">Playlists</code> and <code  class="tomato">Songs</code> API going through for the auth service if needed. Given the possible scalability needs of this, I decided to use DDD based clean Architecture: Hexagal Architecture. But given the small project and the available time, I decided to use modular monorepo to separate services as in functional Microservices but always maintaining it on the same repo to decrease the complexity of managing a lot of Network requests.</li>
</ul>
For a better understanding you can watch <a href="https://github.com/jmcontreras10/musvibe/blob/main/arch.png?raw=true">this</a> diagram.<br>
Finally for the database, I decided to use a <code  class="tomato">PostgressSQL</code> Database for the Auth service, given the structure of the information, and <code  class="tomato">MongoDB</code> for the resources back given the amount of data and low transactionality that we have there. In this case, I'm using <code  class="tomato">Docker</code> to easy deploy the resources.<br><br>

## **Endpoints**
Currently you're able to find each endpoint definition and usage on this
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

## Docs
<ol>
    <li>Initialized Typescript for node server</li>
</ol>
Start of this module: (9:00 AM of 07/21/2021 (COT))<br>

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