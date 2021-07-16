# musvibe
This is a proff of concept test for a music listing app called musvibe

# Backlog

This project was started at 10:43AM of 07/16/2021 (COT).<br>
This applicaion is a music directory that stores songs, albums, and artists.<br>
In addition you can create an account and private playlists based on the available songs.

## Architecture and Design (10:50 AM of 07/16/2021 (COT))

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
For a better understanding you can watch this diagram<br>
![System architecture](URL)