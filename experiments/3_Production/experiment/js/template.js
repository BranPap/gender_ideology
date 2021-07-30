var trial_counter = 0;

function slide_set() {

}

function make_slides(f) {
  var   slides = {};

  //set up initial slide
  slides.i0 = slide({
     name : "i0",
     start: function() {
      console.log("check",exp.example_stim);
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.example = slide({
    name: "example",
    start: function() {
      // this.stim = exp.example_stim[0].condition[0].neutral_female[0];

      var t = this;

      // var name = this.name;
      //
      var individual_question = "Lewis is a ____ from Italy";

      $("#comprehension-question-q-example").text(individual_question).show();

      console.log('question',individual_question)

      this.correct ="teacher";
    },

    button : function(response) {
      console.log("choice: ", response);
      console.log("correct: ",this.correct);
      this.response = response == this.correct;
      console.log("correct: ", this.response);
      if (this.response == 1) {
        this.log_responses();
        console.log("choice: ",this.response);
        exp.go();
      }
      else {
        $('#example_err_1').addClass("visibleerr");
      }
    },

    log_responses : function() {
        exp.data_trials.push({
          "trial_id": "example",
          // "form": word.form,
          // "region": word.region,
          "choice": this.response,
          // "condition": this.stim.condition,
          // "lexeme": this.stim.lexeme,
          // "trial_no": trial_counter,
          // "name": this.name
        });
      }
  });

  slides.almost = slide({
    name : "almost",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  })

  // Main trial slide

  slides.trial = slide({
    name: "trial",
    present: exp.stimuli,
    present_handle: function(stim) {
      this.stim = stim;
      console.log('this.stim.condition',this.stim)

      if (this.stim.type == "critical") {
        exp.selection = exp.gender.pop();
        this.gender = exp.selection;
        this.state = exp.states.pop();
        if (exp.selection == "male") {
          this.name = exp.male_names.pop();
        } else if (exp.selection == "female") {
          this.name = exp.female_names.pop();
        }
      } else {
        this.name = "filler";
        this.gender = "filler";
      };

      console.log('this.stim.condition',this.stim)

      var question_check = this.stim.sentence;

      var name = this.name;
      var state = this.state;

      var individual_question = question_check.replace("NAME",name).replace("STATE",state);

      $("#comprehension-question-q").text(individual_question).show();

      console.log('question',individual_question);

      //randomize button orders
      var buttons = _.shuffle(this.stim.options);
      var button_1 = buttons.pop();
      var button_2 = buttons.pop();
      var button_3 = buttons.pop();

      document.getElementById("choice-1").value = button_1;
      document.getElementById("choice-2").value = button_2;
      document.getElementById("choice-3").value = button_3;

    },

    button : function(response) {
      this.response = response;
      console.log("response: ",this.response);
      this.log_responses();
      _stream.apply(this);
    },

    log_responses : function() {
        exp.data_trials.push({
          "type": this.stim.type,
          "lexeme": this.stim.lexeme,
          "response": this.response,
          "trial_no": trial_counter,
          "name": this.name,
          "gender": this.gender,
        });
        trial_counter++;
      }
  });

  slides.gender_quiz = slide({
    name : "gender_quiz",
    q1thumbVisible : function() {
      if ($("#gender_q1").val() != 50); {
        $('#gender_q1').addClass('visibleslider')
      };
    },
    q2thumbVisible : function() {
      if ($("#gender_q2").val() != 50); {
        $('#gender_q2').addClass('visibleslider')
      };
    },
    q3thumbVisible : function() {
      if ($("#gender_q3").val() != 50); {
        $('#gender_q3').addClass('visibleslider')
      };
    },
    q4thumbVisible : function() {
      if ($("#gender_q4").val() != 50); {
        $('#gender_q4').addClass('visibleslider')
      };
    },
    q5thumbVisible : function() {
      if ($("#gender_q5").val() != 50); {
        $('#gender_q5').addClass('visibleslider')
      };
    },
    collect_gender : function() {
      let q1_status = document.getElementById('gender_q1');
      let q2_status = document.getElementById('gender_q2');
      let q3_status = document.getElementById('gender_q3');
      let q4_status = document.getElementById('gender_q4');
      let q5_status = document.getElementById('gender_q5');
      if (q1_status.className != 'slider visibleslider' || q2_status.className != 'slider visibleslider' || q3_status.className != 'slider visibleslider' || q4_status.className != 'slider visibleslider' || q5_status.className != 'slider visibleslider') {
        let ef = document.getElementById('quiz_err_1');
        $('#quiz_err_1').addClass("visibleerr");
      } else {
          exp.gender_transendence = [{
            gender_q1 : $("#gender_q1").val(),
            gender_q2 : $("#gender_q2").val(),
            gender_q3 : $("#gender_q3").val(),
            gender_q4 : $("#gender_q4").val(),
            gender_q5 : $("#gender_q5").val(),
          }];
          exp.go();
        }
      }
  });

  slides.gender_quiz_two = slide({
    name : "gender_quiz_two",
    q6thumbVisible : function() {
      if ($("#gender_q6").val() != 50); {
        $('#gender_q6').addClass('visibleslider')
      };
    },
    q7thumbVisible : function() {
      if ($("#gender_q7").val() != 50); {
        $('#gender_q7').addClass('visibleslider')
      };
    },
    q8thumbVisible : function() {
      if ($("#gender_q8").val() != 50); {
        $('#gender_q8').addClass('visibleslider')
      };
    },
    q9thumbVisible : function() {
      if ($("#gender_q9").val() != 50); {
        $('#gender_q9').addClass('visibleslider')
      };
    },
    q10thumbVisible : function() {
      if ($("#gender_q10").val() != 50); {
        $('#gender_q10').addClass('visibleslider')
      };
    },
    q11thumbVisible : function() {
      if ($("#gender_q11").val() != 50); {
        $('#gender_q11').addClass('visibleslider')
      };
    },
    q12thumbVisible : function() {
      if ($("#gender_q12").val() != 50); {
        $('#gender_q12').addClass('visibleslider')
      };
    },
    q13thumbVisible : function() {
      if ($("#gender_q13").val() != 50); {
        $('#gender_q13').addClass('visibleslider')
      };
    },
    collect_gender_two : function() {
      let q6_status = document.getElementById('gender_q6');
      let q7_status = document.getElementById('gender_q7');
      let q8_status = document.getElementById('gender_q8');
      let q9_status = document.getElementById('gender_q9');
      let q10_status = document.getElementById('gender_q10');
      let q11_status = document.getElementById('gender_q11');
      let q12_status = document.getElementById('gender_q2');
      let q13_status = document.getElementById('gender_q13');
      if (q6_status.className != 'slider visibleslider' || q7_status.className != 'slider visibleslider' || q8_status.className != 'slider visibleslider' || q9_status.className != 'slider visibleslider' || q10_status.className != 'slider visibleslider' || q11_status.className != 'slider visibleslider' || q12_status.className != 'slider visibleslider' || q13_status.className != 'slider visibleslider') {
        let efg = document.getElementById('quiz_err_2');
        $('#quiz_err_2').addClass("visibleerr");
      } else {
            exp.go();
          };
      }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        gender : $('#gender').val(),
        // tirednesslvl : $('#tirednesslvl').val(),
        age : $("#age").val(),
        enjoyment : $("#enjoyment").val(),
        education : $("#education").val(),
        party_alignment : $("input[name='number']:checked").val(),
        price : $("#fairprice").val(),
        asses: $('input[name="assess"]:checked').val(),
        comments: $("#comments").val(),
        gender_q1 : $("#gender_q1").val(),
        gender_q2 : $("#gender_q2").val(),
        gender_q3 : $("#gender_q3").val(),
        gender_q4 : $("#gender_q4").val(),
        gender_q5 : $("#gender_q5").val(),
        gender_q6 : $("#gender_q6").val(),
        gender_q7 : $("#gender_q7").val(),
        gender_q8 : $("#gender_q8").val(),
        gender_q9 : $("#gender_q9").val(),
        gender_q10 : $("#gender_q10").val(),
        gender_q11 : $("#gender_q11").val(),
        gender_q12 : $("#gender_q12").val(),
        gender_q13 : $("#gender_q13").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "system" : exp.system,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {proliferate.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  var stimuli = all_stims;
  exp.stimuli = _.shuffle(stimuli);//can randomize between subject conditions here
  var example_stim = example_stims;
  exp.example_stim = example_stim;
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0",  "instructions", 'example', 'almost', "trial", 'gender_quiz', 'gender_quiz_two', 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  exp.gender = _.shuffle(['male','male','male','male','male','male','male','male','male','male','female','female','female','female','female','female','female','female','female','female']);

  exp.male_names = _.shuffle(["Michael","Jacob","Matthew","Joshua","Christopher","Nicholas", "Andrew", "Austin","Joseph","David","William","John"])

  exp.female_names = _.shuffle(["Emily", "Hannah", "Samantha", "Sarah", "Jessica", "Madison", "Elizabeth", "Alyssa", "Kalya","Megan","Lauren","Rachel"])

  exp.states = _.shuffle(["California","Alabama","Alaska","Arizona","Arkansas","Connecticut","Colorado","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"])

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  $(".response-buttons, .test-response-buttons").click(function() {
    _s.button($(this).val());
  });

  exp.go(); //show first slide
}
