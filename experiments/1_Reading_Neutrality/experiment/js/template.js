var trial_counter = 0;


function make_slides(f) {
  var   slides = {};

  //set up initial slide
  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.trial = slide({
    name: "trial",
    present: exp.stimuli,
    present_handle: function(stim) {
      this.stim = stim;
      this.position = 0;
      exp.selection = exp.gender.pop();

      console.log('this.stim.condition',this.stim)

      if (exp.selection == "neutral_male") {
        this.stim =stim.condition[0].neutral_male[0];
      } else if (exp.selection == "congruent_female") {
        this.stim = stim.condition[0].congruent_female[0];
      } else if (exp.selection == "neutral_female") {
        this.stim = stim.condition[0].congruent_male[0];
      } else {
        this.stim = stim.condition[0].neutral_female[0];
      }

      // console.log('test',stim)
      console.log('this.stim.condition',this.stim)
      // console.log('stim_female',stim["congressperson"][0])
      // console.log('stim_selection',exp.selection)
      // console.log('this.stim',this.stim)
      // console.log('stim',stim)

      $("#comprehension-question").hide();


      var html = "";

      for (var i = 0; i < this.stim.words.length; i++) {
        var word = this.stim.words[i];
        var masked_word = word.form.replace(/./g, "-") + " ";
        html += "<span data-form=\"" + word.form + " \" data-masked-form=\"" + masked_word + "\"  id=\"stimulus-word-" + i + "\">" +  masked_word + "</span>"
        if (word.lbr_after) {
          html += "<br>"
        }
      }


      this.response_times = [];

      $("#stimulus-sentence").html(html);


      var t = this;

      $("#comprehension-question").hide();

      $(document).bind("keydown", function(evt) {
        if (evt.keyCode == 32) {
          evt.preventDefault();
          t.response_times.push(Date.now());
          if (t.position > 0) {
            var prev_idx = t.position - 1;
            $("#stimulus-word-" + prev_idx).text($("#stimulus-word-" + prev_idx).data("masked-form"));
          }
          if (t.position < t.stim.words.length) {
            $("#stimulus-word-" + t.position ).text($("#stimulus-word-" + t.position ).data("form"));
          } else {
            $("#comprehension-question").show();
            $(document).unbind("keydown");
          }
          t.position++;
        }

      });

      var question_check = _.shuffle([this.stim.question1, this.stim.question2]).pop()

      if (question_check == this.stim.question1) {
        this.stim.question_answer = this.stim.answer1;
      } else {
        this.stim.question_answer = this.stim.answer2;
      }

      $("#comprehension-question-q").text(question_check);
    },

    button : function(response) {
      this.response_correct = response == this.stim.question_answer;
      this.log_responses();
      _stream.apply(this);
    },

    log_responses : function() {
      for (var i = 0; i < this.stim.words.length; i++) {
        var word = this.stim.words[i];
        exp.data_trials.push({
          "trial_id": this.stim.id,
          "word_idx": i,
          "form": word.form,
          "region": word.region,
          "lbr_before": word.lbr_before ? 1 : 0,
          "lbr_after": word.lbr_after ? 1 : 0,
          "rt": this.response_times[i+1] - this.response_times[i],
          "condition": this.stim.condition,
          "lexeme": this.stim.lexeme,
          "response_correct": this.response_correct ? 1 : 0,
          "trial_no": trial_counter
        });
      }
      trial_counter++;
    }
  });




  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        name : $("#name").val(),
        gender : $('#gender').val(),
        tirednesslvl : $('#tirednesslvl').val(),
        age : $("#age").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
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
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0",  "instructions", "trial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  exp.gender = _.shuffle(['congruent_male','congruent_male','congruent_male','congruent_male','congruent_male','congruent_male','neutral_male','neutral_male','neutral_male','neutral_male','neutral_male','neutral_male','congruent_female','congruent_female','congruent_female','congruent_female','congruent_female','congruent_female','neutral_female','neutral_female','neutral_female','neutral_female','neutral_female','neutral_female']);

  exp.lexemes = _.shuffle(['congressperson'])

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
