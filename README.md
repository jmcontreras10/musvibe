# musvibe
This is a proff of concept test for a music listing app called musvibe

# Backlog

This project was started at 10:43AM of 07/16/2021 (COT).<br>
This applicaion is a music directory that stores songs, albums, and artists.<br>
In addition you can create an account and private playlists based on the available songs.

## Architecture and Design (10:50 AM of 07/16/2021 (COT)) 

### **On the scope**

After the idea of the app I defined 5 entities:<br>
<ul>
    <li>User</li>
    <li>Playlist</li>
    <li>Song</li>
    <li>Album</li>
    <li>Artist</li>
</ul>
With that on mind and having into account the time, I selected use a hybrid microservices architecture as follows:
<ul>
    <li>Auth microservice: Manages user accounts and the auth token management (using JWT). Given the low complexity of this, I decided to use a simple MVC.</li>
    <li>Resources back: Manages the Playlists, songs, albumes and artists API pasing for the auth service if needed. Given the possible scalability needs of this, I decided to use Hexagons modular monorepo.</li>
</ul>
For a better understanding you can watch <a href="https://github.com/jmcontreras10/musvibe/blob/main/arch.png?raw=true">this</a> diagram.<br>
Finally for the database, I decided to use a PostgressSQL Database for the Auth service, given the structure of the information, and Mongo for the resources back given the amount of data and low transactionality that we have there. In this case, I'm using Docker to easy deploy the resources.<br><br>

### **Suggestions and Ideas for the system**
<ol>
    <li>Use an MQTT service to asyncronous comunicate the system in some operations like delete a resource</li>
</ol>

## Implementation [Auth Service] (12:36 PM of 07/16/2021 (COT))
<ol>
    <li>Initialized Typescript for node server</li>
    <li>Database and Docker</li>
    <li>Auth endpoints: /register, /login and /logout</li>
    <li>User endpoints: /me</li>
</ol>
End of this module: (09:26 PM of 07/16/2021 (COT))<br>
<strong>Some feedback:</strong> I got some troubles with sequelize and typescript (Both at the same time, but solved)

## Implementation [Other Services] (12:36 PM of 07/16/2021 (COT))
<ol>
    <li>Initialized Typescript for node server</li>
    <li>Database and Docker</li>
    <li>Auth endpoints: /register, /login and /logout</li>
    <li>User endpoints: /me</li>
</ol>