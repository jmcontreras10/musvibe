db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [
    {
      role: 'dbOwner',
      db: 'musvibe',
    },
  ],
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

db = db.getSiblingDB('musvibe');

db.artists.insertMany([
  {
    "id": "d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a",
    "name": "Foster the people"
  },
  {
    "id": "2cec8e2d-2bf5-4adc-8f47-ee02ab880557",
    "name": "Jamiroquai"
  },
  {
    "id": "73e781e1-00a7-428b-b3c4-e4d1ec6639b6",
    "name": "Beyonce"
  },
  {
    "id": "addb0222-b640-4ca6-9d74-919e639d4d42",
    "name": "Choquibtown"
  },
  {
    "id": "89ca838a-48de-4d68-b9fd-c89d4a90b3db",
    "name": "Michael Jackson"
  }
]);

db.songs.insertMany([
  {
    "id": uuidv4(),
    "name": "Under The Moon",
    "duration": 288,
    "releaseDate": new Date(2020,11,13),
    "link": "https://www.youtube.com/watch?v=I4chuTbQMKQ&ab_channel=FosterThePeople",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "Call It What You Want",
    "duration": 241,
    "releaseDate": new Date(2011,11,01),
    "link": "https://www.youtube.com/watch?v=1prhCWO_518&ab_channel=fosterthepeopleVEVO",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "Houdini",
    "duration": 202,
    "releaseDate": new Date(2012,04,26),
    "link": "https://www.youtube.com/watch?v=_GMQLjzVGfw&ab_channel=fosterthepeopleVEVO",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "Best Friend",
    "duration": 269,
    "releaseDate": new Date(2014,05,29),
    "link": "https://www.youtube.com/watch?v=Ndzln1UEyf0&ab_channel=fosterthepeopleVEVO",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "Lamb's Wool",
    "duration": 292,
    "releaseDate": new Date(2020,05,21),
    "link": "https://www.youtube.com/watch?v=glxeX6hnQ_c&ab_channel=ErlendOyeVEVO",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "La Prima Estate",
    "duration": 243,
    "releaseDate": new Date(2016,04,13),
    "link": "https://www.youtube.com/watch?v=glxeX6hnQ_c&ab_channel=ErlendOyeVEVO"
  },
  {
    "id": uuidv4(),
    "name": "Virtual Insanity",
    "duration": 236,
    "releaseDate": new Date(2009,10,25),
    "link": "https://www.youtube.com/watch?v=4JkIs37a2JE&ab_channel=JamiroquaiVEVO",
    "artist":"2cec8e2d-2bf5-4adc-8f47-ee02ab880557"
  },
  {
    "id": uuidv4(),
    "name": "Automaton",
    "duration": 301,
    "releaseDate": new Date(2017,01,27),
    "link": "https://www.youtube.com/watch?v=rmlmOk4ubcU&ab_channel=JamiroquaiVEVO",
    "artist":"2cec8e2d-2bf5-4adc-8f47-ee02ab880557"
  },
  {
    "id": uuidv4(),
    "name": "Shake It On",
    "duration": 314,
    "releaseDate": new Date(2018,12,12),
    "link": "https://www.youtube.com/watch?v=3pLdV2O6yiI&ab_channel=Jamiroquai-Topic",
    "artist":"2cec8e2d-2bf5-4adc-8f47-ee02ab880557"
  },
  {
    "id": uuidv4(),
    "name": "Main Vein",
    "duration": 417,
    "releaseDate": new Date(2015,07,13),
    "link": "https://www.youtube.com/watch?v=kbq9lAh1P8k&ab_channel=JamiroquaiVEVO",
    "artist":"2cec8e2d-2bf5-4adc-8f47-ee02ab880557"
  },
  {
    "id": uuidv4(),
    "name": "Superfresh",
    "duration": 222,
    "releaseDate": new Date(2017,06,29),
    "link": "https://www.youtube.com/watch?v=NYijOKaHhzI&ab_channel=JamiroquaiVEVO",
    "artist":"2cec8e2d-2bf5-4adc-8f47-ee02ab880557"
  },
  {
    "id": uuidv4(),
    "name": "Freedom",
    "duration": 289,
    "releaseDate": new Date(2019,04,22),
    "link": "https://www.youtube.com/watch?v=7FWF9375hUA&ab_channel=Beyonc%C3%A9-Topic",
    "artist":"73e781e1-00a7-428b-b3c4-e4d1ec6639b6"
  },
  {
    "id": uuidv4(),
    "name": "Halo",
    "duration": 224,
    "releaseDate": new Date(2009,10,03),
    "link": "https://www.youtube.com/watch?v=bnVUHWCynig&ab_channel=Beyonc%C3%A9VEVO",
    "artist":"73e781e1-00a7-428b-b3c4-e4d1ec6639b6"
  },
  {
    "id": uuidv4(),
    "name": "Irreplaceable",
    "duration": 252,
    "releaseDate": new Date(2009,10,02),
    "link": "https://www.youtube.com/watch?v=2EwViQxSJJQ&ab_channel=Beyonc%C3%A9VEVO",
    "artist":"73e781e1-00a7-428b-b3c4-e4d1ec6639b6"
  },
  {
    "id": uuidv4(),
    "name": "Run the World",
    "duration": 290,
    "releaseDate": new Date(2011,05,18),
    "link": "https://www.youtube.com/watch?v=VBmMU_iwe6U&ab_channel=Beyonc%C3%A9VEVO",
    "artist":"73e781e1-00a7-428b-b3c4-e4d1ec6639b6"
  },
  {
    "id": uuidv4(),
    "name": "Diva",
    "duration": 165,
    "releaseDate": new Date(2019,05,17),
    "link": "https://www.youtube.com/watch?v=yN8ojpkwYps&ab_channel=Beyonc%C3%A9-Topic",
    "artist":"73e781e1-00a7-428b-b3c4-e4d1ec6639b6"
  },
  {
    "id": uuidv4(),
    "name": "Pa Olvidarte",
    "duration": 177,
    "releaseDate": new Date(2018,11,01),
    "link": "https://www.youtube.com/watch?v=QfhqUgC2nM0&ab_channel=ChocQuibTownVEVO",
    "artist":"addb0222-b640-4ca6-9d74-919e639d4d42"
  },
  {
    "id": uuidv4(),
    "name": "De Donde Vengo Yo",
    "duration": 264,
    "releaseDate": new Date(2010,02,19),
    "link": "https://www.youtube.com/watch?v=yMS4J6Gp6e4&ab_channel=NacionalRecords",
    "artist":"addb0222-b640-4ca6-9d74-919e639d4d42"
  },
  {
    "id": uuidv4(),
    "name": "Thriller",
    "duration": 822,
    "releaseDate": new Date(2009,10,03),
    "link": "https://www.youtube.com/watch?v=sOnqjkJTMaA&ab_channel=michaeljacksonVEVO",
    "artist":"89ca838a-48de-4d68-b9fd-c89d4a90b3db"
  },
  {
    "id": uuidv4(),
    "name": "Earth Song",
    "duration": 404,
    "releaseDate": new Date(2009,10,02),
    "link": "https://www.youtube.com/watch?v=XAi3VTSdTxU&ab_channel=michaeljacksonVEVO",
    "artist":"89ca838a-48de-4d68-b9fd-c89d4a90b3db"
  },
  {
    "id": uuidv4(),
    "name": "Helena Beat",
    "duration": 294,
    "releaseDate": new Date(2011,07,18),
    "link": "https://www.youtube.com/watch?v=ABzh6hTYpb8&ab_channel=fosterthepeopleVEVO",
    "artist":"d01e0c0b-6ddd-4e97-948a-4de5d6f6c80a"
  },
  {
    "id": uuidv4(),
    "name": "Livin' Thing",
    "duration": 212,
    "releaseDate": new Date(1976,01,29),
    "link": "https://www.youtube.com/watch?v=lvBOZCrJsAI&ab_channel=ELOVEVO"
  },
  {
    "id": uuidv4(),
    "name": "Last Train to London",
    "duration": 277,
    "releaseDate": new Date(1979,02,07),
    "link": "https://www.youtube.com/watch?v=Up4WjdabA2c&ab_channel=ELOVEVO"
  }
]);