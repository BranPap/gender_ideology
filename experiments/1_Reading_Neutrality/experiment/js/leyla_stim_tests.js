var all_stims = [
  {
    "lexeme": "congressperson",
    "question1" : "This is a question?",
    "answer1" : "This is an answer...",
    "condition": [
      {
        "neutral_male": [
          {
            "id" : "congressperson_neutral_male",
            "orthog" : "congressman",
            "gender" : "male",
            "words" : [
              {
                "form" : "NAME",
                "target" : "FALSE"
              },
              {
                "form" : "cries.",
                "target" : "TRUE"
              }
            ]
          }
        ]
      },
      {
        "congruent_female": [
          {
            "id" : "congressperson_congruent_female",
            "orthog" : "congresswoman",
            "gender" : "female",
            "words" : [
              {
                "form" : "NAME",
                "target" : "FALSE"
              },
              {
                "form" : "celebrates.",
                "target" : "TRUE"
              }
            ]
          }
        ]
      }
    ]
  }
]
