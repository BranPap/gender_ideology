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
      this.stim = exp.example_stim[0].condition[0].neutral_female[0];
      space_available = 0;
      allow_key_press = false;

      exp.selection == "neutral_female";
      this.name = "Brittany";

      console.log('this.stim.condition',this.stim)

      $("#comprehension-question-example").hide();

      this.response_times = [];

      var t = this;

      var k = 0

      var sentence_length = this.stim.words.length

      var left_word = this.stim.words[k].form;
      var right_word = this.stim.words[k].distractor;

      $("#left_word").hide();
      $("#right_word").hide();
      $("#l").hide();
      $("#s").hide();

      $("#left_word").html(left_word);
      $("#right_word").html(right_word);
      $('.correct').hide();
      $('.err').hide();
      $('#ex_question_error').hide();



      $(document).bind("keydown",function(evt) {
        if (evt.keyCode == 32 && space_available == 0) {
          t.response_times.push(Date.now());
          $("#trial_instructions").hide();
          $("#left_word").show();
          $("#right_word").show();
          $("#l").show();
          $("#s").show();
          space_available = 1;
          t.allow_key_press = true;
        } else if (evt.keyCode == 76 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          space_available = 1;
          console.log("L pressed");
          console.log('trial_i',k);
          x = document.getElementById('right_word').textContent;
          console.log('x: ',x);
          if (k+1 < sentence_length && x == t.stim.words[k].form) {
            t.response_times.push(Date.now());
            $('.err').hide();
            k += 1;
            possible_pair = _.shuffle(["real", "distractor"]);
            var left_word_status = possible_pair.pop();
            var right_word_status = possible_pair.pop();
            if (left_word_status == "real") {
              left_word = t.stim.words[k].form;
              right_word = t.stim.words[k].distractor;
            } else {
              left_word = t.stim.words[k].distractor;
              right_word = t.stim.words[k].form;
              };
            document.getElementById('left_word').textContent=left_word;
            document.getElementById('right_word').textContent=right_word;
          } else if (k+1 == sentence_length && x == t.stim.words[k].form) {
            t.response_times.push(Date.now());
            $(document).unbind("keydown");
            $('.err').hide();
            $('#ex_question_correct').show();
            $("#comprehension-question-example").show();
            $("#left_word").hide();
            $("#right_word").hide();
            $("#l").hide();
            $("#s").hide();
          } else {
            $('.err').show();
          }
        } else if (evt.keyCode == 83 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          console.log("S pressed");
          console.log('trial_i',k);
          x = document.getElementById('left_word').textContent;
          console.log('x: ',x);
          if (k+1 < sentence_length && x == t.stim.words[k].form) {
            t.response_times.push(Date.now());
            $('.err').hide();
            k += 1;
            possible_pair = _.shuffle(["real", "distractor"]);
            var left_word_status = possible_pair.pop();
            var right_word_status = possible_pair.pop();
            if (left_word_status == "real") {
              left_word = t.stim.words[k].form;
              right_word = t.stim.words[k].distractor;
            } else {
              left_word = t.stim.words[k].distractor;
              right_word = t.stim.words[k].form;
              };
            document.getElementById('left_word').textContent=left_word;
            document.getElementById('right_word').textContent=right_word;
          } else if (k+1 == sentence_length && x == t.stim.words[k].form) {
            $('.err').hide();
            t.response_times.push(Date.now());
            $(document).unbind("keydown");
            $('#ex_question_correct').show();
            $("#comprehension-question-example").show();
            $("#left_word").hide();
            $("#right_word").hide();
            $("#l").hide();
            $("#s").hide();
          } else {
            $('.err').show();
          }
        } else if (evt.keyCode == 32 && space_available == 2) {
          exp.go();
          allow_key_press = false;
          space_available = 1;
          $(document).unbind("keydown");
        }
      });

      var question_check = this.stim.question2;
      this.stim.question_answer = this.stim.answer2;

      var individual_question = question_check;

      $("#comprehension-question-q-example").text(individual_question);

      console.log('question',individual_question)
    },

