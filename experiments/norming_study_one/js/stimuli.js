// data for all stimuli in the form of a list of JavaScript objects

var all_stims =
  [{
    "ID": "Actor",
    "male": "Someone is an actor.",
    "female": "Someone is an actress.",
    "neutral": "Someone is an actor",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "actor",
    "female_orthog": "actress",
    "neutral_orthog": "actor"
  },  {
    "ID": "Anchor",
    "male": "Someone is an anchorman.",
    "female": "Someone is an anchorwoman.",
    "neutral": "Someone is a news anchor.",
    "relationship": "man_woman",
    "neutral_form": "clipping",
    "male_orthog": "anchorman",
    "female_orthog": "anchorwoman",
    "neutral_orthog": "anchor"
  },  {
    "ID": "Assemblyperson",
    "male": "Someone is an assemblyman.",
    "female": "Someone is an assemblywoman.",
    "neutral": "Someone is an assemblyperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "assemblyman",
    "female_orthog": "assemblywoman",
    "neutral_orthog": "assemblyperson"
  },  {
    "ID": "Bartender",
    "male": "Someone is a barman.",
    "female": "Someone is a barmaid.",
    "neutral": "Someone is a bartender.",
    "relationship": "gender_compound",
    "neutral_form": "neutral_compound",
    "male_orthog": "barman",
    "female_orthog": "barmaid",
    "neutral_orthog": "bartender"
  },  {
    "ID": "Businessperson",
    "male": "Someone is a businessman.",
    "female": "Someone is a businesswoman.",
    "neutral": "Someone is a businessperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "businessman",
    "female_orthog": "businesswoman",
    "neutral_orthog": "businessperson"
  },  {
    "ID": "Camera",
    "male": "Someone is a cameraman.",
    "female": "Someone is a camerawoman.",
    "neutral": "Someone is a camera operator.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "cameraman",
    "female_orthog": "camerawoman",
    "neutral_orthog": "camera operator"
  },  {
    "ID": "Chair",
    "male": "Someone is a chairman.",
    "female": "Someone is a chairwoman.",
    "neutral": "Someone is a board chair.",
    "relationship": "man_woman",
    "neutral_form": "clipping",
    "male_orthog": "chairman",
    "female_orthog": "chairwoman",
    "neutral_orthog": "board chair"
  },  {
    "ID": "Congressperson",
    "male": "Someone is a congressman.",
    "female": "Someone is a congresswoman.",
    "neutral": "Someone is a congressperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "congressman",
    "female_orthog": "congresswoman",
    "neutral_orthog": "congressperson"
  },  {
    "ID": "Craftsperson",
    "male": "Someone is a craftsman.",
    "female": "Someone is a craftswoman.",
    "neutral": "Someone is a craftsperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "craftsman",
    "female_orthog": "craftswoman",
    "neutral_orthog": "craftsperson"
  },  {
    "ID": "Crewmember",
    "male": "Someone is a crewman.",
    "female": "Someone is a crewwoman.",
    "neutral": "Someone is a crewmember.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "crewman",
    "female_orthog": "crewwoman",
    "neutral_orthog": "crewmember"
  },  {
    "ID": "Door_attendant",
    "male": "Someone is a doorman.",
    "female": "Someone is a doorwoman.",
    "neutral": "Someone is a door attendant.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "doorman",
    "female_orthog": "doorwoman",
    "neutral_orthog": "door attendant"
  },  {
    "ID": "Emperor",
    "male": "Someone is an emperor.",
    "female": "Someone is an empress.",
    "neutral": "Someone is an emperor.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "emperor",
    "female_orthog": "empress",
    "neutral_orthog": "emperor"
  },  {
    "ID": "Firefighter",
    "male": "Someone is a fireman.",
    "female": "Someone is a firewoman.",
    "neutral": "Someone is a firefighter.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "fireman",
    "female_orthog": "firewoman",
    "neutral_orthog": "firefighter"
  },  {
    "ID": "Fisher",
    "male": "Someone is a fisherman.",
    "female": "Someone is a fisherwoman.",
    "neutral": "Someone is a fisher.",
    "relationship": "man_woman",
    "neutral_form": "clipping",
    "male_orthog": "fisherman",
    "female_orthog": "fisherwoman",
    "neutral_orthog": "fisher"
  },  {
    "ID": "Foreperson",
    "male": "Someone is a foreman.",
    "female": "Someone is a forewoman.",
    "neutral": "Someone is a foreperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "foreman",
    "female_orthog": "forewoman",
    "neutral_orthog": "foreperson"
  },  {
    "ID": "Garbage_Collector",
    "male": "Someone is a garbageman.",
    "female": "Someone is a garbagewoman.",
    "neutral": "Someone is a garbage collector.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "garbageman",
    "female_orthog": "garbagewoman",
    "neutral_orthog": "garbage collector"
  },  {
    "ID": "Gentleperson",
    "male": "Someone is a gentleman.",
    "female": "Someone is a gentlewoman.",
    "neutral": "Someone is a gentleperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "gentleman",
    "female_orthog": "gentlewoman",
    "neutral_orthog": "gentleperson"
  },  {
    "ID": "God",
    "male": "Someone is a god.",
    "female": "Someone is a goddess.",
    "neutral": "Someone is a god.",
    "relationship": "man_woman",
    "neutral_form": "male_adoption",
    "male_orthog": "god",
    "female_orthog": "goddess",
    "neutral_orthog": "god"
  },  {
    "ID": "Maintenance_Person",
    "male": "Someone is a handyman.",
    "female": "Someone is a handywoman.",
    "neutral": "Someone is a maintenance person.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "handyman",
    "female_orthog": "handywoman",
    "neutral_orthog": "maintenance person"
  },  {
    "ID": "Headteacher",
    "male": "Someone is a headmaster.",
    "female": "Someone is a headmistress.",
    "neutral": "Someone is a headteacher.",
    "relationship": "gender_compound",
    "neutral_form": "neutral_compound",
    "male_orthog": "headmaster",
    "female_orthog": "headmistress",
    "neutral_orthog": "headteacher"
  },  {
    "ID": "Heir",
    "male": "Someone is an heir.",
    "female": "Someone is an heiress.",
    "neutral": "Someone is an heir.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "heir",
    "female_orthog": "heiress",
    "neutral_orthog": "heir"
  },  {
    "ID": "Hero",
    "male": "Someone is a hero.",
    "female": "Someone is a heroine.",
    "neutral": "Someone is a hero.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "hero",
    "female_orthog": "heroine",
    "neutral_orthog": "hero"
  },  {
    "ID": "Host",
    "male": "Someone is a host.",
    "female": "Someone is a hostess.",
    "neutral": "Someone is a host.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "host",
    "female_orthog": "hostess",
    "neutral_orthog": "host"
  },  {
    "ID": "Hunter",
    "male": "Someone is a hunter.",
    "female": "Someone is a huntress.",
    "neutral": "Someone is a hunter.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "hunter",
    "female_orthog": "huntress",
    "neutral_orthog": "hunter"
  },  {
    "ID": "Layperson",
    "male": "Someone is a layman.",
    "female": "Someone is a laywoman.",
    "neutral": "Someone is a layperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "layman",
    "female_orthog": "laywoman",
    "neutral_orthog": "layperson"
  },  {
    "ID": "Proprieter",
    "male": "Someone is a landlord.",
    "female": "Someone is a landlady.",
    "neutral": "Someone is a proprieter.",
    "relationship": "gender_compound",
    "neutral_form": "suppletion",
    "male_orthog": "landlord",
    "female_orthog": "landlady",
    "neutral_orthog": "proprieter"
  },  {
    "ID": "Mail_Carrier",
    "male": "Someone is a mailman.",
    "female": "Someone is a mailwoman.",
    "neutral": "Someone is a mail carrier.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "mailman",
    "female_orthog": "mailwoman",
    "neutral_orthog": "mail carrier"
  },  {
    "ID": "Newsboy",
    "male": "Someone is a newsboy.",
    "female": "Someone is a newsgirl.",
    "neutral": "Someone is a newsboy.",
    "relationship": "boy_girl",
    "neutral_form": "male_adoption",
    "male_orthog": "newsboy",
    "female_orthog": "newsgirl",
    "neutral_orthog": "newsboy"
  },  {
    "ID": "Paper_carrier",
    "male": "Someone is a paperboy.",
    "female": "Someone is a papergirl.",
    "neutral": "Someone is a paper carrier.",
    "relationship": "boy_girl",
    "neutral_form": "neutral_compound",
    "male_orthog": "paperboy",
    "female_orthog": "papergirl",
    "neutral_orthog": "paper carrier"
  },  {
    "ID": "Police_officer",
    "male": "Someone is a policeman.",
    "female": "Someone is a policewoman.",
    "neutral": "Someone is a police officer.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "policeman",
    "female_orthog": "policewoman",
    "neutral_orthog": "police officer"
  },  {
    "ID": "Salesperson",
    "male": "Someone is a salesman.",
    "female": "Someone is a saleswoman.",
    "neutral": "Someone is a salesperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "salesman",
    "female_orthog": "saleswoman",
    "neutral_orthog": "salesperson"
  },  {
    "ID": "Sorcerer",
    "male": "Someone is a sorcerer.",
    "female": "Someone is a sorceress.",
    "neutral": "Someone is a sorcerer.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "sorcerer",
    "female_orthog": "sroceress",
    "neutral_orthog": "sorcerer"
  },  {
    "ID": "Flight_attendant",
    "male": "Someone is an airline steward.",
    "female": "Someone is an airline stewardess.",
    "neutral": "Someone is a flight attendant.",
    "relationship": "suffix",
    "neutral_form": "suppletion",
    "male_orthog": "airline steward",
    "female_orthog": "airline stewardess",
    "neutral_orthog": "flight attendant"
  },  {
    "ID": "Stunt_double",
    "male": "Someone is a stuntman.",
    "female": "Someone is a stuntwoman.",
    "neutral": "Someone is a stunt double.",
    "relationship": "man_woman",
    "neutral_form": "neutral_compound",
    "male_orthog": "stuntman",
    "female_orthog": "stuntwoman",
    "neutral_orthog": "stunt double"
  },  {
    "ID": "Usher",
    "male": "Someone is an usher.",
    "female": "Someone is an usherette.",
    "neutral": "Someone is an usher.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "usher",
    "female_orthog": "usherette",
    "neutral_orthog": "usher"
  },  {
    "ID": "Villain",
    "male": "Someone is a villain.",
    "female": "Someone is a villainess.",
    "neutral": "Someone is a villain.",
    "relationship": "suffix",
    "neutral_form": "male_adoption",
    "male_orthog": "villain",
    "female_orthog": "villainess",
    "neutral_orthog": "villain"
  },  {
    "ID": "Restaurant_server",
    "male": "Someone is a waiter.",
    "female": "Someone is a waitress.",
    "neutral": "Someone is a restaurant server.",
    "relationship": "suffix",
    "neutral_form": "suppletion",
    "male_orthog": "waiter",
    "female_orthog": "waitress",
    "neutral_orthog": "restaurant server"
  },  {
    "ID": "Meteorologist",
    "male": "Someone is a weatherman.",
    "female": "Someone is a weatherwoman.",
    "neutral": "Someone is a meteorologist.",
    "relationship": "man_woman",
    "neutral_form": "suppletion",
    "male_orthog": "weatherman",
    "female_orthog": "weatherwoman",
    "neutral_orthog": "meteorologist"
  },  {
    "ID": "Horseperson",
    "male": "Someone is a horseman.",
    "female": "Someone is a horsewoman.",
    "neutral": "Someone is a horseperson.",
    "relationship": "man_woman",
    "neutral_form": "person_compound",
    "male_orthog": "horseman",
    "female_orthog": "horsewoman",
    "neutral_orthog": "horseperson"
  }]
