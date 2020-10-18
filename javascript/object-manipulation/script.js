class User {
  /* constructor(name, age, email, location) {
    this.name = name;
    this.age = age;
    this.emailAdress = email;
    this.location = location;
  }*/
  userInfo = {
    name: "",
    age: null,
    email: "",
    livesIn: "",
    get location() {
      if (!loggedIn) {
        return `This information is strictly confidential`;
      } else {
        return `${this.name} lives in ${this.livesIn}`;
      }
    },
    set location(value) {
      this.livesIn = value;
    },
    userName: "",
    passWord: "",
    get userN() {
      return `${this.name}'s username is: ${this.userName}`;
    },
    set userN(value) {
      if (value.length < 4) {
        alert("name is too short, more than 4 letters please");
        return;
      }
      this.userName = value;
    },
    get pWord() {
      if (!loggedIn) {
        return `This information is strictly confidential`;
      } else {
        return `${this.name}'s password is: ${this.passWord}`;
      }
    },
    set pWord(value) {
      if (value.length < 4) {
        alert("password too short, more than 4 characters please");
        return;
      }
      this.passWord = value;
    },
  };
  plants = {
    growing: [],
    past: [],
    upForTrade: [],
    userWants: [],
  };
  getUserDetails() {
    loggedIn
      ? console.log(`${this.userInfo.userN} and ${this.userInfo.pWord}`)
      : console.log("not accepted");
  }
}

let anton = new User();
let loggedIn = true;
anton.userInfo.name = "anton";
anton.userInfo.userN = "antonuser";
anton.userInfo.pWord = "123456";
anton.getUserDetails();
