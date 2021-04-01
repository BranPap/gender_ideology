// set up experiment logic for each slide
function make_slides(f) {
  var slides = {};

  // set up initial slide
  slides.i0 = slide({
    name: "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });

  // set up the first example slide
  slides.example1 = slide({
    name: "example1",

    // this is executed when the slide is shown
    start: function() {
      // hide error message
      $('.err').hide();
    },

    // this is executed when the participant clicks the "Continue button"
    button: function() {
      // read in the value of the selected radio button
      this.radio = $("input[name='number']:checked").val();
      // check whether the participant selected a reasonable value (i.e, 5, 6, or 7)
      if (this.radio) {
        // log response
        this.log_responses();
        // continue to next slide
        exp.go();
      } else {
        // participant gave non-reasonable response --> show error message
        $('.err').show();
        this.log_responses();
      }
    },

    log_responses: function() {
      // add response to exp.data_trials
      // this data will be submitted at the end of the experiment
      exp.data_trials.push({
        "slide_number_in_experiment": exp.phase,
        "id": "example1",
        "response": this.radio,
        // "strangeSentence": "",
      });
    },
  });

  // set up slide with instructions for main experiment
  slides.startExp = slide({
    name: "startExp",
    start: function() {
    },
    button: function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    },
  });

  slides.trial = slide({
    name: "trial",

    // To rotate through stimulus list:
    present: exp.stimuli,
    present_handle : function(stim) {

      // unselect all radio buttons at the beginning of each trial
      // (by default, the selection of the radio persists across trials)
      $("input[name='number']:checked").prop("checked", false);
      $("input[name='familiarity']:checked").prop("checked", false);
      $("#check-strange").prop("checked", false);

      // store stimulus data
      this.stim = stim;

      exp.item = exp.gender.pop()
      if (exp.item == "male") {
        var title_frame = stim.male;
        this.orth = stim.male_orthog;
      } else if (exp.item == "female") {
        var title_frame = stim.female;
        this.orth = stim.female_orthog;
      } else {
        var title_frame = stim.neutral;
        this.orth = stim.neutral_orthog;
      }


      console.log('item',exp.item)

      // replace the placeholder in the HTML document with the relevant sentences for this trial
      $("#trial-title_frame").html(title_frame);
      $(".err").hide();
    },

    // handle click on "Continue" button
    button: function() {
      this.radio = $("input[name='number']:checked").val();
      this.checkbox = $("input[name='familiarity']:checked").val();
      if (this.radio) {
        this.log_responses();
        _stream.apply(this); //use _stream.apply(this) if there is a list of "present" stimuli to rotate through
      } else {
        $('.err').show();
      }
    },

    // save response
    log_responses: function() {
      exp.data_trials.push({
        "id": this.stim.ID,
        "gender": exp.item,
        "scale": exp.scale,
        "slide_number_in_experiment": exp.phase, //exp.phase is a built-in trial number tracker
        "response": this.radio,
        "familiarity": this.checkbox,
        "gendered_morph": this.stim.relationship,
        "neutral_morh": this.stim.neutral_form,
        "orthog": this.orth,
      });
    },
  });

  // slide to collect subject information
  slides.subj_info = slide({
    name: "subj_info",
    submit: function(e) {
      exp.subj_data = {
        language: $("#language").val(),
        enjoyment: $("#enjoyment").val(),
        asses: $('input[name="assess"]:checked').val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
        education: $("#education").val(),
        fairprice: $("#fairprice").val(),
        comments: $("#comments").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  //
  slides.thanks = slide({
    name: "thanks",
    start: function() {
      exp.data = {
        "trials": exp.data_trials,
        "catch_trials": exp.catch_trials,
        "system": exp.system,
        "subject_information": exp.subj_data,
        "time_in_minutes": (Date.now() - exp.startT) / 60000
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

/// initialize experiment
function init() {

  exp.trials = [];
  exp.catch_trials = [];
  var stimuli = all_stims;

  exp.stimuli = stimuli;
  exp.stimuli = _.shuffle(stimuli); //call _.shuffle(stimuli) to randomize the order;
  exp.n_trials = exp.stimuli.length;


  exp.gender = _.shuffle(['male','male','male','male','male','male','male','male','male','male','male','male','male','female','female','female','female','female','female','female','female','female','female','female','female','female','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral','neutral']);

  /// Randomising the scale for each participant
  var exp_scale = _.shuffle(["MF", "FM"])
  exp.scale = exp_scale.pop()
  if (exp.scale == "MF") {
    var scale_end_one = "very likely a man";
    var scale_end_two = "very likely a woman";
  } else {
    var scale_end_one = "very likely a woman";
    var scale_end_two = "very likely a man";
  }
  $("#scale_end_one").html(scale_end_one);
  $("#scale_end_two").html(scale_end_two);


  exp.system = {
    Browser: BrowserDetect.browser,
    OS: BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };

  //blocks of the experiment:
  exp.structure = [
    "i0",
    "example1",
    "startExp",
    "trial",
    "subj_info",
    "thanks"
  ];

  exp.data_trials = [];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length();
  //this does not work if there are stacks of stims (but does work for an experiment with this structure)
  //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  $("#start_button").click(function() {
    exp.go();
  });

  exp.go(); //show first slide
}