log_responses : function() {
for (var i = 0; i < this.stim.words.length; i++) {
var word = this.stim.words[i];
exp.data_trials.push({
  "trial_id": this.stim.id,
  "word_idx": i,
  "form": word.form,
  "region": word.region,
  "rt": this.response_times[i+1] - this.response_times[i],
  "condition": this.stim.condition,
  "lexeme": this.stim.lexeme,
  "response_correct": this.response_correct ? 1 : 0,
  "trial_no": trial_counter,
  "name": this.name
});
}
trial_counter++;
},

    button : function(response) {
      this.response_correct = response == this.stim.question_answer;
      if (this.response_correct == 1) {
        $(document).unbind("keydown");
        this.log_responses();
        exp.go();
      }
      else {
        $('#ex_question_error').show();
        $('#ex_question_correct').hide();
      }
    },
});

  slides.almost = slide({
    name : "almost",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  })

  slides.trial = slide({
    name: "trial",
    present: exp.stimuli,
    present_handle: function(stim) {
      $(document).unbind("keydown");
      this.stim = stim;
      exp.selection = exp.gender.pop();
      this.space_available = 0;
      this.allow_key_press = false;

      console.log('this.stim.condition',this.stim);

      console.log('post-k:',exp.k);

      if (exp.selection == "neutral_male") {
        this.stim =stim.condition[0].neutral_male[0];
        this.name = exp.male_names.pop();
      } else if (exp.selection == "congruent_female") {
        this.stim = stim.condition[0].congruent_female[0];
        this.name = exp.female_names.pop();
      } else if (exp.selection == "congruent_male") {
        this.stim = stim.condition[0].congruent_male[0];
        this.name = exp.male_names.pop();
      } else {
        this.stim = stim.condition[0].neutral_female[0];
        this.name = exp.female_names.pop();
      }

      $("#comprehension-question-new").hide();
      $("#response-1").hide();
      $("#response-2").hide();

      this.response_times = [];

      var t = this;

      exp.k = 0

      var sentence_length = this.stim.words.length

      possible_pair = _.shuffle(["real", "distractor"]);
      var left_word_status = possible_pair.pop();
      var right_word_status = possible_pair.pop();
      if (left_word_status == "real") {
        left_word = t.name;
        right_word = t.stim.words[exp.k].distractor;
      } else {
        left_word = t.stim.words[exp.k].distractor;
        right_word = t.name;
        };

      $("#new_left_word").hide();
      $("#new_right_word").hide();
      $("#new_l").hide();
      $("#new_s").hide();

      $("#new_left_word").html(left_word);
      $("#new_right_word").html(right_word);
      $('#new_correct').hide();
      $('#new_err').hide();

      $("#new_trial_instructions").show();

      $(document).bind("keydown",function(evt) {
        if (evt.keyCode == 32 && t.space_available == 0) {
          t.response_times.push(Date.now());
          $("#new_trial_instructions").hide();
          $("#new_left_word").show();
          $("#new_right_word").show();
          $("#new_l").show();
          $("#new_s").show();
          t.space_available = 1;
          t.allow_key_press = true;
        } else if (evt.keyCode == 76 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          t.space_available = 1;
          console.log("L pressed");
          x = document.getElementById('new_right_word').textContent;
          console.log('x: ',x);
          if (exp.k+1 < sentence_length && x == t.stim.words[exp.k].form || exp.k+1 < sentence_length && x == t.name) {
            t.response_times.push(Date.now());
            $('#new_err').hide();
            exp.k += 1;
            console.log('trial_i',exp.k);
            possible_pair = _.shuffle(["real", "distractor"]);
            var left_word_status = possible_pair.pop();
            var right_word_status = possible_pair.pop();
            if (left_word_status == "real") {
              left_word = t.stim.words[exp.k].form;
              right_word = t.stim.words[exp.k].distractor;
            } else {
              left_word = t.stim.words[exp.k].distractor;
              right_word = t.stim.words[exp.k].form;
              };
            document.getElementById('new_left_word').textContent=left_word;
            document.getElementById('new_right_word').textContent=right_word;
          } else if (exp.k+1 == sentence_length && x == t.stim.words[exp.k].form) {
            t.response_times.push(Date.now());
            $(document).unbind("keydown");
            $('#new_err').hide();
            $('#new_correct').show();
            $("#comprehension-question-new").show();
            $("#response-1").show();
            $("#response-2").show();
            $("#new_left_word").hide();
            $("#new_right_word").hide();
            $("#new_l").hide();
            $("#new_s").hide();
          } else {
            $('#new_err').show();
            t.space_available = 2;
        }
        } else if (evt.keyCode == 83 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          console.log("S pressed");
          x = document.getElementById('new_left_word').textContent;
          console.log('x: ',x);
          if (exp.k+1 < sentence_length && x == t.stim.words[exp.k].form || exp.k+1 < sentence_length && x == t.name) {
            t.response_times.push(Date.now());
            $('#new_err').hide();
            exp.k += 1;
            console.log('trial_i',exp.k);
            possible_pair = _.shuffle(["real", "distractor"]);
            var left_word_status = possible_pair.pop();
            var right_word_status = possible_pair.pop();
            if (left_word_status == "real") {
              left_word = t.stim.words[exp.k].form;
              right_word = t.stim.words[exp.k].distractor;
            } else {
              left_word = t.stim.words[exp.k].distractor;
              right_word = t.stim.words[exp.k].form;
              };
            document.getElementById('new_left_word').textContent=left_word;
            document.getElementById('new_right_word').textContent=right_word;
          } else if (exp.k+1 == sentence_length && x == t.stim.words[exp.k].form) {
            $('#new_err').hide();
            t.response_times.push(Date.now());
            $(document).unbind("keydown");
            $('#new_correct').show();
            $("#comprehension-question-new").show();
            $("#response-1").show();
            $("#response-2").show();
            $("#new_left_word").hide();
            $("#new_right_word").hide();
            $("#new_l").hide();
            $("#new_s").hide();
          } else {
            $('#new_err').show();
            t.space_available = 2;
            t.allow_key_press = false;
        }
      }
      });

      var question_check = this.stim.question2;
      this.stim.question_answer = this.stim.answer2;

      var individual_question = question_check.replace("NAME",t.name);

      $("#comprehension-question-new").text(individual_question);

      console.log('question',individual_question)
    },

log_responses : function() {
for (var i = 0; i < this.stim.words.length; i++) {
var word = this.stim.words[i];
exp.data_trials.push({
  "trial_id": this.stim.id,
  "word_idx": i,
  "form": word.form,
  "region": word.region,
  "rt": this.response_times[i+1] - this.response_times[i],
  "condition": this.stim.condition,
  "lexeme": this.stim.lexeme,
  "response_correct": this.response_correct ? 1 : 0,
  "trial_no": trial_counter,
  "name": this.name
});
}
trial_counter++;
},

    button : function(response) {
      this.response_correct = response == this.stim.question_answer;
      this.log_responses();
      console.log('pre-k:',exp.k)
      $(document).unbind("keydown");
      _stream.apply(this);
    },

      button_two : function(foo) {
        $(document).unbind("keydown");
        this.log_responses();
        _stream.apply(this);
    },

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

  exp.gender = _.shuffle(['congruent_male','congruent_male','congruent_male','congruent_male','congruent_male','neutral_male','neutral_male','neutral_male','neutral_male','neutral_male','congruent_female','congruent_female','congruent_female','congruent_female','congruent_female','neutral_female','neutral_female','neutral_female','neutral_female','neutral_female']);

  exp.male_names = _.shuffle(["Michael","Jacob","Matthew","Joshua","Christopher","Nicholas", "Andrew", "Austin","Joseph","David","William","John"])

  exp.female_names = _.shuffle(["Emily", "Hannah", "Samantha", "Sarah", "Jessica", "Madison", "Elizabeth", "Alyssa", "Kalya","Megan","Lauren","Rachel"])

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
