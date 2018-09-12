const faker = require('faker');
const moment = require('moment');
const bcrypt = require('bcrypt');

const {User} = require('./../models/user');
const {Report} = require('./../models/report');
const {mongoose} = require('./../db/mongoose');

const db = mongoose.connection;

const { getRandomInt, getRandomElement } = require('./../utilities/utilities');

const database = {
  users: [],
  reports: [],
  weekly_reports: [],
  messages: [],
  teams: []
};

const emojis = [
  // positive icon
  {
    id: 'smiley',
    name: 'Smiling Face with Open Mouth',
    colons: ':smiley:',
    text: ':)',
    emoticons: [
      '=)',
      '=-)'
    ],
    skin: null,
    native: '😃'
  },

  {
    id: "heart_eyes",
    name: "Smiling Face with Heart-Shaped Eyes",
    colons: ":heart_eyes:",
    emoticons: [],
    skin: null,
    native: "😍"
  },
  {
    id: "stuck_out_tongue_winking_eye",
    name: "Face with Stuck-out Tongue and Winking Eye",
    colons: ":stuck_out_tongue_winking_eye:",
    emoticons: [],
    skin: null,
    native: "😜"
  },

  {
    id: "laughing",
    name: "Smiling Face with Open Mouth and Tightly-Closed Eyes",
    colons: ":laughing:",
    emoticons: [
      ":>", ":->"
    ],
    native: "😆",
    skin: null,
    unified: "1f606"
  },


  // negative icon:
  {
    id: "white_frowning_face",
    name: "White Frowning Face",
    colons: ":white_frowning_face:",
    emoticons: [],
    skin: null,
    native: "☹️",
    unified: "2639-fe0f"
  },

  {
    id: "disappointed",
    name: "Disappointed Face",
    colons: ":disappointed:",
    emoticons: ["):", ":(", ":-("],
    skin: null,
    native: "😞",
    unified: "1f61e"
  },
  {
    id: "worried",
    name: "Worried Face",
    colons: ":worried:",
    emoticons: Array(0),
    native: "😟",
    skin: null,
    unified: "1f61f"
  }
];

const division = [
  'Front End Team 1',
  'Front End Team 2',
  'Front End Team 3',
  'Front End Team 4',
];

const issues = [
  'Hard for Debugging',
  'Keeping up with Technology',
  'Communication with others',
  'Time Estimation',
  'Security Threats'
];

for (let i=1; i<=20; i++) {
  database.users.push({
    email: "member" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: faker.random.arrayElement(division),
    password: bcrypt.hashSync("123456", 10),
    role: "member"
  });
}

User.collection.insertMany(database.users, (err, docs) => {
  if (err){
    return console.error(err);
  } else {
    console.log("Multiple documents inserted to Collection");
  }
});










